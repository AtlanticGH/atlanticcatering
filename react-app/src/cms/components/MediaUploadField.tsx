import { useRef, useState } from 'react'
import { AdminImagePreview } from '@/cms/components/AdminImagePreview'
import { Field, TextInput } from '@/cms/components/fields'
import {
  getCmsMediaPublicUrl,
  uploadCmsMedia,
  type CmsMediaBucket,
} from '@/lib/supabase/storage'
import { resolveAssetPath } from '@/lib/content/resolveAssets'

export function MediaUploadField({
  value,
  onChange,
  kind,
  label,
  hint,
  previewAlt = 'Media preview',
}: {
  value: string
  onChange: (value: string) => void
  kind: 'image' | 'video'
  label: string
  hint?: string
  previewAlt?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const accept =
    kind === 'image'
      ? 'image/jpeg,image/png,image/webp,image/gif,image/svg+xml'
      : 'video/mp4,video/webm,video/quicktime'

  const bucket: CmsMediaBucket = kind === 'image' ? 'cms-images' : 'cms-videos'
  const resolvedUrl = value.trim() ? resolveAssetPath(value.trim()) : ''
  const publicUrl = value.trim() ? (getCmsMediaPublicUrl(value.trim()) ?? resolvedUrl) : ''

  async function handleUpload(file: File) {
    setUploading(true)
    setError('')
    try {
      const path = await uploadCmsMedia(file, bucket)
      onChange(path)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  async function handleCopy() {
    if (!publicUrl) return
    try {
      await navigator.clipboard.writeText(publicUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Could not copy link')
    }
  }

  return (
    <div className="space-y-3">
      <Field
        label={label}
        hint={hint ?? 'Upload a file or paste a path (images/… or cms-images/…)'}
      >
        <div className="flex flex-wrap gap-2">
          <div className="min-w-0 flex-1">
            <TextInput value={value} onChange={onChange} placeholder={`${bucket}/… or images/…`} />
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="shrink-0 rounded-full border border-acll-navy/15 px-4 py-2 text-[13px] font-medium text-acll-navy hover:border-acll-green/40 hover:text-acll-green transition-colors disabled:opacity-60"
          >
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
          {publicUrl ? (
            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 rounded-full border border-acll-navy/15 px-4 py-2 text-[13px] font-medium text-acll-navy hover:border-acll-green/40 hover:text-acll-green transition-colors"
            >
              {copied ? 'Copied' : 'Copy link'}
            </button>
          ) : null}
        </div>
      </Field>

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

      {error ? (
        <p className="text-[13px] text-red-600 border-l-2 border-red-500 pl-3" role="alert">
          {error}
        </p>
      ) : null}

      {value.trim() && kind === 'image' ? (
        <AdminImagePreview src={value} alt={previewAlt} className="aspect-[16/10] max-w-xs" />
      ) : null}

      {value.trim() && kind === 'video' && resolvedUrl ? (
        <div className="overflow-hidden rounded-lg border border-acll-navy/10 bg-acll-gray/30 max-w-md">
          <video src={resolvedUrl} controls className="w-full" preload="metadata" />
        </div>
      ) : null}

      {publicUrl ? (
        <p className="text-[12px] text-acll-muted break-all">
          <span className="font-medium text-acll-navy">Link: </span>
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-acll-green hover:underline"
          >
            {publicUrl}
          </a>
        </p>
      ) : null}
    </div>
  )
}
