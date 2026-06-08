import { PageHero } from '@/components/PageHero'
import { FadeIn } from '@/components/FadeIn'
import { ContactForm } from '@/components/ContactForm'
import { useContent } from '@/hooks/useSiteContent'

export function ContactPage() {
  const { contact: contactContent } = useContent()
  return (
    <div className="contact-page">
      <PageHero
        eyebrow="Get in touch"
        title="Contact us"
        description="Get in touch with our team—we're here to help."
      />

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <FadeIn className="lg:col-span-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-acll-navy mb-4">
                Contact Details
              </h2>
              <div className="space-y-4">
                <div>
                  <a
                    href={`mailto:${contactContent.email}`}
                    className="text-acll-navy font-medium hover:text-acll-green transition-colors"
                  >
                    {contactContent.email}
                  </a>
                  <p className="text-[13px] text-acll-muted mt-0.5">{contactContent.emailNote}</p>
                </div>
                <div>
                  <a
                    href={`tel:${contactContent.phoneHref}`}
                    className="text-acll-navy font-medium hover:text-acll-green transition-colors"
                  >
                    {contactContent.phone}
                  </a>
                  <p className="text-[13px] text-acll-muted mt-0.5">{contactContent.phoneNote}</p>
                </div>
                <div>
                  <p className="text-acll-navy font-medium">{contactContent.location}</p>
                  <p className="text-[13px] text-acll-muted mt-0.5">{contactContent.city}</p>
                </div>
                <div>
                  <a
                    href={`mailto:${contactContent.careersEmail}`}
                    className="text-acll-navy font-medium hover:text-acll-green transition-colors"
                  >
                    {contactContent.careersEmail}
                  </a>
                  <p className="text-[13px] text-acll-muted mt-0.5">Careers &amp; vacancies</p>
                </div>
                <div>
                  <a
                    href="mailto:whistleblower@atlanticcatering-gh.com"
                    className="text-acll-navy font-medium hover:text-acll-green transition-colors"
                  >
                    Report misconduct
                  </a>
                  <p className="text-[13px] text-acll-muted mt-0.5">Confidential</p>
                </div>
              </div>
            </FadeIn>

            <div className="lg:col-span-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-acll-navy mb-6">
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="contact-map-section py-16 lg:py-24 border-y border-acll-navy/[0.06] contact-location-section">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green">
              Find us
            </span>
          </FadeIn>
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-acll-navy tracking-tight mt-1 mb-2">
              Our location
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="text-acll-muted text-[15px] mb-8 max-w-2xl">
              Headquartered in Accra. Visit us or get directions.
            </p>
          </FadeIn>
          <FadeIn className="contact-map-card rounded-2xl overflow-hidden border border-acll-navy/[0.08] shadow-md bg-white">
            <div className="contact-map-wrapper min-h-[45vh] sm:min-h-[50vh] relative bg-acll-gray/20">
              <iframe
                src={contactContent.mapEmbedUrl}
                className="contact-map absolute inset-0 w-full h-full border-0"
                title="Atlantic Catering & Logistics – Accra, Ghana"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
