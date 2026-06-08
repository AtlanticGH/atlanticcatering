import { FadeIn } from '@/components/FadeIn'
import { Link } from '@/components/Link'

export function NotFoundPage() {
  return (
    <section className="py-24 lg:py-32 bg-acll-gray border-y border-acll-navy/[0.06]">
      <FadeIn className="max-w-6xl mx-auto px-5 sm:px-8 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green mb-3">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-acll-navy tracking-tight mb-4">Page not found</h1>
        <p className="text-acll-muted text-[15px] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-acll-green px-6 py-3 text-[14px] font-medium text-white hover:bg-acll-green/90 transition-colors shadow-sm"
        >
          Return home
        </Link>
      </FadeIn>
    </section>
  )
}
