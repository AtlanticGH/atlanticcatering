import type { ReactNode } from 'react'
import type { CmsCollectionMeta } from '@/cms/collections'
import { COLLECTION_VISUALS } from '@/cms/collectionVisuals'
import { resolveAssetPath } from '@/lib/content/resolveAssets'

export function CollectionEditorLayout({
  collection,
  loading,
  saving,
  message,
  error,
  onSave,
  children,
}: {
  collection: CmsCollectionMeta
  loading: boolean
  saving: boolean
  message: string
  error: string
  onSave: () => void
  children: ReactNode
}) {
  const visual = COLLECTION_VISUALS[collection.id]

  return (
    <div className="rounded-2xl border border-acll-navy/[0.08] bg-white shadow-sm overflow-hidden">
      <div className="relative h-36 sm:h-40 overflow-hidden">
        <img
          src={resolveAssetPath(visual.previewImage)}
          alt=""
          className="h-full w-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r ${visual.accentClass} to-acll-navy/70`}
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex flex-col justify-end px-5 py-5 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-acll-green/90">
            {collection.id}
          </p>
          <h2 className="mt-0.5 text-xl font-bold tracking-tight text-white">{collection.label}</h2>
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={saving || loading}
          className="absolute top-4 right-4 shrink-0 inline-flex items-center justify-center rounded-full bg-white/95 px-5 py-2.5 text-[14px] font-medium text-acll-navy shadow-sm hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-acll-green focus-visible:ring-offset-2 disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>

      <div className="border-b border-acll-navy/[0.06] px-5 py-4 sm:px-6">
        <p className="max-w-2xl text-[14px] leading-relaxed text-acll-muted">{collection.description}</p>
        {message ? (
          <p className="mt-3 text-[14px] text-acll-green border-l-2 border-acll-green pl-3">{message}</p>
        ) : null}
        {error ? (
          <p className="mt-3 text-[14px] text-red-600 border-l-2 border-red-500 pl-3" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      <div className="px-5 py-5 sm:px-6 sm:py-6">
        {loading ? (
          <p className="text-[14px] text-acll-muted" role="status">
            Loading content…
          </p>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
