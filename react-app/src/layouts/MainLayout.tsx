import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { SkipLink } from '@/components/SkipLink'
import { useNavScroll } from '@/hooks/useNavScroll'

export function MainLayout() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const hasContactFooter = isHomePage || location.pathname === '/about'

  useNavScroll(isHomePage)

  useEffect(() => {
    if (!location.hash) return
    const target = document.querySelector(location.hash)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location])

  return (
    <>
      <SkipLink />
      <Navbar isHomePage={isHomePage} />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer contactId={hasContactFooter} />
    </>
  )
}
