import { useCallback, useEffect, useRef, useState } from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Link } from '@/components/Link'
import { PageHero } from '@/components/PageHero'
import { PillarLightbox } from '@/components/PillarLightbox'
import {
  sustainabilityPageData,
  type AtlanticCaresMediaItem,
  type ImpactMetric,
  type SustainabilityInitiative,
  type SustainabilityPillar,
} from '@/data/sustainability'
import { assetUrl } from '@/utils/assets'

const AUTO_PLAY_MS = 5000

function PillarIcon({ iconKey }: { iconKey: string }) {
  const className = 'w-5 h-5 text-acll-green'

  if (iconKey === 'environment' || iconKey === 'leaf') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.09-13 3.08z" />
      </svg>
    )
  }

  if (iconKey === 'social' || iconKey === 'users') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }

  if (iconKey === 'governance' || iconKey === 'shield') {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  }

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function PillarsSection() {
  const { pillarsIntro, pillars } = sustainabilityPageData

  return (
    <div id="sustainability-pillars" className="sustainability-pillars py-16 lg:py-20 border-b border-acll-navy/[0.06]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <FadeIn as="section" className="max-w-3xl mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-acll-green">{pillarsIntro.kicker}</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-acll-navy">{pillarsIntro.heading}</h2>
          <p className="mt-3 text-sm sm:text-base text-acll-muted">{pillarsIntro.body}</p>
        </FadeIn>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4" aria-label="Sustainability pillars">
          {pillars.map((pillar: SustainabilityPillar) => (
            <FadeIn key={pillar.id} as="article" className="flex flex-col gap-3 rounded-2xl border border-acll-navy/[0.08] bg-white/90 p-5 shadow-sm hover:shadow-md hover:border-acll-green/40 transition">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-acll-green/10 text-acll-green mb-1">
                <PillarIcon iconKey={pillar.icon || pillar.id} />
              </div>
              <h3 className="text-sm font-semibold text-acll-navy">{pillar.title}</h3>
              <p className="text-xs sm:text-sm text-acll-muted leading-relaxed">{pillar.description}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}

function AtlanticCaresSlider({ mediaItems }: { mediaItems: AtlanticCaresMediaItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex((index + mediaItems.length) % mediaItems.length)
    },
    [mediaItems.length],
  )

  useEffect(() => {
    if (paused || mediaItems.length <= 1) return

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mediaItems.length)
    }, AUTO_PLAY_MS)

    return () => window.clearInterval(timer)
  }, [paused, mediaItems.length])

  return (
    <div
      className="relative mt-10"
      aria-label="Atlantic CARES gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-2xl border border-acll-navy/[0.08] bg-acll-gray/40">
        <div className="relative cares-slides-wrapper">
          {mediaItems.map((item, index) => (
            <figure
              key={item.id}
              className={`cares-slide relative ${index === currentIndex ? 'block' : 'hidden'}`}
            >
              <img
                src={item.image}
                alt={item.alt || item.title}
                loading="lazy"
                decoding="async"
                className="h-72 w-full object-cover sm:h-80 lg:h-96"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-20 text-base text-slate-50">
                <p className="text-sm uppercase tracking-[0.14em] text-acll-green/90 mb-0">Atlantic CARES in action</p>
                <p className="font-semibold text-lg sm:text-xl lg:text-2xl leading-tight">{item.title}</p>
                <p className="mt-0 text-sm sm:text-base text-slate-100/80 leading-snug">{item.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {mediaItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`cares-dot h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-acll-green' : 'bg-acll-navy/20 hover:bg-acll-navy/35'
              }`}
              aria-label={`Show slide ${index + 1}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            className="cares-prev inline-flex h-8 w-8 items-center justify-center rounded-full text-acll-navy/60 hover:text-acll-navy hover:bg-acll-navy/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acll-green focus-visible:ring-offset-1"
            aria-label="Previous slide"
            onClick={() => goTo(currentIndex - 1)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            className="cares-next inline-flex h-8 w-8 items-center justify-center rounded-full text-acll-navy/60 hover:text-acll-navy hover:bg-acll-navy/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acll-green focus-visible:ring-offset-1"
            aria-label="Next slide"
            onClick={() => goTo(currentIndex + 1)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

interface GalleryImage {
  src: string
  alt: string
}

function PillarGallery({
  images,
  onImageClick,
}: {
  images: GalleryImage[]
  onImageClick: (image: GalleryImage) => void
}) {
  return (
    <>
      <p className="text-xs font-medium text-slate-500 mb-2">Click any photo to view</p>
      <div className="pillar-gallery flex flex-nowrap gap-2 mb-6">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="pillar-gallery-thumb flex-1 aspect-[16/9] rounded-lg overflow-hidden border-2 border-transparent hover:border-acll-green focus:outline-none focus:ring-2 focus:ring-acll-green relative"
            aria-label={`View photo ${index + 1}`}
            onClick={() => onImageClick(image)}
          >
            <img src={image.src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </>
  )
}

function MetricCard({ metric }: { metric: ImpactMetric }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState('0')
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated.current) return
          hasAnimated.current = true

          const duration = 900
          const start = performance.now()

          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - (1 - progress) ** 3
            const current = Math.round(metric.value * eased)
            setDisplayValue(current.toLocaleString())
            if (progress < 1) {
              requestAnimationFrame(step)
            } else {
              setDisplayValue(metric.value.toLocaleString())
            }
          }

          requestAnimationFrame(step)
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [metric.value])

  const accentClass =
    metric.accent === 'env'
      ? 'bg-acll-green/10 text-acll-green'
      : metric.accent === 'social'
        ? 'bg-acll-gray text-acll-navy/80'
        : metric.accent === 'safety'
          ? 'bg-amber-100 text-amber-700'
          : 'bg-acll-gray text-acll-navy/70'

  return (
    <FadeIn as="article" className="rounded-2xl border border-acll-navy/[0.08] bg-white p-5 shadow-sm">
      <div className={`mb-3 inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${accentClass}`}>
        {metric.label}
      </div>
      <p className="text-3xl sm:text-3xl font-semibold tracking-tight text-acll-navy">
        <span ref={ref} className="metric-value">
          {displayValue}
        </span>
        {metric.suffix.trim() ? (
          <span className="ml-1 align-baseline text-lg">{metric.suffix.trim()}</span>
        ) : null}
      </p>
      <p className="mt-1 text-xs sm:text-sm text-acll-muted">{metric.context}</p>
    </FadeIn>
  )
}

function focusTagClasses(focusKey: string) {
  if (focusKey === 'environment') return 'bg-acll-green/10 text-acll-green'
  return 'bg-acll-gray text-acll-navy/80'
}

export function SustainabilityPage() {
  const data = sustainabilityPageData
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  const openLightbox = useCallback((image: GalleryImage) => {
    setLightbox({ src: image.src, alt: image.alt })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
  }, [])

  return (
    <>
      <PageHero
        eyebrow={data.hero.kicker}
        title={data.hero.title}
        description={data.hero.subtitle}
      />

      <section id="atlantic-cares" className="py-0 border-b border-slate-200" aria-labelledby="atlantic-cares-heading">
        <PillarsSection />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24 bg-white">
          <div id="atlantic-cares-intro">
          <FadeIn>
            <p id="atlantic-cares-heading" className="text-xs font-semibold uppercase tracking-[0.2em] text-acll-green">
              {data.atlanticCaresIntro.kicker}
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-acll-navy">
              {data.atlanticCaresIntro.heading}
            </h2>
            <p className="mt-6 text-slate-700 text-[15px] leading-relaxed">{data.atlanticCaresIntro.body1}</p>
            <p className="mt-4 text-slate-700 text-[15px] leading-relaxed">
              {data.atlanticCaresIntro.body2}
              <strong>{data.atlanticCaresIntro.body2Bold}</strong>
              {data.atlanticCaresIntro.body2Rest}
            </p>
          </FadeIn>
          </div>

          <AtlanticCaresSlider mediaItems={data.atlanticCaresMedia} />

          {/* Pillar 1: The Prosperity Project */}
          <div className="mt-14 pt-10 border-t border-slate-200">
            <div className="mb-4 rounded-2xl overflow-hidden bg-acll-gray pillar-hero relative">
              <img
                src={assetUrl('images/DSC04598.jpg')}
                alt="Community members and Atlantic team engaged in social impact activities"
                loading="lazy"
                decoding="async"
                className="pillar-hero-img h-72 w-full object-cover sm:h-80 lg:h-96"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-20">
                <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl tracking-tight text-white">
                  The Prosperity Project <span className="font-normal text-white/85">(Social Impact)</span>
                </h3>
                <p className="mt-0.5 text-sm sm:text-base text-white/90 leading-snug">
                  Empowering communities through inclusive growth initiatives:
                </p>
              </div>
            </div>
            <PillarGallery
              onImageClick={openLightbox}
              images={[
                { src: assetUrl('images/DSC04603.jpg'), alt: 'Community and social impact' },
                { src: assetUrl('images/DSC04610.jpg'), alt: 'Training and community' },
                { src: assetUrl('images/DSC04664.jpg'), alt: 'Prosperity Project in action' },
                { src: assetUrl('images/DSC04801.jpg'), alt: 'Clean Street Bites and initiatives' },
                { src: assetUrl('images/DSC04813.jpg'), alt: 'Community event' },
              ]}
            />
            <ul className="mt-6 space-y-8">
              <li>
                <h4 className="text-base font-semibold text-slate-900">Clean Street Bites Initiative</h4>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  A nationwide community development programme that trains street food vendors across all 16 regions. The initiative promotes food safety and hygiene through hands-on training, provision of personal protective equipment (PPE) and health education, empowering vendors to deliver safer, higher-quality food to their communities.
                </p>
              </li>
              <li>
                <h4 className="text-base font-semibold text-slate-900">Palm Prosperity Project</h4>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  The Palm Prosperity Project builds an end-to-end palm oil sourcing model with smallholder palm-growing communities. It spans the entire value chain, from farmer training and input quality control to aggregation and long-term supply arrangements. The palm oil will serve as a key input in both our core catering operations and Atlantic Retail&apos;s off-the-shelf food products. The goal is to ensure volume reliability, traceability and sustainable sourcing, while strengthening community livelihoods.
                </p>
              </li>
              <li>
                <h4 className="text-base font-semibold text-slate-900">HerAgriPath Initiative</h4>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  Empowering women farmers and connecting them to Atlantic&apos;s value chain.
                </p>
              </li>
              <li>
                <h4 className="text-base font-semibold text-slate-900">LiftHer Project (Kayayei)</h4>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  Supporting vulnerable women with dignified employment.
                </p>
              </li>
              <li>
                <h4 className="text-base font-semibold text-slate-900">Green Apron Internship Programme</h4>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  The Green Apron Programme is our internship initiative. &ldquo;Apron&rdquo; reflects readiness to serve across roles, while &ldquo;Green&rdquo; symbolises the company&apos;s commitment to sustainable growth. Housed under the Atlantic CARES framework, the programme targets vocational students but is open to all academic backgrounds to ensure inclusivity, diverse talent exposure and broader impact.
                </p>
              </li>
              <li>
                <h4 className="text-base font-semibold text-slate-900">Supplier Engagement Forums</h4>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  Strengthening partnerships with ethical local suppliers.
                </p>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Waste to Wealth */}
          <div className="mt-14 pt-10 border-t border-slate-200">
            <div className="mb-4 rounded-2xl overflow-hidden bg-acll-gray pillar-hero relative">
              <img
                src={assetUrl('images/DSC04606.jpg')}
                alt="Kitchen and operations team sorting materials for reuse and recycling"
                loading="lazy"
                decoding="async"
                className="pillar-hero-img h-72 w-full object-cover sm:h-80 lg:h-96"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-20">
                <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl tracking-tight text-white">
                  Waste to Wealth <span className="font-normal text-white/85">(Environmental Stewardship)</span>
                </h3>
                <p className="mt-0.5 text-sm sm:text-base text-white/90 leading-snug">Turning waste into purpose.</p>
              </div>
            </div>
            <PillarGallery
              onImageClick={openLightbox}
              images={[
                { src: assetUrl('images/DSC04967.jpg'), alt: 'Waste sorting and recycling' },
                { src: assetUrl('images/DSC04979.jpg'), alt: 'Kitchen operations' },
                { src: assetUrl('images/DSC04990.jpg'), alt: 'Oil2Soap and recycling' },
                { src: assetUrl('images/IMG_0490.jpg'), alt: 'Environmental initiatives' },
              ]}
            />
            <p className="text-sm text-slate-600 leading-relaxed">
              We turn what others discard into opportunities: repurposing used oil into soap, fruit waste into organic manure and introducing energy-efficient systems that reduce our footprint.
            </p>
            <p className="mt-3 text-sm text-slate-600">Programmes include:</p>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-acll-green shrink-0" />
                Oil2Soap Initiative
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-acll-green shrink-0" />
                Fruit-to-Fertilizer Project
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-acll-green shrink-0" />
                Waste Sorting &amp; Food Waste Reduction
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-acll-green shrink-0" />
                Energy &amp; Delivery Optimization (Journey Management)
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-acll-green shrink-0" />
                Free Single-Use Plastic Operations
              </li>
            </ul>
          </div>

          {/* Pillar 3: Governance & Reporting */}
          <div className="mt-14 pt-10 border-t border-slate-200">
            <div className="mb-4 rounded-2xl overflow-hidden bg-acll-gray pillar-hero relative">
              <img
                src={assetUrl('images/DSC04813.jpg')}
                alt="Atlantic leadership reviewing governance, reporting and ethics frameworks"
                loading="lazy"
                decoding="async"
                className="pillar-hero-img h-72 w-full object-cover sm:h-80 lg:h-96"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-20">
                <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl tracking-tight text-white">
                  Governance &amp; Reporting <span className="font-normal text-white/85">(Accountability &amp; Ethics)</span>
                </h3>
                <p className="mt-0.5 text-sm sm:text-base text-white/90 leading-snug">
                  We uphold strong governance systems to ensure accountability, transparency, and ethical conduct across all operations. Our governance framework includes:
                </p>
              </div>
            </div>
            <PillarGallery
              onImageClick={openLightbox}
              images={[
                { src: assetUrl('images/IMG_0467.jpg'), alt: 'Governance and compliance' },
                { src: assetUrl('images/DSC04601.jpg'), alt: 'Ethics and reporting' },
                { src: assetUrl('images/DSC04603.jpg'), alt: 'ISO and standards' },
                { src: assetUrl('images/DSC04610.jpg'), alt: 'Leadership and governance' },
              ]}
            />
            <ul className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                <span>
                  <strong className="text-slate-800">Code of Conduct &amp; Compliance Framework</strong>, guiding all employees and stakeholders in ethical decision-making.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                <span>
                  <strong className="text-slate-800">UN Global Compact Membership and Reporting</strong>, aligning our operations with global sustainability and ethical standards.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                <span>
                  <strong className="text-slate-800">Open-ES Reporting</strong>, promoting transparency in environmental, social and governance (ESG) practices.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                <span>
                  <strong className="text-slate-800">ISO Certification Oversight</strong>, ensuring adherence to international quality and management standards.
                </span>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-sm font-semibold text-slate-900">Whistleblower Reporting Channel</h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Any violations of our Code of Conduct can be reported anonymously via email:{' '}
                <a href="mailto:whistleblower@atlanticcatering-gh.com" className="text-acll-green font-medium hover:underline">
                  whistleblower@atlanticcatering-gh.com
                </a>
                . This channel is managed by an independent third party. All reports are confidential and protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="sustainability-initiatives" className="py-16 lg:py-20 bg-white border-b border-acll-navy/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeIn as="section" className="max-w-3xl mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-acll-green">{data.initiativesIntro.kicker}</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-acll-navy">{data.initiativesIntro.heading}</h2>
            <p className="mt-3 text-sm sm:text-base text-acll-muted">{data.initiativesIntro.body}</p>
          </FadeIn>
          <div className="initiatives-scroll flex gap-5 overflow-x-auto overflow-y-hidden flex-nowrap pb-2" aria-label="Sustainability initiatives and programmes">
            {data.initiatives.map((item: SustainabilityInitiative) => (
              <article
                key={item.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-acll-navy/[0.08] bg-white shadow-sm hover:shadow-md hover:border-acll-green/40 transition shrink-0 w-[320px] min-w-[320px]"
              >
                <div className="aspect-[16/10] w-full shrink-0 overflow-hidden bg-acll-gray">
                  <img
                    src={item.image}
                    alt={item.imageAlt || item.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col p-5">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium mb-3 ${focusTagClasses(item.focusKey)}`}>
                    {item.focus}
                  </span>
                  <h3 className="text-sm font-semibold text-acll-navy">{item.name}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-acll-muted leading-relaxed">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="sustainability-journey" className="py-16 lg:py-20 bg-white border-b border-acll-navy/[0.06]" aria-labelledby="journey-2030-heading">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeIn as="section" className="mb-12">
            <h2 id="journey-2030-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-acll-navy">
              {data.journey2030.journeyHeading}
            </h2>
          </FadeIn>

          <section className="mb-14" aria-labelledby="priorities-heading">
            <h3 id="priorities-heading" className="text-xs font-semibold uppercase tracking-[0.2em] text-acll-green mb-6">
              {data.journey2030.prioritiesHeading}
            </h3>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none" start={1}>
              {data.journey2030.priorities.map((priority, index) => (
                <li key={priority.title} className="flex gap-4 rounded-xl border border-acll-navy/[0.08] bg-white p-4 sm:p-5 shadow-sm">
                  <FadeIn className="flex gap-4 w-full">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-acll-green/10 text-sm font-semibold text-acll-green" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-acll-navy">{priority.title}</h4>
                    <p className="mt-1 text-sm text-acll-muted leading-relaxed">{priority.objective}</p>
                  </div>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-14" aria-labelledby="commitments-heading">
            <h3 id="commitments-heading" className="text-xs font-semibold uppercase tracking-[0.2em] text-acll-green mb-6">
              {data.journey2030.commitmentsHeading}
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {data.journey2030.commitmentGroups.map((group) => (
                <FadeIn key={group.title} className="rounded-xl border border-acll-navy/[0.08] bg-acll-gray/30 p-5 sm:p-6">
                  <h4 className="text-sm font-semibold text-acll-navy mb-3">{group.title}</h4>
                  <ul className="space-y-2 text-sm text-acll-muted">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-acll-green" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              ))}
            </div>
          </section>

          <section className="mb-10" aria-labelledby="news-heading">
            <h3 id="news-heading" className="text-xs font-semibold uppercase tracking-[0.2em] text-acll-green mb-6">
              {data.journey2030.newsHeading}
            </h3>
          </section>

          <FadeIn className="rounded-2xl border border-acll-navy/[0.08] bg-acll-gray/40 p-6 sm:p-8 lg:p-10" aria-labelledby="careers-heading">
            <h3 id="careers-heading" className="text-lg sm:text-xl font-semibold text-acll-navy mb-4">
              {data.journey2030.careersHeading}
            </h3>
            <p className="text-sm sm:text-base text-acll-muted leading-relaxed mb-6">{data.journey2030.careersBody}</p>
            <Link
              to={data.journey2030.careersCtaHref}
              className="relative inline-flex items-center justify-center gap-2 rounded-full bg-acll-green px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-acll-green/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acll-green focus-visible:ring-offset-2 w-full sm:w-auto max-w-full"
            >
              {data.journey2030.careersCtaLabel}
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </section>

      <section id="sustainability-compliance" className="py-16 lg:py-20 bg-white border-b border-acll-navy/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeIn as="section" className="max-w-3xl mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-acll-green">{data.compliance.kicker}</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-acll-navy">{data.compliance.heading}</h2>
            <p className="mt-3 text-sm sm:text-base text-acll-muted">{data.compliance.body}</p>
          </FadeIn>
          <div className="grid gap-8 md:grid-cols-3">
            <section aria-label="ESG frameworks">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-acll-navy mb-3">Frameworks</h3>
              <ul className="space-y-2 text-sm text-acll-navy/80">
                {data.compliance.frameworks.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-acll-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-label="Standards and certifications">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-acll-navy mb-3">Standards & certifications</h3>
              <ul className="space-y-2 text-sm text-acll-navy/80">
                {data.compliance.standards.map((item) => (
                  <li key={item} className="inline-flex items-center rounded-full border border-acll-navy/[0.12] px-2.5 py-1 text-[11px] font-medium bg-acll-gray">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section aria-label="Reporting and disclosures">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-acll-navy mb-3">Reporting</h3>
              <ul className="space-y-2 text-sm text-acll-navy/80">
                {data.compliance.reporting.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-acll-navy/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>

      <section id="sustainability-impact" className="py-16 lg:py-20 bg-acll-gray border-y border-acll-navy/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeIn as="section" className="max-w-3xl mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-acll-green">{data.impactIntro.kicker}</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-acll-navy">{data.impactIntro.heading}</h2>
            <p className="mt-3 text-sm sm:text-base text-acll-muted">{data.impactIntro.body}</p>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-label="Key sustainability metrics">
            {data.impactMetrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </div>
      </section>

      <section id="sustainability-cta" className="py-16 lg:py-20 bg-acll-navy text-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeIn className="rounded-2xl border border-white/10 bg-acll-navy px-6 py-8 sm:px-8 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-acll-green mb-2">{data.cta.kicker}</p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">{data.cta.heading}</h2>
              <p className="text-sm sm:text-base text-white/80">{data.cta.body}</p>
            </div>
            <div className="mt-6 lg:mt-0 flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={data.cta.primaryHref}
                className="inline-flex items-center justify-center rounded-full bg-acll-green px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-acll-green/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acll-green focus-visible:ring-offset-2 focus-visible:ring-offset-acll-navy"
              >
                {data.cta.primaryLabel}
              </a>
              <Link
                to={data.cta.secondaryHref}
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white/90 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acll-green focus-visible:ring-offset-2 focus-visible:ring-offset-acll-navy"
              >
                {data.cta.secondaryLabel}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <PillarLightbox
        open={lightbox !== null}
        src={lightbox?.src ?? ''}
        alt={lightbox?.alt ?? ''}
        onClose={closeLightbox}
      />
    </>
  )
}
