import { resolveAssetPath } from '@/lib/content/resolveAssets'
import type {
  ClientLogo,
  HomeService,
  NewsArticle,
  Person,
  ServicePageItem,
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

export function hydrateServicesPage(services: ServicePageItem[]): ServicePageItem[] {
  return services.map((service) => ({
    ...service,
    image: resolveAssetPath(service.image),
  }))
}

export function hydrateHomeServices(services: HomeService[]): HomeService[] {
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
    servicesPage: hydrateServicesPage(raw.servicesPage),
    homeServices: hydrateHomeServices(raw.homeServices),
    clients: hydrateClients(raw.clients),
    sustainability: hydrateSustainability(raw.sustainability),
  }
}
