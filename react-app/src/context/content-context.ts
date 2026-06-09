import { createContext } from 'react'
import type { SiteContent } from '@/lib/content/types'

export type ContentState = {
  content: SiteContent | null
  loading: boolean
  error: string | null
  refresh: (options?: { silent?: boolean }) => Promise<void>
}

export const ContentContext = createContext<ContentState | null>(null)
