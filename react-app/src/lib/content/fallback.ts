import clientsJson from '../../../content/clients.json'
import contactJson from '../../../content/contact.json'
import homeJson from '../../../content/home.json'
import homeServicesJson from '../../../content/home-services.json'
import newsJson from '../../../content/news.json'
import pageMetaJson from '../../../content/page-meta.json'
import peopleJson from '../../../content/people.json'
import servicesPageJson from '../../../content/services-page.json'
import statsJson from '../../../content/stats.json'
import sustainabilityJson from '../../../content/sustainability.json'
import type { SiteContent } from '@/lib/content/types'

export function loadFallbackContent(): SiteContent {
  return {
    news: newsJson as SiteContent['news'],
    stats: statsJson as SiteContent['stats'],
    people: peopleJson as SiteContent['people'],
    servicesPage: servicesPageJson as SiteContent['servicesPage'],
    homeServices: homeServicesJson as SiteContent['homeServices'],
    clients: clientsJson as SiteContent['clients'],
    contact: contactJson as SiteContent['contact'],
    pageMeta: pageMetaJson as SiteContent['pageMeta'],
    home: homeJson as SiteContent['home'],
    sustainability: sustainabilityJson as SiteContent['sustainability'],
  }
}
