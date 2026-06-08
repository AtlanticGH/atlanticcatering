import { useEffect, useRef, useState } from 'react'
import { AdminImagePreview } from '@/cms/components/AdminImagePreview'
import {
  listCmsMedia,
  uploadCmsMedia,
  type CmsMediaBucket,
  type CmsMediaItem,
} from '@/lib/supabase/storage'

function MediaCard({
  item,
  onCopied,
}: {
  item: CmsMediaItem
  onCopied: (message: string) => void
}) {
  async function copy(text: string, message: string) {
    try {
      await navigator.clipboard.writeText(text)
      onCopied(message)
    } catch {
      onCopied('Could not copy')
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-acll-navy/[0.08] bg-white shadow-sm">
      {item.bucket === 'cms-images' ? (
        <AdminImagePreview src={item.path} alt={item.name} className="aspect-[4/3] w-full" />
      ) : (
        <div className="aspect-[4/3] w-full bg-acll-navy/5">
          <video src={item.publicUrl} controls className="h-full w-full object-cover" preload="metadata" />
        </div>
      )}
      <div className="space-y-2 p-3">
        <p className="truncate text-[13px] font-medium text-acll-navy" title={item.name}>
          {item.name}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => copy(item.path, 'Path copied')}
            className="rounded-full border border-acll-navy/15 px-3 py-1.5 text-[12px] font-medium text-acll-navy hover:border-acll-green/40 hover:text-acll-green transition-colors"
          >
            Copy path
          </button>
          <button
            type="button"
            onClick={() => copy(item.publicUrl, 'Link copied')}
            className="rounded-full border border-acll-navy/15 px-3 py-1.5 text-[12px] font-medium text-acll-navy hover:border-acll-green/40 hover:text-acll-green transition-colors"
          >
            Copy link
          </button>
        </div>
      </div>
    </div>
  )
}

export function AdminMediaPage() {
  const [tab, setTab] = useState<CmsMediaBucket>('cms-images')

  function switchTab(next: CmsMediaBucket) {
    setTab(next)
    setItems([])
    setLoading(true)
    setError('')
    setMessage('')
  }
  const [items, setItems] = useState<CmsMediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    listCmsMedia(tab)
      .then((media) => {
        if (!cancelled) {
          setItems(media)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load media')
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [tab])

  async function handleUpload(file: File) {
    setUploading(true)
    setError('')
    setMessage('')
    try {
      const path = await uploadCmsMedia(file, tab)
      const refreshed = await listCmsMedia(tab)
      setItems(refreshed)
      setMessage(`Uploaded ${path}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const accept =
    tab === 'cms-images'
      ? 'image/jpeg,image/png,image/webp,image/gif,image/svg+xml'
      : 'video/mp4,video/webm,video/quicktime'

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-acll-navy">Media library</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-acll-muted">
          Upload images and videos, then copy the path into any content field or use the public link
          directly.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-full border border-acll-navy/10 p-1 bg-acll-gray/30">
          <button
            type="button"
            onClick={() => switchTab('cms-images')}
            className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
              tab === 'cms-images' ? 'bg-white text-acll-navy shadow-sm' : 'text-acll-muted hover:text-acll-navy'
            }`}
          >
            Images
          </button>
          <button
            type="button"
            onClick={() => switchTab('cms-videos')}
            className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
              tab === 'cms-videos' ? 'bg-white text-acll-navy shadow-sm' : 'text-acll-muted hover:text-acll-navy'
            }`}
          >
            Videos
          </button>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-full bg-acll-green px-5 py-2.5 text-[14px] font-medium text-white shadow-sm hover:bg-acll-green/90 disabled:opacity-60"
        >
          {uploading ? 'Uploading…' : `Upload ${tab === 'cms-images' ? 'image' : 'video'}`}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) void handleUpload(file)
          }}
        />
      </div>

      {message ? <p className="text-[14px] text-acll-green border-l-2 border-acll-green pl-3">{message}</p> : null}
      {error ? (
        <p className="text-[14px] text-red-600 border-l-2 border-red-500 pl-3" role="alert">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="text-[14px] text-acll-muted">Loading media…</p>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-acll-navy/20 bg-acll-gray/20 px-6 py-12 text-center">
          <p className="text-[15px] text-acll-muted">No uploads yet. Use the upload button to add files.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MediaCard
              key={item.path}
              item={item}
              onCopied={(text) => {
                setMessage(text)
                window.setTimeout(() => setMessage(''), 2000)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
