import { useContext } from 'react'
import { ContentContext } from '@/context/content-context'
import type { SiteContent } from '@/lib/content/types'

export function useContent(): SiteContent {
  const state = useContext(ContentContext)
  if (!state?.content) {
    throw new Error('useContent must be used within ContentProvider when content is loaded')
  }
  return state.content
}

export function useContentState() {
  const state = useContext(ContentContext)
  if (!state) {
    throw new Error('useContentState must be used within ContentProvider')
  }
  return state
}
