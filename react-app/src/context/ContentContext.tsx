import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ContentContext } from '@/context/content-context'
import { fetchSiteContent } from '@/lib/content/store'

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(null as import('@/lib/content/types').SiteContent | null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function refresh() {
    setLoading(true)
    setError(null)
    try {
      const next = await fetchSiteContent()
      setContent(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let cancelled = false

    fetchSiteContent()
      .then((next) => {
        if (!cancelled) {
          setContent(next)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load content')
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(
    () => ({ content, loading, error, refresh }),
    [content, loading, error],
  )

  if (loading && !content) {
    return (
      <div className="py-24 text-center text-acll-muted text-sm" role="status" aria-live="polite">
        Loading site content…
      </div>
    )
  }

  if (error && !content) {
    return (
      <div className="py-24 px-5 text-center text-red-600 text-sm" role="alert">
        {error}
      </div>
    )
  }

  if (!content) return null

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
