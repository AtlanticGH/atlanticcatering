import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ServicesPage = lazy(() => import('@/pages/ServicesPage').then((m) => ({ default: m.ServicesPage })))
const SustainabilityPage = lazy(() =>
  import('@/pages/SustainabilityPage').then((m) => ({ default: m.SustainabilityPage })),
)
const NewsPage = lazy(() => import('@/pages/NewsPage').then((m) => ({ default: m.NewsPage })))
const NewsArticlePage = lazy(() =>
  import('@/pages/NewsArticlePage').then((m) => ({ default: m.NewsArticlePage })),
)
const CareersPage = lazy(() => import('@/pages/CareersPage').then((m) => ({ default: m.CareersPage })))
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const EcommercePage = lazy(() => import('@/pages/EcommercePage').then((m) => ({ default: m.EcommercePage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

function PageLoader() {
  return (
    <div className="py-24 text-center text-acll-muted text-sm" role="status" aria-live="polite">
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="sustainability" element={<SustainabilityPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:slug" element={<NewsArticlePage />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="shop" element={<EcommercePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
