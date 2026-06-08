import type { ReactNode } from 'react'
import type { CmsCollectionMeta } from '@/cms/collections'

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
  return (
    <div className="rounded-2xl border border-acll-navy/[0.08] bg-white shadow-sm overflow-hidden">
      <div className="border-b border-acll-navy/[0.06] px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-acll-green">
              {collection.id}
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-acll-navy">{collection.label}</h2>
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-acll-muted">
              {collection.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onSave}
            disabled={saving || loading}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-acll-green px-5 py-2.5 text-[14px] font-medium text-white shadow-sm hover:bg-acll-green/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-acll-green focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>

        {message ? (
          <p className="mt-4 text-[14px] text-acll-green border-l-2 border-acll-green pl-3">{message}</p>
        ) : null}
        {error ? (
          <p className="mt-4 text-[14px] text-red-600 border-l-2 border-red-500 pl-3" role="alert">
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
