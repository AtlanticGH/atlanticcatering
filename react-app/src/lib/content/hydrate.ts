import { resolveAssetPath } from '@/lib/content/resolveAssets'
import type {
  ClientLogo,
  NewsArticle,
  Person,
  ServiceItem,
  SiteContent,
  SustainabilityPageData,
} from '@/lib/content/types'

export function hydrateNews(articles: NewsArticle[]): NewsArticle[] {
  return articles.map((article) => ({
    ...article,
    image: resolveAssetPath(article.image),
    collageImage: resolveAssetPath(article.collageImage),
  }))
}

export function hydratePeople(people: Person[]): Person[] {
  return people.map((person) => ({
    ...person,
    image: resolveAssetPath(person.image),
  }))
}

export function hydrateServices(services: ServiceItem[]): ServiceItem[] {
  return services.map((service) => ({
    ...service,
    image: resolveAssetPath(service.image),
  }))
}

export function hydrateClients(clients: { row1: ClientLogo[]; row2: ClientLogo[] }) {
  const hydrateRow = (row: ClientLogo[]) =>
    row.map((client) => ({ ...client, src: resolveAssetPath(client.src) }))

  return {
    row1: hydrateRow(clients.row1),
    row2: hydrateRow(clients.row2),
  }
}

export function hydrateSustainability(data: SustainabilityPageData): SustainabilityPageData {
  return {
    ...data,
    atlanticCaresMedia: data.atlanticCaresMedia.map((item) => ({
      ...item,
      image: resolveAssetPath(item.image),
    })),
    initiatives: data.initiatives.map((item) => ({
      ...item,
      image: resolveAssetPath(item.image),
    })),
  }
}

export function hydrateSiteContent(raw: SiteContent): SiteContent {
  return {
    ...raw,
    news: hydrateNews(raw.news),
    people: hydratePeople(raw.people),
    services: hydrateServices(raw.services),
    clients: hydrateClients(raw.clients),
    sustainability: hydrateSustainability(raw.sustainability),
  }
}
