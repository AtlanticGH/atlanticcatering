export type CmsCollectionId =
  | 'news'
  | 'stats'
  | 'people'
  | 'services'
  | 'clients'
  | 'contact'
  | 'page-meta'
  | 'home'
  | 'sustainability'

export interface CmsCollectionMeta {
  id: CmsCollectionId
  label: string
  description: string
  file: string
  editor: 'list' | 'object' | 'json'
}

export interface CmsPageSection {
  id: string
  label: string
  path: string | null
  collectionIds: CmsCollectionId[]
}

const ALL_COLLECTIONS: CmsCollectionMeta[] = [
  {
    id: 'home',
    label: 'Hero & Who we are',
    description: 'Home page headline, subtitle, and who-we-are intro with bullet points.',
    file: 'home.json',
    editor: 'object',
  },
  {
    id: 'stats',
    label: 'Stats counters',
    description: 'Animated stat counters below the home hero.',
    file: 'stats.json',
    editor: 'list',
  },
  {
    id: 'clients',
    label: 'Client logos',
    description: 'Client logo marquee rows on the home page.',
    file: 'clients.json',
    editor: 'object',
  },
  {
    id: 'people',
    label: 'Leadership team',
    description: 'Team profiles and bios on the About page.',
    file: 'people.json',
    editor: 'list',
  },
  {
    id: 'services',
    label: 'Services',
    description: 'All services — used on the Services page grid and home page scroll.',
    file: 'services.json',
    editor: 'list',
  },
  {
    id: 'sustainability',
    label: 'Page content',
    description: 'Full Sustainability page content (advanced JSON editor).',
    file: 'sustainability.json',
    editor: 'json',
  },
  {
    id: 'news',
    label: 'Articles',
    description: 'News articles — used on the News page and home page collage.',
    file: 'news.json',
    editor: 'list',
  },
  {
    id: 'contact',
    label: 'Contact details',
    description: 'Email, phone, location, and map embed on the Contact page.',
    file: 'contact.json',
    editor: 'object',
  },
  {
    id: 'page-meta',
    label: 'SEO & page titles',
    description: 'Meta titles and descriptions for every route.',
    file: 'page-meta.json',
    editor: 'object',
  },
]

const COLLECTION_MAP = Object.fromEntries(
  ALL_COLLECTIONS.map((collection) => [collection.id, collection]),
) as Record<CmsCollectionId, CmsCollectionMeta>

/** Matches public site page order: Home → About → Services → Sustainability → News → Contact */
export const CMS_PAGE_SECTIONS: CmsPageSection[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    collectionIds: ['home', 'stats', 'clients'],
  },
  {
    id: 'about',
    label: 'About',
    path: '/about',
    collectionIds: ['people'],
  },
  {
    id: 'services',
    label: 'Services',
    path: '/services',
    collectionIds: ['services'],
  },
  {
    id: 'sustainability',
    label: 'Sustainability',
    path: '/sustainability',
    collectionIds: ['sustainability'],
  },
  {
    id: 'news',
    label: 'News',
    path: '/news',
    collectionIds: ['news'],
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
    collectionIds: ['contact'],
  },
  {
    id: 'site',
    label: 'Site-wide',
    path: null,
    collectionIds: ['page-meta'],
  },
]

export const CMS_COLLECTIONS: CmsCollectionMeta[] = CMS_PAGE_SECTIONS.flatMap((section) =>
  section.collectionIds.map((id) => COLLECTION_MAP[id]),
)

export function getCollectionById(id: string): CmsCollectionMeta | undefined {
  return COLLECTION_MAP[id as CmsCollectionId]
}

export function getCollectionsForSection(sectionId: string): CmsCollectionMeta[] {
  const section = CMS_PAGE_SECTIONS.find((entry) => entry.id === sectionId)
  if (!section) return []
  return section.collectionIds.map((id) => COLLECTION_MAP[id])
}
