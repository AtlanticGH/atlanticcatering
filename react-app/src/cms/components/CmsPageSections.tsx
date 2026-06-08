import { Link } from 'react-router-dom'
import {
  CMS_PAGE_SECTIONS,
  getCollectionById,
  type CmsCollectionMeta,
  type CmsPageSection,
} from '@/cms/collections'
import { COLLECTION_VISUALS } from '@/cms/collectionVisuals'
import { resolveAssetPath } from '@/lib/content/resolveAssets'

const EDITOR_LABELS: Record<CmsCollectionMeta['editor'], string> = {
  list: 'List',
  object: 'Fields',
  json: 'JSON',
}

function overviewGridClass(count: number): string {
  if (count === 1) return 'grid-cols-1 max-w-sm'
  if (count === 2) return 'grid-cols-1 sm:grid-cols-2'
  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
}

function CollectionOverviewCard({ collection }: { collection: CmsCollectionMeta }) {
  const visual = COLLECTION_VISUALS[collection.id]

  return (
    <Link
      to={`/admin/collections/${collection.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-acll-navy/[0.08] bg-white shadow-sm transition-all hover:border-acll-green/35 hover:shadow-md"
    >
      <div className="relative h-24 shrink-0 overflow-hidden sm:h-28">
        <img
          src={resolveAssetPath(visual.previewImage)}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${visual.accentClass} to-acll-navy/55`}
          aria-hidden="true"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-acll-navy/70">
          {EDITOR_LABELS[collection.editor]}
        </span>
        <h4 className="absolute bottom-3 left-4 right-4 text-[14px] font-semibold text-white drop-shadow-sm">
          {collection.label}
        </h4>
      </div>
      <p className="flex flex-1 px-4 py-3 text-[13px] leading-snug text-acll-muted">
        {collection.description}
      </p>
    </Link>
  )
}

function OverviewSection({ section }: { section: CmsPageSection }) {
  const collections = section.collectionIds
    .map((id) => getCollectionById(id))
    .filter((collection): collection is CmsCollectionMeta => collection !== undefined)

  return (
    <section className="rounded-2xl border border-acll-navy/[0.08] bg-white p-5 shadow-sm sm:p-6">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-acll-navy/[0.06] pb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green">Page</p>
          <h3 className="mt-1 text-lg font-bold tracking-tight text-acll-navy">{section.label}</h3>
          <p className="mt-1 text-[13px] text-acll-muted">
            {collections.length} {collections.length === 1 ? 'section' : 'sections'}
            {section.path ? ` · ${section.path}` : ' · All pages'}
          </p>
        </div>
        {section.path ? (
          <Link
            to={section.path}
            className="shrink-0 text-[13px] font-medium text-acll-navy hover:text-acll-green transition-colors"
          >
            View live →
          </Link>
        ) : null}
      </header>

      <div className={`grid gap-4 ${overviewGridClass(collections.length)}`}>
        {collections.map((collection) => (
          <CollectionOverviewCard key={collection.id} collection={collection} />
        ))}
      </div>
    </section>
  )
}

function navClass(active: boolean) {
  return [
    'block rounded-lg px-3 py-2 text-[13px] transition-colors',
    active
      ? 'bg-acll-green/10 font-semibold text-acll-navy'
      : 'text-acll-navy/75 hover:bg-acll-green/5 hover:text-acll-navy',
  ].join(' ')
}

export function CmsSidebarSections({ pathname }: { pathname: string }) {
  return (
    <div className="space-y-4">
      {CMS_PAGE_SECTIONS.map((section) => (
        <div key={section.id}>
          <p className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-acll-muted">
            {section.label}
            {section.path ? (
              <span className="ml-1 font-normal normal-case tracking-normal text-acll-muted/80">
                {section.path}
              </span>
            ) : null}
          </p>
          <nav className="space-y-0.5">
            {section.collectionIds.map((id) => {
              const collection = getCollectionById(id)
              if (!collection) return null
              const href = `/admin/collections/${collection.id}`
              return (
                <Link key={collection.id} to={href} className={navClass(pathname === href)}>
                  {collection.label}
                </Link>
              )
            })}
          </nav>
        </div>
      ))}
    </div>
  )
}

export function CmsDashboardSections() {
  return (
    <div className="space-y-5">
      {CMS_PAGE_SECTIONS.map((section) => (
        <OverviewSection key={section.id} section={section} />
      ))}
    </div>
  )
}
