import { Link } from 'react-router-dom'
import { CMS_COLLECTIONS } from '@/cms/collections'

export function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-acll-navy">Overview</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-acll-muted">
          Edit page copy, news, team profiles, services, and SEO metadata. Changes save to Supabase and
          appear on the live site after a refresh.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {CMS_COLLECTIONS.map((collection) => (
          <Link
            key={collection.id}
            to={`/admin/collections/${collection.id}`}
            className="group rounded-2xl border border-acll-navy/[0.08] bg-white p-5 shadow-sm transition-all hover:border-acll-green/35 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-acll-navy group-hover:text-acll-green transition-colors">
                {collection.label}
              </h3>
              <span
                className="mt-0.5 shrink-0 text-acll-green opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              >
                →
              </span>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-acll-muted">{collection.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
