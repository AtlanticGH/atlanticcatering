import { resolveAssetPath } from '@/lib/content/resolveAssets'
import { getCmsMediaPublicUrl } from '@/lib/supabase/storage'

export function AdminImagePreview({
  src,
  alt = 'Preview',
  className = '',
}: {
  src: string
  alt?: string
  className?: string
}) {
  if (!src.trim()) return null

  const trimmed = src.trim()
  const url = getCmsMediaPublicUrl(trimmed) ?? resolveAssetPath(trimmed)

  return (
    <div
      className={`overflow-hidden rounded-lg border border-acll-navy/10 bg-acll-gray/30 ${className}`.trim()}
    >
      <img
        src={url}
        alt={alt}
        className="h-full w-full object-cover"
        onError={(event) => {
          event.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}
