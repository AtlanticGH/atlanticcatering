import { useCallback, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { NAV_LINKS } from '@/utils/navigation'
import { assetUrl } from '@/utils/assets'

interface NavbarProps {
  isHomePage?: boolean
}

export function Navbar({ isHomePage = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useBodyScrollLock(mobileMenuOpen)

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((open) => !open)
  }, [])

  return (
    <header
      id="main-nav"
      className={[
        'sticky top-0 z-50 border-b transition-all duration-300',
        isHomePage
          ? 'border-transparent nav-over-hero backdrop-blur-0'
          : 'bg-white/90 backdrop-blur-md border-acll-navy/[0.06]',
        mobileMenuOpen ? 'mobile-menu-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 header-logo-link"
            onClick={closeMobileMenu}
          >
            <img
              src={assetUrl('images/Atlantic logo colour.png')}
              alt="Atlantic Catering & Logistics"
              className="header-logo header-logo-solid h-9 w-auto max-h-10 object-contain object-left"
              width={180}
              height={40}
            />
            <img
              src={assetUrl('images/Atlantic logo.png')}
              alt="Atlantic Catering & Logistics"
              className="header-logo header-logo-hero h-9 w-auto max-h-10 object-contain object-left"
              width={180}
              height={40}
            />
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  [
                    'nav-link px-3 py-2 text-[15px] rounded-md transition-colors tracking-wide',
                    isActive
                      ? 'text-acll-green font-medium'
                      : 'text-acll-navy/80 hover:text-acll-green',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <button
            id="mobile-menu-btn"
            type="button"
            className="lg:hidden p-2 rounded-md hover:bg-acll-green/10 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <svg
                id="close-icon"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                id="menu-icon"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={
          mobileMenuOpen
            ? 'lg:hidden bg-white border-t border-acll-navy/[0.06]'
            : 'hidden'
        }
        role="navigation"
        aria-label="Mobile menu"
      >
        <div className="px-5 py-4 space-y-0.5">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                [
                  'block px-4 py-2.5 rounded-md hover:bg-acll-green/10 hover:text-acll-green text-base tracking-wide',
                  isActive ? 'font-medium text-acll-green' : '',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}
