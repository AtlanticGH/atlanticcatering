import type { CmsCollectionId } from '@/cms/collections'
import { ClientsEditor } from '@/cms/editors/ClientsEditor'
import { ContactEditor } from '@/cms/editors/ContactEditor'
import { HomeEditor } from '@/cms/editors/HomeEditor'
import { HomeServicesEditor } from '@/cms/editors/HomeServicesEditor'
import { JsonEditor } from '@/cms/editors/JsonEditor'
import { NewsEditor } from '@/cms/editors/NewsEditor'
import { PageMetaEditor } from '@/cms/editors/PageMetaEditor'
import { PeopleEditor } from '@/cms/editors/PeopleEditor'
import { ServicesPageEditor } from '@/cms/editors/ServicesPageEditor'
import { StatsEditor } from '@/cms/editors/StatsEditor'
import type {
  ContactContent,
  HomeContent,
  HomeService,
  NewsArticle,
  PageMetaMap,
  Person,
  ServicePageItem,
  StatItem,
} from '@/lib/content/types'

type EditorProps<T> = {
  value: T
  onChange: (value: T) => void
}

export function CollectionFormEditor({
  id,
  value,
  onChange,
}: {
  id: CmsCollectionId
  value: unknown
  onChange: (value: unknown) => void
}) {
  switch (id) {
    case 'news':
      return (
        <NewsEditor
          value={value as NewsArticle[]}
          onChange={onChange as EditorProps<NewsArticle[]>['onChange']}
        />
      )
    case 'stats':
      return (
        <StatsEditor
          value={value as StatItem[]}
          onChange={onChange as EditorProps<StatItem[]>['onChange']}
        />
      )
    case 'people':
      return (
        <PeopleEditor
          value={value as Person[]}
          onChange={onChange as EditorProps<Person[]>['onChange']}
        />
      )
    case 'services-page':
      return (
        <ServicesPageEditor
          value={value as ServicePageItem[]}
          onChange={onChange as EditorProps<ServicePageItem[]>['onChange']}
        />
      )
    case 'home-services':
      return (
        <HomeServicesEditor
          value={value as HomeService[]}
          onChange={onChange as EditorProps<HomeService[]>['onChange']}
        />
      )
    case 'clients':
      return (
        <ClientsEditor
          value={value as { row1: { src: string; alt: string }[]; row2: { src: string; alt: string }[] }}
          onChange={
            onChange as EditorProps<{
              row1: { src: string; alt: string }[]
              row2: { src: string; alt: string }[]
            }>['onChange']
          }
        />
      )
    case 'contact':
      return (
        <ContactEditor
          value={value as ContactContent}
          onChange={onChange as EditorProps<ContactContent>['onChange']}
        />
      )
    case 'page-meta':
      return (
        <PageMetaEditor
          value={value as PageMetaMap}
          onChange={onChange as EditorProps<PageMetaMap>['onChange']}
        />
      )
    case 'home':
      return (
        <HomeEditor
          value={value as HomeContent}
          onChange={onChange as EditorProps<HomeContent>['onChange']}
        />
      )
    case 'sustainability':
      return <JsonEditor value={value} onChange={onChange} />
    default:
      return <JsonEditor value={value} onChange={onChange} />
  }
}
