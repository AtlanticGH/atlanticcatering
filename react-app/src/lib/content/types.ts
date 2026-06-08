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

export interface StatItem {
  target: number
  label: string
  suffix?: string
  prefix?: string
}

export type Person = {
  name: string
  role: string
  bio: string
  image: string
}

export type ServiceItem = {
  id: string
  name: string
  tagline: string
  description: string
  image: string
}

/** @deprecated Use ServiceItem */
export type ServicePageItem = ServiceItem

/** @deprecated Use ServiceItem */
export type HomeService = ServiceItem

export interface ClientLogo {
  src: string
  alt: string
}

export interface ContactContent {
  email: string
  emailNote: string
  phone: string
  phoneHref: string
  phoneNote: string
  location: string
  city: string
  careersEmail: string
  mapEmbedUrl: string
}

export interface HomeContent {
  hero: {
    titleLine1: string
    titleLine2: string
    subtitle: string
  }
  whoWeAre: {
    intro: string
    bullets: string[]
  }
}

export interface SustainabilityHero {
  kicker: string
  title: string
  subtitle: string
}

export interface AtlanticCaresMediaItem {
  id: string
  image: string
  alt: string
  title: string
  description: string
}

export interface AtlanticCaresIntro {
  kicker: string
  heading: string
  body1: string
  body2: string
  body2Bold: string
  body2Rest: string
}

export interface PillarsIntro {
  kicker: string
  heading: string
  body: string
}

export interface SustainabilityPillar {
  id: string
  title: string
  description: string
  icon: string
}

export interface ImpactIntro {
  kicker: string
  heading: string
  body: string
}

export interface ImpactMetric {
  id: string
  label: string
  value: number
  suffix: string
  context: string
  accent: 'env' | 'social' | 'safety' | string
}

export interface InitiativesIntro {
  kicker: string
  heading: string
  body: string
}

export interface SustainabilityInitiative {
  id: string
  name: string
  focus: string
  focusKey: string
  description: string
  image: string
  imageAlt: string
}

export interface ComplianceSection {
  kicker: string
  heading: string
  body: string
  frameworks: string[]
  standards: string[]
  reporting: string[]
}

export interface JourneyPriority {
  title: string
  objective: string
}

export interface CommitmentGroup {
  title: string
  items: string[]
}

export interface Journey2030 {
  journeyHeading: string
  prioritiesHeading: string
  priorities: JourneyPriority[]
  commitmentsHeading: string
  commitmentGroups: CommitmentGroup[]
  newsHeading: string
  careersHeading: string
  careersBody: string
  careersCtaLabel: string
  careersCtaHref: string
}

export interface SustainabilityCta {
  kicker: string
  heading: string
  body: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
}

export interface SustainabilityPageData {
  hero: SustainabilityHero
  atlanticCaresMedia: AtlanticCaresMediaItem[]
  atlanticCaresIntro: AtlanticCaresIntro
  pillarsIntro: PillarsIntro
  pillars: SustainabilityPillar[]
  impactIntro: ImpactIntro
  impactMetrics: ImpactMetric[]
  initiativesIntro: InitiativesIntro
  initiatives: SustainabilityInitiative[]
  compliance: ComplianceSection
  journey2030: Journey2030
  cta: SustainabilityCta
}

export type PageMetaMap = Record<string, { title: string; description: string }>

export interface SiteContent {
  news: NewsArticle[]
  stats: StatItem[]
  people: Person[]
  services: ServiceItem[]
  clients: { row1: ClientLogo[]; row2: ClientLogo[] }
  contact: ContactContent
  pageMeta: PageMetaMap
  home: HomeContent
  sustainability: SustainabilityPageData
}
