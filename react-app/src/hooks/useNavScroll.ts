import { useCallback, useSyncExternalStore } from 'react'

export interface NavScrollState {
  navBgOpacity: number
  overHero: boolean
  hasBlur: boolean
  hasShadow: boolean
}

const DEFAULT_HOME_STATE: NavScrollState = {
  navBgOpacity: 0,
  overHero: true,
  hasBlur: false,
  hasShadow: false,
}

const DEFAULT_PAGE_STATE: NavScrollState = {
  navBgOpacity: 0.9,
  overHero: false,
  hasBlur: true,
  hasShadow: true,
}

let cachedHomeSnapshot: NavScrollState = DEFAULT_HOME_STATE

function computeHomeNavState(heroSection: HTMLElement): NavScrollState {
  const heroTop = heroSection.offsetTop
  const heroHeight = heroSection.offsetHeight
  const scrollY = window.scrollY
  const progress =
    heroHeight > 0 ? Math.min(1, Math.max(0, (scrollY - heroTop) / heroHeight)) : 1

  return {
    navBgOpacity: progress * 0.9,
    overHero: progress < 0.5,
    hasBlur: progress > 0,
    hasShadow: progress >= 1,
  }
}

function statesEqual(a: NavScrollState, b: NavScrollState): boolean {
  return (
    a.navBgOpacity === b.navBgOpacity &&
    a.overHero === b.overHero &&
    a.hasBlur === b.hasBlur &&
    a.hasShadow === b.hasShadow
  )
}

function getNavScrollSnapshot(isHomePage: boolean): NavScrollState {
  if (!isHomePage) return DEFAULT_PAGE_STATE

  const heroSection = document.getElementById('hero-section')
  if (!heroSection) return DEFAULT_HOME_STATE

  const next = computeHomeNavState(heroSection)
  if (statesEqual(cachedHomeSnapshot, next)) {
    return cachedHomeSnapshot
  }

  cachedHomeSnapshot = next
  return cachedHomeSnapshot
}

export function useNavScroll(isHomePage: boolean): NavScrollState {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      window.addEventListener('scroll', onStoreChange, { passive: true })
      window.addEventListener('resize', onStoreChange)

      let resizeObserver: ResizeObserver | null = null
      let retryTimer: number | null = null

      const observeHero = () => {
        const heroSection = document.getElementById('hero-section')
        if (!heroSection) return false

        if (retryTimer !== null) {
          window.clearInterval(retryTimer)
          retryTimer = null
        }

        resizeObserver?.disconnect()
        resizeObserver = new ResizeObserver(onStoreChange)
        resizeObserver.observe(heroSection)
        onStoreChange()
        return true
      }

      if (isHomePage && !observeHero()) {
        retryTimer = window.setInterval(() => {
          observeHero()
        }, 50)
      }

      onStoreChange()

      return () => {
        window.removeEventListener('scroll', onStoreChange)
        window.removeEventListener('resize', onStoreChange)
        resizeObserver?.disconnect()
        if (retryTimer !== null) {
          window.clearInterval(retryTimer)
        }
      }
    },
    [isHomePage],
  )

  const getSnapshot = useCallback(() => getNavScrollSnapshot(isHomePage), [isHomePage])

  const getServerSnapshot = useCallback(
    () => (isHomePage ? DEFAULT_HOME_STATE : DEFAULT_PAGE_STATE),
    [isHomePage],
  )

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
