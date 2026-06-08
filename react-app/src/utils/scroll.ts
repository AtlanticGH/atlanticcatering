export function scrollToHash(hash: string, maxAttempts = 50, intervalMs = 100): void {
  if (!hash || hash === '#') return

  const id = hash.startsWith('#') ? hash.slice(1) : hash
  if (!id) return

  let attempts = 0

  const tryScroll = () => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    attempts += 1
    if (attempts < maxAttempts) {
      window.setTimeout(tryScroll, intervalMs)
    }
  }

  window.requestAnimationFrame(tryScroll)
}
