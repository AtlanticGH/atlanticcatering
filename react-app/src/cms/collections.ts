export type CmsCollectionId =
  | 'news'
  | 'stats'
  | 'people'
  | 'services-page'
  | 'home-services'
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

export const CMS_COLLECTIONS: CmsCollectionMeta[] = [
  {
    id: 'news',
    label: 'News Articles',
    description: 'News listing, article pages, and home page collage.',
    file: 'news.json',
    editor: 'list',
  },
  {
    id: 'stats',
    label: 'Home Stats',
    description: 'Animated counters on the home page.',
    file: 'stats.json',
    editor: 'list',
  },
  {
    id: 'people',
    label: 'Leadership Team',
    description: 'About page team profiles and modals.',
    file: 'people.json',
    editor: 'list',
  },
  {
    id: 'services-page',
    label: 'Services Page',
    description: 'Full services grid and detail modals.',
    file: 'services-page.json',
    editor: 'list',
  },
  {
    id: 'home-services',
    label: 'Home Services Scroll',
    description: 'Horizontal service tiles on the home page.',
    file: 'home-services.json',
    editor: 'list',
  },
  {
    id: 'clients',
    label: 'Client Logos',
    description: 'Marquee client logo rows.',
    file: 'clients.json',
    editor: 'object',
  },
  {
    id: 'contact',
    label: 'Contact Page',
    description: 'Emails, phone, location, and map embed.',
    file: 'contact.json',
    editor: 'object',
  },
  {
    id: 'page-meta',
    label: 'Page SEO',
    description: 'Titles and meta descriptions per route.',
    file: 'page-meta.json',
    editor: 'object',
  },
  {
    id: 'home',
    label: 'Home Page Copy',
    description: 'Hero headline and who-we-are section.',
    file: 'home.json',
    editor: 'object',
  },
  {
    id: 'sustainability',
    label: 'Sustainability',
    description: 'Full sustainability page content (advanced JSON editor).',
    file: 'sustainability.json',
    editor: 'json',
  },
]

export function getCollectionById(id: string): CmsCollectionMeta | undefined {
  return CMS_COLLECTIONS.find((collection) => collection.id === id)
}
