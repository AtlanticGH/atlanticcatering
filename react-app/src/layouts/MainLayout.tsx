import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { SkipLink } from '@/components/SkipLink'
import { applyPageMeta } from '@/utils/pageMeta'
import { scrollToHash } from '@/utils/scroll'

const BODY_BASE_CLASS =
  'font-sans text-acll-navy antialiased bg-white text-[15px] leading-relaxed'

export function MainLayout() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const hasContactFooter = isHomePage || location.pathname === '/about'

  useEffect(() => {
    document.body.className = isHomePage ? `${BODY_BASE_CLASS} page-index` : BODY_BASE_CLASS
  }, [isHomePage])

  useEffect(() => {
    const isNewsArticle = /^\/news\/.+/.test(location.pathname)
    if (!isNewsArticle) {
      applyPageMeta(location.pathname)
    }
  }, [location.pathname])

  useEffect(() => {
    if (location.hash) {
      scrollToHash(location.hash)
      return
    }

    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <>
      <SkipLink />
      <Navbar key={location.pathname} isHomePage={isHomePage} />
      <div className="header-spacer" aria-hidden="true" />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer contactId={hasContactFooter} />
    </>
  )
}
