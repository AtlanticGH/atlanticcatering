import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '@/hooks/useSiteContent'

const CARD_WIDTH = 288 + 16

export function ServicesScroll() {
  const { services } = useContent()
  const scrollRef = useRef<HTMLDivElement>(null)

  function scrollBy(direction: 'prev' | 'next') {
    scrollRef.current?.scrollBy({
      left: direction === 'prev' ? -CARD_WIDTH : CARD_WIDTH,
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="services-suite"
      className="services-suite services-suite--index py-16 lg:py-24 overflow-hidden border-y border-acll-navy/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="services-suite-eyebrow text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green">
              What we do
            </span>
            <h2 className="services-suite-title text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-acll-navy">
              Our suite of services
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              className="services-suite-nav w-10 h-10 rounded-full border border-acll-navy/15 flex items-center justify-center text-acll-navy/60 hover:text-acll-navy hover:border-acll-navy/25 hover:bg-white/80 transition-all shadow-sm"
              aria-label="Scroll left"
              onClick={() => scrollBy('prev')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className="services-suite-nav w-10 h-10 rounded-full border border-acll-navy/15 flex items-center justify-center text-acll-navy/60 hover:text-acll-navy hover:border-acll-navy/25 hover:bg-white/80 transition-all shadow-sm"
              aria-label="Scroll right"
              onClick={() => scrollBy('next')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="services-suite-scroll service-scroll flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 sm:-mx-8 sm:px-8"
        >
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/services#${service.id}`}
              className="service-tile flex-shrink-0 w-72 rounded-2xl overflow-hidden p-6 pt-0 bg-white border border-acll-navy/[0.08] shadow-sm hover:shadow-md hover:border-acll-green/30 transition-all duration-200 group"
            >
              <div className="service-tile-image aspect-[4/3] -mx-6 -mt-6 mb-4 rounded-t-2xl overflow-hidden bg-acll-navy/5">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="font-semibold text-base text-acll-navy mb-2 group-hover:text-acll-green transition-colors">
                {service.name}
              </h3>
              <p className="text-sm text-acll-muted mb-4 leading-relaxed">{service.tagline}</p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-acll-green group-hover:gap-2 transition-all">
                Learn more <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
