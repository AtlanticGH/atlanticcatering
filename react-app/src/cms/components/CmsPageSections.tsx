import { Link } from 'react-router-dom'
import { CMS_PAGE_SECTIONS, getCollectionById } from '@/cms/collections'
import { COLLECTION_VISUALS } from '@/cms/collectionVisuals'
import { resolveAssetPath } from '@/lib/content/resolveAssets'

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
    <div className="space-y-10">
      {CMS_PAGE_SECTIONS.map((section) => (
        <section key={section.id}>
          <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-acll-navy">
              {section.label}
            </h3>
            {section.path ? (
              <span className="text-[13px] text-acll-muted">{section.path}</span>
            ) : (
              <span className="text-[13px] text-acll-muted">All pages</span>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {section.collectionIds.map((id) => {
              const collection = getCollectionById(id)
              if (!collection) return null
              const visual = COLLECTION_VISUALS[collection.id]

              return (
                <Link
                  key={collection.id}
                  to={`/admin/collections/${collection.id}`}
                  className="group overflow-hidden rounded-2xl border border-acll-navy/[0.08] bg-white shadow-sm transition-all hover:border-acll-green/35 hover:shadow-md"
                >
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={resolveAssetPath(visual.previewImage)}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${visual.accentClass} to-acll-navy/55`}
                      aria-hidden="true"
                    />
                    <h4 className="absolute bottom-3 left-4 right-4 text-[14px] font-semibold text-white drop-shadow-sm">
                      {collection.label}
                    </h4>
                  </div>
                  <p className="px-4 py-3 text-[13px] leading-relaxed text-acll-muted">
                    {collection.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
