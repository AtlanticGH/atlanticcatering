import { getSupabase } from '@/lib/supabase/client'

export type CmsMediaBucket = 'cms-images' | 'cms-videos'

const IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
])
const VIDEO_TYPES = new Set(['video/mp4', 'video/webm', 'video/quicktime'])

const IMAGE_MAX_BYTES = 10 * 1024 * 1024
const VIDEO_MAX_BYTES = 100 * 1024 * 1024

function sanitizeFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function cmsMediaBucketForFile(file: File): CmsMediaBucket {
  if (IMAGE_TYPES.has(file.type)) return 'cms-images'
  if (VIDEO_TYPES.has(file.type)) return 'cms-videos'
  throw new Error('Unsupported file type. Use JPG, PNG, WebP, GIF, MP4, or WebM.')
}

export function cmsStoragePath(bucket: CmsMediaBucket, objectPath: string): string {
  return `${bucket}/${objectPath}`
}

export function parseCmsStoragePath(path: string): { bucket: CmsMediaBucket; objectPath: string } | null {
  if (path.startsWith('cms-images/')) {
    return { bucket: 'cms-images', objectPath: path.slice('cms-images/'.length) }
  }
  if (path.startsWith('cms-videos/')) {
    return { bucket: 'cms-videos', objectPath: path.slice('cms-videos/'.length) }
  }
  return null
}

export function getCmsMediaPublicUrl(path: string): string | null {
  const parsed = parseCmsStoragePath(path)
  const supabase = getSupabase()
  if (!parsed || !supabase) return null

  const { data } = supabase.storage.from(parsed.bucket).getPublicUrl(parsed.objectPath)
  return data.publicUrl
}

export async function uploadCmsMedia(file: File, bucket?: CmsMediaBucket): Promise<string> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase is not configured.')

  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) throw new Error('You must be signed in to upload files.')

  const targetBucket = bucket ?? cmsMediaBucketForFile(file)
  const maxBytes = targetBucket === 'cms-images' ? IMAGE_MAX_BYTES : VIDEO_MAX_BYTES
  if (file.size > maxBytes) {
    const limitMb = Math.round(maxBytes / (1024 * 1024))
    throw new Error(`File is too large. Maximum size is ${limitMb} MB.`)
  }

  if (targetBucket === 'cms-images' && !IMAGE_TYPES.has(file.type)) {
    throw new Error('Please upload an image file (JPG, PNG, WebP, GIF).')
  }
  if (targetBucket === 'cms-videos' && !VIDEO_TYPES.has(file.type)) {
    throw new Error('Please upload a video file (MP4 or WebM).')
  }

  const objectPath = `${Date.now()}-${sanitizeFilename(file.name)}`
  const { error } = await supabase.storage.from(targetBucket).upload(objectPath, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  })

  if (error) throw new Error(error.message)
  return cmsStoragePath(targetBucket, objectPath)
}

export interface CmsMediaItem {
  path: string
  bucket: CmsMediaBucket
  name: string
  publicUrl: string
}

export async function listCmsMedia(bucket: CmsMediaBucket): Promise<CmsMediaItem[]> {
  const supabase = getSupabase()
  if (!supabase) return []

  const { data, error } = await supabase.storage.from(bucket).list('', {
    limit: 200,
    sortBy: { column: 'created_at', order: 'desc' },
  })

  if (error) throw new Error(error.message)

  return (data ?? [])
    .filter((item) => item.name && !item.name.endsWith('/'))
    .map((item) => {
      const path = cmsStoragePath(bucket, item.name)
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(item.name)
      return {
        path,
        bucket,
        name: item.name,
        publicUrl: urlData.publicUrl,
      }
    })
}
