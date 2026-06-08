import type { PageMetaMap } from '@/lib/content/types'

const SITE_NAME = 'Atlantic Catering & Logistics Limited'

const DEFAULT_PAGE_META: PageMetaMap = {
  '/': {
    title: `${SITE_NAME} | Corporate Catering, Camp Management & Integrated Logistics`,
    description:
      'Atlantic Catering and Logistics Limited delivers corporate catering, camp management and integrated logistics from land, air to sea. Multi-ISO certified. Ghana-headquartered since 2014.',
  },
  '/404': {
    title: `Page Not Found | ${SITE_NAME}`,
    description: 'The page you are looking for could not be found.',
  },
}

function setMetaDescription(content: string): void {
  const descriptionTag = document.querySelector('meta[name="description"]')
  if (descriptionTag) {
    descriptionTag.setAttribute('content', content)
  }
}

export function applyPageMeta(
  pathname: string,
  options?: { articleTitle?: string; articleDescription?: string },
  pageMeta?: PageMetaMap,
): void {
  const metaMap = pageMeta ?? DEFAULT_PAGE_META

  if (options?.articleTitle) {
    document.title = `${options.articleTitle} | News | ${SITE_NAME}`
    setMetaDescription(options.articleDescription ?? metaMap['/news']?.description ?? '')
    return
  }

  const meta = metaMap[pathname] ?? metaMap['/404'] ?? DEFAULT_PAGE_META['/404']
  document.title = meta.title
  setMetaDescription(meta.description)
}
