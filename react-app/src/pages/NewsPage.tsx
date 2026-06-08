import { useState } from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Link } from '@/components/Link'
import { PageHero } from '@/components/PageHero'
import { useFadeIn } from '@/hooks/useFadeIn'
import { useContent } from '@/hooks/useSiteContent'
import type { NewsArticle, NewsCategoryKey } from '@/data/news'

function NewsTile({ article }: { article: NewsArticle }) {
  const ref = useFadeIn()

  return (
    <article className="news-tile-item" role="listitem">
      <Link ref={ref} to={`/news/${article.slug}`} className="fade-in news-tile-horizontal">
        <div className="news-tile-image flex items-center justify-center overflow-hidden bg-acll-gray aspect-video shrink-0">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
            width={360}
            height={203}
          />
        </div>
        <div className="news-tile-body">
          <span className="news-tile-category">{article.category}</span>
          <h2>{article.title}</h2>
          <p className="news-tile-excerpt">{article.excerpt}</p>
          <span className="news-tile-link">Read more →</span>
        </div>
      </Link>
    </article>
  )
}

type FilterValue = 'all' | NewsCategoryKey

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'award', label: 'Award' },
  { value: 'milestone', label: 'Milestone' },
  { value: 'recognition', label: 'Recognition' },
]

export function NewsPage() {
  const { news: newsArticles } = useContent()
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all')

  const filteredArticles =
    activeFilter === 'all'
      ? newsArticles
      : newsArticles.filter((article) => article.categoryKey === activeFilter)

  return (
    <>
      <PageHero
        eyebrow="Updates"
        title="News & updates"
        description="Awards, milestones and stories from across our operations."
      />

      <section className="news-tiles-section py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green">Latest</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-acll-navy tracking-tight mt-1 mb-6">
              Stories from our operations
            </h2>
          </FadeIn>

          <FadeIn className="news-filters" role="group" aria-label="Filter by category">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={`news-filter-btn${activeFilter === filter.value ? ' is-active' : ''}`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </FadeIn>

          <div id="news-tiles-list" className="flex flex-col gap-8 lg:gap-10 mt-10" role="list">
            {filteredArticles.map((article) => (
              <NewsTile key={article.slug} article={article} />
            ))}
          </div>

          <p className="text-center text-acll-muted text-[13px] mt-10">
            More articles will be added as we publish.
          </p>
        </div>
      </section>
    </>
  )
}
