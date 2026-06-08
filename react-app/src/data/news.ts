import { assetUrl } from '@/utils/assets'

export type NewsCategoryKey = 'award' | 'milestone' | 'recognition'

export interface NewsArticle {
  slug: string
  category: string
  categoryKey: NewsCategoryKey
  title: string
  excerpt: string
  image: string
  imageAlt: string
  year: number
  body: string[]
  collageVariant: 'large' | 'small' | 'offset'
  collageTitle: string
  collageExcerpt: string
  collageImage: string
}

export const newsArticles: NewsArticle[] = [
  {
    slug: 'article-1',
    category: 'Award',
    categoryKey: 'award',
    title: '1st in Tourism & Hospitality – Ghana Club 100 (2024)',
    excerpt: "We're proud to rank first in Tourism & Hospitality in the Ghana Club 100.",
    image: assetUrl('images/DSC04606.jpg'),
    imageAlt: 'Ghana Club 100 Tourism & Hospitality award – Atlantic Catering & Logistics',
    year: 2024,
    collageVariant: 'large',
    collageTitle: '1st in Tourism & Hospitality (2024)',
    collageExcerpt: 'Ghana Club 100 – Award',
    collageImage: assetUrl('images/DSC04603.jpg'),
    body: [
      'We are proud to announce that Atlantic Catering & Logistics Limited has been ranked first in Tourism & Hospitality in the Ghana Club 100 (2024). The Ghana Club 100 recognises the top 100 companies in Ghana based on profitability, growth, and size.',
      "This recognition reflects our team's commitment to excellence in corporate catering, camp management, and integrated logistics. We thank our clients, partners, and every member of the Atlantic Catering and Logistics Limited family for making this possible.",
      "We will continue to raise standards in our sector and contribute to Ghana's hospitality and tourism landscape.",
    ],
  },
  {
    slug: 'article-2',
    category: 'Milestone',
    categoryKey: 'milestone',
    title: 'First Ghanaian Caterer to sign UN Global Compact (2025)',
    excerpt: 'Our commitment to sustainability is now formalized with the UNGC.',
    image: assetUrl('images/DSC04610.jpg'),
    imageAlt: 'UN Global Compact signing – Atlantic Catering & Logistics',
    year: 2025,
    collageVariant: 'small',
    collageTitle: 'UN Global Compact (2025)',
    collageExcerpt: 'First Ghanaian caterer – Milestone',
    collageImage: assetUrl('images/DSC04610.jpg'),
    body: [
      'Atlantic Catering & Logistics Limited is proud to be the first Ghanaian caterer to sign the United Nations Global Compact (UNGC). Our commitment to sustainability, human rights, labour standards, environment, and anti-corruption is now formalised within this global framework.',
      'The UN Global Compact encourages businesses to align their operations and strategies with ten universally accepted principles. By joining, we commit to annual reporting on our progress and to embedding responsible practices across our catering, camp management, and logistics operations.',
      'This milestone supports our existing multi-ISO certifications and our roadmap for environmental and social impact. We invite our partners and peers to join us in building a more sustainable and inclusive industry.',
    ],
  },
  {
    slug: 'article-3',
    category: 'Recognition',
    categoryKey: 'recognition',
    title: 'National Catering Service of the Year 2023',
    excerpt: 'Industry recognition for excellence in catering and service delivery.',
    image: assetUrl('images/DSC04813.jpg'),
    imageAlt: 'National Catering Service of the Year 2023 – Atlantic Catering & Logistics',
    year: 2023,
    collageVariant: 'offset',
    collageTitle: 'National Catering Service of the Year 2023',
    collageExcerpt: 'Industry recognition',
    collageImage: assetUrl('images/DSC04813.jpg'),
    body: [
      'Atlantic Catering & Logistics Limited was honoured to receive the National Catering Service of the Year 2023 award. This industry recognition reflects our commitment to excellence in catering and service delivery across corporate, remote-site, and event operations.',
      'Our culinary and operations teams work every day to deliver consistent quality, food safety, and client satisfaction. This award is a testament to their dedication and to the trust our clients place in us.',
      'We thank the organisers and our peers for this recognition and will continue to raise the bar for catering and logistics services in Ghana and beyond.',
    ],
  },
]

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug)
}
