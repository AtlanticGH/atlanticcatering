import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { scrollToHash } from '@/utils/scroll'
import { PageHero } from '@/components/PageHero'
import { FadeIn } from '@/components/FadeIn'
import { ServiceCard } from '@/components/ServiceCard'
import { ServiceModal } from '@/components/ServiceModal'
import { useContent } from '@/hooks/useSiteContent'
import type { ServiceItem } from '@/lib/content/types'

export function ServicesPage() {
  const { services } = useContent()
  const location = useLocation()
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)

  useEffect(() => {
    if (!location.hash) return
    scrollToHash(location.hash, 60, 100)
  }, [location.pathname, location.hash])

  return (
    <>
      <PageHero
        eyebrow="What we offer"
        title="Our services"
        description="From offshore and camp operations to inflight, VIP and institutional catering—end-to-end support so you can focus on your core business."
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green">
              Our suite
            </span>
          </FadeIn>
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-acll-navy tracking-tight mt-1 mb-6">
              Built for high-demand environments
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="text-acll-navy/75 text-[15px] max-w-2xl mb-10">
              Delivered with safety, consistency, and strong logistics.
            </p>
          </FadeIn>

          <div className="service-grid">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} onSelect={setSelectedService} />
            ))}
          </div>

          <FadeIn className="mt-12 rounded-2xl border border-acll-navy/[0.08] bg-acll-navy/[0.02] p-8 lg:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="text-[16px] font-semibold text-acll-navy tracking-tight">
                Need a tailored solution?
              </h2>
              <p className="mt-1 text-acll-navy/75 text-[14px] max-w-2xl">
                Tell us your location, headcount, and operating constraints—our team will propose an approach that fits your standards and timelines.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-acll-green text-white text-[14px] font-medium hover:bg-acll-green/90 transition-colors shrink-0"
            >
              Contact us
              <span aria-hidden="true" className="ml-1">
                →
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>

      <ServiceModal
        service={selectedService}
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
      />
    </>
  )
}
