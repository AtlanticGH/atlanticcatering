import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { newsArticles } from '../src/data/news.ts'
import { stats } from '../src/data/stats.ts'
import { people } from '../src/data/people.ts'
import { servicesPage } from '../src/data/servicesPage.ts'
import { homeServices } from '../src/data/services.ts'
import { clientRow1, clientRow2 } from '../src/data/clients.ts'
import pageMetaJson from '../content/page-meta.json' with { type: 'json' }
import { sustainabilityPageData } from '../src/data/sustainability.ts'

const contentDir = join(import.meta.dirname, '../content')
mkdirSync(contentDir, { recursive: true })

const stripAsset = (url: string) => url.replace(/^\/assets\//, '')

function walkAssets<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => walkAssets(item)) as T
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [key, entry] of Object.entries(value)) {
      out[key] = walkAssets(entry)
    }
    return out as T
  }
  if (typeof value === 'string' && value.startsWith('/assets/')) {
    return stripAsset(value) as T
  }
  return value
}

const files: Record<string, unknown> = {
  'news.json': newsArticles.map((article) => ({
    ...article,
    image: stripAsset(article.image),
    collageImage: stripAsset(article.collageImage),
  })),
  'stats.json': stats,
  'people.json': people,
  'services-page.json': servicesPage,
  'home-services.json': homeServices.map((service) => ({
    ...service,
    image: stripAsset(service.image),
  })),
  'clients.json': {
    row1: clientRow1.map((client) => ({ ...client, src: stripAsset(client.src) })),
    row2: clientRow2.map((client) => ({ ...client, src: stripAsset(client.src) })),
  },
  'page-meta.json': pageMetaJson,
  'sustainability.json': walkAssets(sustainabilityPageData),
  'home.json': {
    hero: {
      titleLine1: 'Focus on your core business.',
      titleLine2: "We'll take care of the rest.",
      subtitle:
        'From land, air to sea—supporting businesses to deliver on their promises.',
    },
    whoWeAre: {
      intro:
        'Founded in 2014, Atlantic Catering & Logistics Limited is a multi-ISO certified leader in corporate catering, camp management and integrated logistics, headquartered in Ghana.',
      bullets: [
        '8 industrial kitchens',
        '5 regions',
        'Serving Oil & Gas, Mining, Aviation',
        'Multi-ISO certified',
        'Safety-first ethos',
        '565+ employees',
      ],
    },
  },
  'contact.json': {
    email: 'info@atlanticcatering-gh.com',
    emailNote: 'Response within 24 hours',
    phone: '+233 30 200 0000',
    phoneHref: '+233302000000',
    phoneNote: 'Mon–Fri, 8am–5pm GMT',
    location: 'Headquartered in Ghana',
    city: 'Accra',
    careersEmail: 'careers@atlanticcatering-gh.com',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.790983475676!2d-0.1869644!3d5.6037168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzYnMTMuNCJOIDDCsDExJzEzLjEiVw!5e0!3m2!1sen!2sgh!4v1',
  },
}

for (const [name, data] of Object.entries(files)) {
  writeFileSync(join(contentDir, name), `${JSON.stringify(data, null, 2)}\n`)
}

console.log(`Exported ${Object.keys(files).length} files to content/`)
