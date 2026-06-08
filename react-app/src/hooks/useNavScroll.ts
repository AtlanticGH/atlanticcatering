import { useEffect } from 'react'

export function useNavScroll(isHomePage: boolean) {
  useEffect(() => {
    const mainNav = document.getElementById('main-nav')
    const heroSection = document.getElementById('hero-section')

    if (!mainNav) return

    const updateNavBackground = () => {
      if (heroSection && isHomePage) {
        const heroTop = heroSection.offsetTop
        const heroHeight = heroSection.offsetHeight
        const scrollY = window.scrollY
        const progress =
          heroHeight > 0 ? Math.min(1, Math.max(0, (scrollY - heroTop) / heroHeight)) : 1

        mainNav.style.setProperty('--nav-bg-opacity', String(progress * 0.9))

        if (progress >= 0.5) {
          mainNav.classList.remove('nav-over-hero')
        } else {
          mainNav.classList.add('nav-over-hero')
        }

        mainNav.classList.toggle('backdrop-blur-md', progress > 0)
        mainNav.classList.toggle('shadow-sm', progress >= 1)
      } else {
        mainNav.style.setProperty('--nav-bg-opacity', '0.9')
        mainNav.classList.remove('nav-over-hero')
        mainNav.classList.add('backdrop-blur-md', 'shadow-sm')
      }
    }

    updateNavBackground()
    window.addEventListener('scroll', updateNavBackground, { passive: true })
    window.addEventListener('resize', updateNavBackground)

    return () => {
      window.removeEventListener('scroll', updateNavBackground)
      window.removeEventListener('resize', updateNavBackground)
      mainNav.style.removeProperty('--nav-bg-opacity')
      mainNav.classList.remove('nav-over-hero', 'backdrop-blur-md', 'shadow-sm')
    }
  }, [isHomePage])
}
