import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FadeIn } from '@/components/FadeIn'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { StatCard } from '@/components/StatCard'
import { RecentNewsCollage } from '@/components/RecentNewsCollage'
import { ClientsMarquee } from '@/components/ClientsMarquee'
import { ServicesScroll } from '@/components/ServicesScroll'
import { VideoModal } from '@/components/VideoModal'
import { useContent } from '@/hooks/useSiteContent'
import { assetUrl } from '@/utils/assets'

export function HomePage() {
  const { home: homeContent, stats } = useContent()
  useAnimatedCounter()
  const [videoOpen, setVideoOpen] = useState(false)
  const previewVideoRef = useRef<HTMLVideoElement>(null)
  const videoTriggerRef = useRef<HTMLButtonElement>(null)

  function openVideoModal() {
    previewVideoRef.current?.pause()
    videoTriggerRef.current?.classList.add('video-preview-pulse')
    window.setTimeout(() => videoTriggerRef.current?.classList.remove('video-preview-pulse'), 400)
    setVideoOpen(true)
  }

  function closeVideoModal() {
    setVideoOpen(false)
    previewVideoRef.current?.play().catch(() => {})
    videoTriggerRef.current?.focus()
  }

  return (
    <>
      {/* Hero */}
      <section
        id="hero-section"
        className="hero-full relative flex flex-col items-center justify-end bg-acll-navy overflow-hidden pb-24 sm:pb-28 md:pb-32 lg:pb-36 -mt-20 lg:-mt-24"
      >
        <video
          className="hero-bg-video absolute inset-0 w-full h-full object-cover object-center z-0"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          poster={assetUrl('images/DSC04598.jpg')}
        >
          <source src={assetUrl('video/herobw.mp4')} type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-[1] hero-overlay" aria-hidden="true" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto flex flex-col items-center mb-6 sm:mb-8 lg:mb-10">
          <FadeIn>
            <h1 className="hero-heading text-3xl min-[480px]:text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.15] tracking-tight mb-4 sm:mb-5 lg:mb-6">
              {homeContent.hero.titleLine1}
              <br className="hidden sm:block" />
              {homeContent.hero.titleLine2}
            </h1>
          </FadeIn>
          <FadeIn as="p" className="text-lg min-[480px]:text-xl sm:text-2xl text-white mb-8 sm:mb-10 max-w-xl mx-auto font-medium px-1">
            {homeContent.hero.subtitle}
          </FadeIn>
          <FadeIn className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link to="/about" className="hero-btn hero-btn-primary">
              View our story
            </Link>
            <Link to="/sustainability" className="hero-btn hero-btn-outline">
              See our impact
            </Link>
          </FadeIn>
        </div>
        <div className="absolute bottom-12 sm:bottom-14 left-0 right-0 z-10 flex justify-center pointer-events-none">
          <button
            type="button"
            className="scroll-indicator-mouse pointer-events-auto inline-flex flex-col items-center text-white/60 hero-scroll-hover transition-colors"
            aria-label="Scroll down"
            onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            <svg
              className="scroll-indicator-mouse-svg w-8 h-10 sm:w-9 sm:h-11"
              viewBox="0 0 24 32"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="5" y="2" width="14" height="26" rx="7" />
              <line x1="9" y1="10" x2="15" y2="10" className="scroll-indicator-wheel" />
            </svg>
            <span className="text-[10px] sm:text-xs mt-1 uppercase tracking-widest opacity-80">Scroll</span>
          </button>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-16 lg:py-24 bg-acll-gray border-y border-acll-navy/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section id="about" className="py-16 lg:py-24 bg-acll-gray">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green">
                About us
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-acll-navy tracking-tight mt-1 mb-5">
                Who we are
              </h2>
              <p className="text-acll-navy/85 text-[15px] mb-6">{homeContent.whoWeAre.intro}</p>
              <ul className="space-y-2.5 text-acll-navy/85 text-[15px] mb-8">
                {homeContent.whoWeAre.bullets.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-acll-navy/50" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-acll-green text-[14px] font-medium hover:text-acll-green/90 transition-colors"
              >
                Our services{' '}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </FadeIn>
            <FadeIn className="relative">
              <button
                ref={videoTriggerRef}
                type="button"
                className="video-preview-trigger relative w-full rounded-xl overflow-hidden bg-acll-navy flex items-center justify-center cursor-pointer border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-acll-green focus-visible:ring-offset-2"
                aria-label="Play video: Who we are"
                onClick={openVideoModal}
              >
                <video
                  ref={previewVideoRef}
                  className="video-preview-video absolute inset-0 w-full h-full object-cover rounded-xl"
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="auto"
                  poster={assetUrl('images/DSC04801.jpg')}
                  aria-hidden="true"
                >
                  <source src={assetUrl('video/ACLL VIDEO 1.mp4')} type="video/mp4" />
                </video>
                <span
                  className="video-preview-play relative z-10 flex items-center justify-center transition-all duration-300 ease-out"
                  aria-hidden="true"
                >
                  <span className="video-preview-play-inner flex items-center justify-center rounded-full border-2 border-white/90 bg-white/0 text-white backdrop-blur-0 transition-all duration-300 ease-out">
                    <svg className="w-6 h-6 ml-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      <RecentNewsCollage />
      <ClientsMarquee />
      <ServicesScroll />

      <VideoModal isOpen={videoOpen} onClose={closeVideoModal} />
    </>
  )
}
