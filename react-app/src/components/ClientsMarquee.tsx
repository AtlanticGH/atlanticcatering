import { useContent } from '@/hooks/useSiteContent'
import type { ClientLogo } from '@/data/clients'

function ClientLogoItem({ src, alt }: ClientLogo) {
  return (
    <div className="client-logo flex-shrink-0 rounded-xl overflow-hidden bg-transparent flex items-center justify-center h-28 w-48 md:h-32 md:w-60 relative">
      <img
        src={src}
        alt={alt}
        className="client-logo-img w-full h-full object-contain p-3"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}

function ClientRow({ logos, direction }: { logos: ClientLogo[]; direction: 'left' | 'right' }) {
  const duplicated = [...logos, ...logos]

  return (
    <div className="clients-row-wrap overflow-hidden" aria-hidden="true">
      <div className={`clients-row clients-row--${direction} flex gap-10 w-max`}>
        {duplicated.map((logo, index) => (
          <ClientLogoItem key={`${logo.alt}-${index}`} {...logo} />
        ))}
      </div>
    </div>
  )
}

export function ClientsMarquee() {
  const { clients } = useContent()
  return (
    <section className="clients-section py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-10">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green block text-center">
          Trusted by
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-acll-navy tracking-tight text-center mt-1">
          Our clients
        </h2>
      </div>
      <div className="space-y-4">
        <ClientRow logos={clients.row1} direction="left" />
        <ClientRow logos={clients.row2} direction="right" />
      </div>
    </section>
  )
}
