import { useCallback, useRef, type RefCallback } from 'react'

const FADE_IN_OPTIONS: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px',
}

function revealElement(element: Element) {
  element.classList.add('visible')
}

function isInViewport(element: Element) {
  const rect = element.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}

export function useFadeIn(): RefCallback<Element> {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const fallbackRef = useRef<number | null>(null)

  return useCallback((element: Element | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    if (fallbackRef.current !== null) {
      window.clearTimeout(fallbackRef.current)
      fallbackRef.current = null
    }

    if (!element || !(element instanceof HTMLElement)) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealElement(entry.target)
        }
      })
    }, FADE_IN_OPTIONS)

    observer.observe(element)
    observerRef.current = observer

    if (isInViewport(element)) {
      revealElement(element)
    }

    fallbackRef.current = window.setTimeout(() => {
      revealElement(element)
    }, 800)
  }, [])
}
