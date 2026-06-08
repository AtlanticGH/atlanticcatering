const SITE_NAME = 'Atlantic Catering & Logistics Limited'

export const PAGE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: `${SITE_NAME} | Corporate Catering, Camp Management & Integrated Logistics`,
    description:
      'Atlantic Catering and Logistics Limited delivers corporate catering, camp management and integrated logistics from land, air to sea. Multi-ISO certified. Ghana-headquartered since 2014.',
  },
  '/about': {
    title: `About | ${SITE_NAME}`,
    description:
      'Who we are: multi-ISO certified leader in corporate catering, camp management and integrated logistics. Ghana-headquartered since 2014. Our people, achievements and services.',
  },
  '/services': {
    title: `Services | ${SITE_NAME}`,
    description:
      'Offshore catering, camp management, inflight catering, VIP catering, events, ship chandelling, 24/7 support, school and hospital catering.',
  },
  '/sustainability': {
    title: `Sustainability | ${SITE_NAME}`,
    description:
      'Atlantic CARES sustainability framework: environmental responsibility, social impact, governance and measurable outcomes across our operations.',
  },
  '/news': {
    title: `News | ${SITE_NAME}`,
    description: 'Latest news, awards and updates from Atlantic Catering & Logistics Limited.',
  },
  '/careers': {
    title: `Careers | ${SITE_NAME}`,
    description:
      'Join Atlantic Catering & Logistics. We are an equal opportunity employer. View current openings and send your CV to careers@atlanticcatering-gh.com.',
  },
  '/contact': {
    title: `Contact | ${SITE_NAME}`,
    description:
      'Get in touch with Atlantic Catering & Logistics. General enquiries, careers, and headquarters in Ghana.',
  },
  '/shop': {
    title: `Shop | ${SITE_NAME}`,
    description:
      'Retail products and palm oil line from Atlantic Catering & Logistics. E-commerce coming soon.',
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
): void {
  if (options?.articleTitle) {
    document.title = `${options.articleTitle} | News | ${SITE_NAME}`
    setMetaDescription(options.articleDescription ?? PAGE_META['/news'].description)
    return
  }

  const meta = PAGE_META[pathname] ?? PAGE_META['/404']
  document.title = meta.title
  setMetaDescription(meta.description)
}
