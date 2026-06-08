import { Link } from 'react-router-dom'
import { FadeIn } from '@/components/FadeIn'
import { useFadeIn } from '@/hooks/useFadeIn'
import { useContent } from '@/hooks/useSiteContent'
import type { NewsArticle } from '@/data/news'

const variantClass: Record<string, string> = {
  large: 'recent-news-collage-tile--large',
  small: 'recent-news-collage-tile--small',
  offset: 'recent-news-collage-tile--small recent-news-collage-tile--offset',
}

function CollageTile({ article }: { article: NewsArticle }) {
  const ref = useFadeIn()

  return (
    <Link
      ref={ref}
      to={`/news/${article.slug}`}
      className={`fade-in recent-news-collage-tile ${variantClass[article.collageVariant]} group`}
    >
      <div className="recent-news-collage-image rounded-2xl overflow-hidden bg-acll-navy/5">
        <img
          src={article.collageImage}
          alt={article.collageTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="recent-news-collage-copy">
        <h3 className="recent-news-collage-title font-semibold text-acll-navy group-hover:text-acll-green transition-colors">
          {article.collageTitle}
        </h3>
        <p className="recent-news-collage-caption text-sm text-acll-muted">{article.collageExcerpt}</p>
      </div>
    </Link>
  )
}

export function RecentNewsCollage() {
  const { news: newsArticles } = useContent()

  return (
    <section className="recent-news-section py-16 lg:py-24" aria-labelledby="recent-news-heading">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <FadeIn as="span" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green">
          Updates
        </FadeIn>
        <FadeIn>
          <h2
            id="recent-news-heading"
            className="text-2xl sm:text-3xl font-bold text-acll-navy tracking-tight mt-1 mb-4"
          >
            Recent news, projects & films
          </h2>
        </FadeIn>
        <FadeIn as="p" className="text-acll-muted text-[15px] mb-10">
          Awards, milestones and stories from our operations.
        </FadeIn>
        <div className="recent-news-collage">
          {newsArticles.map((article) => (
            <CollageTile key={article.slug} article={article} />
          ))}
        </div>
        <FadeIn as="p" className="text-center mt-10">
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-acll-green text-[14px] font-medium hover:underline"
          >
            View all news & updates <span aria-hidden="true">→</span>
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
