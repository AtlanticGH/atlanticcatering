import { CmsDashboardSections } from '@/cms/components/CmsPageSections'

export function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-2xl">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-acll-navy">Overview</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-acll-muted">
          Content is grouped by page, in the same order as the live site. Pick a section to edit
          copy, images, and page content.
        </p>
      </header>

      <CmsDashboardSections />
    </div>
  )
}
