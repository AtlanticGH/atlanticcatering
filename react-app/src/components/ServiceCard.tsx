import type { KeyboardEvent } from 'react'
import type { ServiceItem } from '@/lib/content/types'
import { FadeIn } from '@/components/FadeIn'
import { assetUrl } from '@/utils/assets'

type ServiceCardProps = {
  service: ServiceItem
  onSelect: (service: ServiceItem) => void
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(service)
    }
  }

  return (
    <FadeIn
      as="article"
      id={service.id}
      className="service-card"
      role="button"
      tabIndex={0}
      aria-label={`View service: ${service.name}`}
      onClick={() => onSelect(service)}
      onKeyDown={handleKeyDown}
    >
      <div className="service-card-link block h-full cursor-pointer">
        <div className="service-card-inner aspect-square rounded-2xl overflow-hidden relative bg-acll-navy">
          <div
            className="service-card-inner-bg absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${assetUrl(service.image)}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-acll-navy/90 via-acll-navy/25 to-transparent" />
          <div className="absolute inset-0 flex items-end p-5 lg:p-6">
            <div>
              <h3 className="text-white font-semibold text-[15px] lg:text-[16px] tracking-tight">
                {service.name}
              </h3>
              <p className="text-white/80 text-[13px] mt-0.5">{service.tagline}</p>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
