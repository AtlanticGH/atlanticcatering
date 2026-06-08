import { PageHero } from '@/components/PageHero'
import { FadeIn } from '@/components/FadeIn'
import { ContactForm } from '@/components/ContactForm'

export function ContactPage() {
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
                    href="mailto:info@atlanticcatering-gh.com"
                    className="text-acll-navy font-medium hover:text-acll-green transition-colors"
                  >
                    info@atlanticcatering-gh.com
                  </a>
                  <p className="text-[13px] text-acll-muted mt-0.5">Response within 24 hours</p>
                </div>
                <div>
                  <a
                    href="tel:+233302000000"
                    className="text-acll-navy font-medium hover:text-acll-green transition-colors"
                  >
                    +233 30 200 0000
                  </a>
                  <p className="text-[13px] text-acll-muted mt-0.5">Mon–Fri, 8am–5pm GMT</p>
                </div>
                <div>
                  <p className="text-acll-navy font-medium">Headquartered in Ghana</p>
                  <p className="text-[13px] text-acll-muted mt-0.5">Accra</p>
                </div>
                <div>
                  <a
                    href="mailto:careers@atlanticcatering-gh.com"
                    className="text-acll-navy font-medium hover:text-acll-green transition-colors"
                  >
                    careers@atlanticcatering-gh.com
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.486923508749!2d-0.1870!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14f6e9d14c2b8!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh"
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
