import { FadeIn } from '@/components/FadeIn'
import { PageHero } from '@/components/PageHero'

export function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Join us"
        title="Careers at Atlantic Catering and Logistics Limited"
        description="Grow with us. We're always looking for people who share our commitment to quality, safety and impact."
      />

      <section className="careers-section py-16 lg:py-24 border-y border-acll-navy/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green">
              Why Atlantic Catering and Logistics Limited
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-acll-navy tracking-tight mt-1 mb-8">
              Equal opportunity employer
            </h2>
          </FadeIn>

          <FadeIn className="max-w-2xl">
            <p className="text-acll-navy/85 text-[15px] mb-6 leading-relaxed">
              We believe in <strong>diversity, inclusion</strong> and giving every team member the opportunity to grow.
              If you&apos;re passionate about food, logistics and making an impact, we&apos;d like to hear from you.
            </p>
            <ul className="space-y-2.5 text-acll-navy/85 text-[15px] mb-8">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-acll-green shrink-0" />
                Multi-ISO certified environment
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-acll-green shrink-0" />
                Operations across Ghana and beyond
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-acll-green shrink-0" />
                Training and development
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-acll-green shrink-0" />
                565+ employees and growing
              </li>
            </ul>
            <p className="text-acll-navy/80 text-[14px] mb-6">
              Send your CV and a short note—we&apos;ll get back to you when a suitable role opens.
            </p>
            <a
              href="mailto:careers@atlanticcatering-gh.com"
              className="careers-cta inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium text-white bg-acll-green hover:bg-acll-green/90 transition-colors shadow-sm"
            >
              careers@atlanticcatering-gh.com
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green">Open roles</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-acll-navy tracking-tight mt-1 mb-4">Current openings</h2>
            <p className="text-acll-muted text-[15px] mb-10">
              Job listings will appear here. Check back soon or send us your details for future roles.
            </p>
          </FadeIn>

          <FadeIn className="space-y-4 max-w-3xl">
            <div className="careers-job-card rounded-2xl border border-acll-navy/[0.08] bg-white p-5 lg:p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm hover:shadow-md hover:border-acll-green/30 transition-all duration-200">
              <div>
                <h3 className="font-semibold text-acll-navy text-[15px]">Role title placeholder</h3>
                <p className="text-[13px] text-acll-muted mt-0.5">Location · Department</p>
              </div>
              <span className="text-[12px] font-medium text-acll-muted uppercase tracking-wider">Coming soon</span>
            </div>
            <div className="careers-job-card rounded-2xl border border-acll-navy/[0.08] bg-white p-5 lg:p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm hover:shadow-md hover:border-acll-green/30 transition-all duration-200">
              <div>
                <h3 className="font-semibold text-acll-navy text-[15px]">Role title placeholder</h3>
                <p className="text-[13px] text-acll-muted mt-0.5">Location · Department</p>
              </div>
              <span className="text-[12px] font-medium text-acll-muted uppercase tracking-wider">Coming soon</span>
            </div>
          </FadeIn>

          <FadeIn className="text-acll-muted text-[14px] mt-8">
            Can&apos;t find a fit? Email us at{' '}
            <a href="mailto:careers@atlanticcatering-gh.com" className="text-acll-green hover:underline">
              careers@atlanticcatering-gh.com
            </a>{' '}
            with your CV and we&apos;ll keep you in mind.
          </FadeIn>
        </div>
      </section>
    </>
  )
}
