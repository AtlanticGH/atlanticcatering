import { useEffect, useRef } from 'react'

const DEFAULT_OPTIONS: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px',
}

export function useFadeIn(options: IntersectionObserverInit = DEFAULT_OPTIONS) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, options)

    observer.observe(element)

    return () => observer.disconnect()
  }, [options.threshold, options.root, options.rootMargin])

  return ref
}
