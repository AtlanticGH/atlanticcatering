import { useEffect } from 'react'

const DEFAULT_SELECTOR = '.stat-number, .workforce-stat'
const DEFAULT_DURATION = 2200

function animateCounterValue(
  element: HTMLElement,
  start: number,
  end: number,
  duration: number,
) {
  const suffix = element.dataset.suffix ?? ''
  const prefix = element.dataset.prefix ?? ''
  const isDecimal = String(end).includes('.')
  const startTime = performance.now()

  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - (1 - progress) ** 3
    let current = start + (end - start) * easeOut

    if (!isDecimal) {
      current = Math.floor(current)
    }

    const displayValue = isDecimal ? current : Math.floor(current).toLocaleString()
    element.textContent = `${prefix}${displayValue}${suffix}`

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      const finalValue = isDecimal ? end : Math.floor(end).toLocaleString()
      element.textContent = `${prefix}${finalValue}${suffix}`
    }
  }

  requestAnimationFrame(update)
}

export function useAnimatedCounter(
  selector: string = DEFAULT_SELECTOR,
  duration: number = DEFAULT_DURATION,
) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const element = entry.target as HTMLElement
          if (element.dataset.animated === 'true') return

          element.dataset.animated = 'true'
          const target = Number.parseInt(element.dataset.target ?? '0', 10)
          animateCounterValue(element, 0, Number.isNaN(target) ? 0 : target, duration)
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [selector, duration])
}
