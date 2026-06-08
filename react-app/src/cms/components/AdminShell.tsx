import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { CmsSidebarSections } from '@/cms/components/CmsPageSections'
import { signOut } from '@/lib/supabase/auth'
import { assetUrl } from '@/utils/assets'

function navClass(active: boolean) {
  return [
    'block rounded-lg px-3 py-2.5 text-[14px] transition-colors',
    active
      ? 'bg-acll-green/10 font-semibold text-acll-navy'
      : 'text-acll-navy/75 hover:bg-acll-green/5 hover:text-acll-navy',
  ].join(' ')
}

export function AdminShell() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  async function handleLogout() {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-acll-navy antialiased">
      <header className="bg-acll-navy text-white border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-5 lg:py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-6 min-w-0">
              <Link to="/" className="shrink-0">
                <img
                  src={assetUrl('images/Atlantic logo.png')}
                  alt="Atlantic Catering & Logistics"
                  className="h-9 w-auto max-h-10 object-contain object-left"
                  width={180}
                  height={40}
                />
              </Link>
              <div className="hidden sm:block border-l border-white/15 pl-6 min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green/90">
                  Content management
                </p>
                <h1 className="text-lg font-bold tracking-tight text-white truncate">Dashboard</h1>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/"
                className="text-[13px] font-medium text-white/70 hover:text-acll-green transition-colors"
              >
                View site
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-white/25 px-4 py-2 text-[13px] font-medium text-white/90 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-acll-green focus-visible:ring-offset-2 focus-visible:ring-offset-acll-navy"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 bg-acll-gray/35 border-b border-acll-navy/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-10 items-start">
            <aside className="lg:sticky lg:top-8">
              <div className="rounded-2xl border border-acll-navy/[0.08] bg-white p-4 shadow-sm">
                <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-acll-muted">
                  Pages
                </p>
                <nav className="mb-4 space-y-0.5">
                  <Link to="/admin" className={navClass(pathname === '/admin')}>
                    Overview
                  </Link>
                  <Link to="/admin/media" className={navClass(pathname === '/admin/media')}>
                    Media library
                  </Link>
                </nav>
                <CmsSidebarSections pathname={pathname} />
              </div>
            </aside>

            <main className="min-w-0">
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-acll-navy/[0.06] py-5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-3 text-[13px] text-acll-muted">
          <p>Atlantic Catering &amp; Logistics Limited</p>
          <Link to="/" className="font-medium text-acll-navy hover:text-acll-green transition-colors">
            ← Back to website
          </Link>
        </div>
      </footer>
    </div>
  )
}
