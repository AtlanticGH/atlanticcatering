import { useEffect, useState } from 'react'
import type { CmsCollectionId, CmsCollectionMeta } from '@/cms/collections'
import { fetchCollectionRaw, saveCollection } from '@/lib/content/store'

export function useCollectionEditor(collection: CmsCollectionMeta) {
  const [data, setData] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetchCollectionRaw(collection.id as CmsCollectionId)
      .then((content) => {
        if (!cancelled) {
          setData(content)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load')
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [collection.id])

  async function handleSave() {
    if (data === null) return
    setSaving(true)
    setMessage('')
    setError('')
    try {
      await saveCollection(collection.id as CmsCollectionId, data)
      setMessage('Saved successfully. Refresh the public site to see updates.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return { data, setData, loading, saving, message, error, handleSave }
}
