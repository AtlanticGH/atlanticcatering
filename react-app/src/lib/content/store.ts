import type { CmsCollectionId } from '@/cms/collections'
import { CMS_COLLECTIONS } from '@/cms/collections'
import { loadFallbackContent } from '@/lib/content/fallback'
import { hydrateSiteContent } from '@/lib/content/hydrate'
import type { SiteContent } from '@/lib/content/types'
import { getSupabase } from '@/lib/supabase/client'

const COLLECTION_KEY_MAP: Record<CmsCollectionId, keyof SiteContent> = {
  news: 'news',
  stats: 'stats',
  people: 'people',
  'services-page': 'servicesPage',
  'home-services': 'homeServices',
  clients: 'clients',
  contact: 'contact',
  'page-meta': 'pageMeta',
  home: 'home',
  sustainability: 'sustainability',
}

function rowsToSiteContent(rows: { id: string; data: unknown }[]): SiteContent | null {
  const fallback = loadFallbackContent()
  const content = { ...fallback }

  for (const row of rows) {
    const key = COLLECTION_KEY_MAP[row.id as CmsCollectionId]
    if (key) {
      ;(content as Record<string, unknown>)[key] = row.data
    }
  }

  return content
}

export async function fetchSiteContent(): Promise<SiteContent> {
  const supabase = getSupabase()
  if (!supabase) {
    return hydrateSiteContent(loadFallbackContent())
  }

  const { data, error } = await supabase.from('site_content').select('id, data')

  if (error || !data?.length) {
    console.warn('Supabase content fetch failed, using local fallback.', error?.message)
    return hydrateSiteContent(loadFallbackContent())
  }

  const merged = rowsToSiteContent(data)
  return hydrateSiteContent(merged ?? loadFallbackContent())
}

export async function fetchCollectionRaw(id: CmsCollectionId): Promise<unknown> {
  const supabase = getSupabase()
  if (!supabase) {
    const fallback = loadFallbackContent()
    const key = COLLECTION_KEY_MAP[id]
    return fallback[key]
  }

  const { data, error } = await supabase.from('site_content').select('data').eq('id', id).maybeSingle()

  if (error) throw new Error(error.message)
  if (data?.data) return data.data

  const fallback = loadFallbackContent()
  const key = COLLECTION_KEY_MAP[id]
  return fallback[key]
}

export async function saveCollection(id: CmsCollectionId, value: unknown): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    throw new Error('You must be signed in to save content.')
  }

  const { error } = await supabase.from('site_content').upsert({
    id,
    data: value,
    updated_at: new Date().toISOString(),
  })

  if (error) throw new Error(error.message)
}

export function getAllCollectionIds(): CmsCollectionId[] {
  return CMS_COLLECTIONS.map((collection) => collection.id)
}
