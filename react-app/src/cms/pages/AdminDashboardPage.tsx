import { Link } from 'react-router-dom'
import { CMS_COLLECTIONS } from '@/cms/collections'
import { COLLECTION_VISUALS } from '@/cms/collectionVisuals'
import { resolveAssetPath } from '@/lib/content/resolveAssets'

export function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-acll-navy">Overview</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-acll-muted">
          Pick a section below to edit text, images, and page content. Changes save to Supabase and
          appear on the live site after a refresh.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {CMS_COLLECTIONS.map((collection) => {
          const visual = COLLECTION_VISUALS[collection.id]
          return (
            <Link
              key={collection.id}
              to={`/admin/collections/${collection.id}`}
              className="group overflow-hidden rounded-2xl border border-acll-navy/[0.08] bg-white shadow-sm transition-all hover:border-acll-green/35 hover:shadow-md"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={resolveAssetPath(visual.previewImage)}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${visual.accentClass} to-acll-navy/55`}
                  aria-hidden="true"
                />
                <h3 className="absolute bottom-3 left-4 right-4 text-[15px] font-semibold text-white drop-shadow-sm">
                  {collection.label}
                </h3>
              </div>
              <p className="px-4 py-3.5 text-[14px] leading-relaxed text-acll-muted">
                {collection.description}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
