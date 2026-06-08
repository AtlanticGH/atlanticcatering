import type { CmsCollectionId } from '@/cms/collections'

export const COLLECTION_VISUALS: Record<
  CmsCollectionId,
  { previewImage: string; accentClass: string }
> = {
  news: { previewImage: 'images/DSC04606.jpg', accentClass: 'from-acll-green/80' },
  stats: { previewImage: 'images/DSC04603.jpg', accentClass: 'from-acll-orange/80' },
  people: { previewImage: 'images/DSC04601.jpg', accentClass: 'from-acll-navy/80' },
  'services-page': { previewImage: 'images/DSC04606.jpg', accentClass: 'from-acll-green/70' },
  'home-services': { previewImage: 'images/DSC04610.jpg', accentClass: 'from-acll-orange/70' },
  clients: { previewImage: 'images/clients/tullow.png', accentClass: 'from-acll-navy/75' },
  contact: { previewImage: 'images/DSC04664.jpg', accentClass: 'from-acll-green/75' },
  'page-meta': { previewImage: 'images/DSC04813.jpg', accentClass: 'from-acll-navy/70' },
  home: { previewImage: 'images/DSC04603.jpg', accentClass: 'from-acll-green/80' },
  sustainability: { previewImage: 'images/DSC04610.jpg', accentClass: 'from-acll-orange/80' },
}
