import type { CmsCollectionId } from '@/cms/collections'

/** Dark navy overlay — matches people/service card styling */
export const CMS_PREVIEW_OVERLAY =
  'bg-gradient-to-t from-acll-navy/90 via-acll-navy/25 to-transparent'

export const COLLECTION_VISUALS: Record<CmsCollectionId, { previewImage: string }> = {
  news: { previewImage: 'images/DSC04606.jpg' },
  stats: { previewImage: 'images/DSC04603.jpg' },
  people: { previewImage: 'images/DSC04601.jpg' },
  services: { previewImage: 'images/DSC04606.jpg' },
  clients: { previewImage: 'images/clients/tullow.png' },
  contact: { previewImage: 'images/DSC04664.jpg' },
  'page-meta': { previewImage: 'images/DSC04813.jpg' },
  home: { previewImage: 'images/DSC04603.jpg' },
  sustainability: { previewImage: 'images/DSC04610.jpg' },
}
