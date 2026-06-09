import type { CmsCollectionId } from '@/cms/collections'
import { CMS_COLLECTIONS } from '@/cms/collections'
import { loadFallbackContent } from '@/lib/content/fallback'
import { hydrateSiteContent } from '@/lib/content/hydrate'
import type { ServiceItem, SiteContent } from '@/lib/content/types'
import { notifyContentUpdated } from '@/lib/content/sync'
import { getSupabase } from '@/lib/supabase/client'

const COLLECTION_KEY_MAP: Record<CmsCollectionId, keyof SiteContent> = {
  news: 'news',
  stats: 'stats',
  people: 'people',
  services: 'services',
  clients: 'clients',
  contact: 'contact',
  'page-meta': 'pageMeta',
  home: 'home',
  sustainability: 'sustainability',
}

const SERVICE_ROW_IDS = new Set(['services', 'services-page', 'home-services'])

function resolveServicesFromRows(
  rows: { id: string; data: unknown }[],
  fallback: ServiceItem[],
): ServiceItem[] {
  const unified = rows.find((row) => row.id === 'services')?.data
  if (unified) return unified as ServiceItem[]

  const legacyPage = rows.find((row) => row.id === 'services-page')?.data
  if (legacyPage) return legacyPage as ServiceItem[]

  return fallback
}

function rowsToSiteContent(rows: { id: string; data: unknown }[]): SiteContent {
  const fallback = loadFallbackContent()
  const content: Partial<SiteContent> = {}

  for (const row of rows) {
    if (SERVICE_ROW_IDS.has(row.id)) continue
    const key = COLLECTION_KEY_MAP[row.id as CmsCollectionId]
    if (key) {
      ;(content as Record<string, unknown>)[key] = row.data
    }
  }

  content.services = resolveServicesFromRows(rows, fallback.services)

  return {
    ...fallback,
    ...content,
    services: content.services ?? fallback.services,
  }
}

export async function fetchSiteContent(): Promise<SiteContent> {
  const supabase = getSupabase()
  if (!supabase) {
    console.warn('[content] Supabase not configured — using bundled fallback JSON.')
    return hydrateSiteContent(loadFallbackContent())
  }

  const { data, error } = await supabase
    .from('site_content')
    .select('id, data, updated_at')
    .order('id')

  if (error) {
    console.warn('[content] Supabase fetch failed — using bundled fallback JSON.', error.message)
    return hydrateSiteContent(loadFallbackContent())
  }

  if (!data?.length) {
    console.warn('[content] Supabase returned no rows — using bundled fallback JSON.')
    return hydrateSiteContent(loadFallbackContent())
  }

  return hydrateSiteContent(rowsToSiteContent(data))
}

export async function fetchCollectionRaw(id: CmsCollectionId): Promise<unknown> {
  const supabase = getSupabase()
  const fallback = loadFallbackContent()

  if (!supabase) {
    return fallback[COLLECTION_KEY_MAP[id]]
  }

  const { data, error } = await supabase.from('site_content').select('data').eq('id', id).maybeSingle()

  if (error) throw new Error(error.message)
  if (data?.data) return data.data

  if (id === 'services') {
    const { data: legacy } = await supabase
      .from('site_content')
      .select('data')
      .eq('id', 'services-page')
      .maybeSingle()
    if (legacy?.data) return legacy.data
  }

  return fallback[COLLECTION_KEY_MAP[id]]
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

  const { error } = await supabase.from('site_content').upsert(
    {
      id,
      data: value,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' },
  )

  if (error) throw new Error(error.message)

  notifyContentUpdated(id)
}

export function getAllCollectionIds(): CmsCollectionId[] {
  return CMS_COLLECTIONS.map((collection) => collection.id)
}
