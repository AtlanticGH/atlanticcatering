import { CmsDashboardSections } from '@/cms/components/CmsPageSections'

export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <header className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green">Dashboard</p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-acll-navy">Content overview</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-acll-muted">
          Grouped by page in site order — Home, About, Services, Sustainability, News, Contact, then
          site-wide settings.
        </p>
      </header>

      <CmsDashboardSections />
    </div>
  )
}
