import { Navigate, useParams } from 'react-router-dom'
import { Link } from '@/components/Link'
import { getNewsArticleBySlug } from '@/data/news'

export function NewsArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getNewsArticleBySlug(slug) : undefined

  if (!article) {
    return <Navigate to="/404" replace />
  }

  return (
    <article>
      <header className="py-16 lg:py-24 bg-acll-navy text-white overflow-hidden border-t border-white/5">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <Link
            to="/news"
            className="inline-flex items-center text-white/70 hover:text-acll-green/90 text-[14px] font-medium mb-6 transition-colors"
          >
            ← News & updates
          </Link>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green/90">
            {article.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 mb-2 text-white">{article.title}</h1>
          <p className="text-[14px] text-white/60">{article.year}</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12 lg:py-16">
        <div className="aspect-video rounded-xl overflow-hidden mb-10 bg-acll-gray">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
            width={640}
            height={360}
          />
        </div>

        <div className="prose prose-acll max-w-none text-acll-navy/85 text-[15px] leading-relaxed space-y-4">
          {article.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>

        <p className="mt-10 pt-6 border-t border-acll-navy/10">
          <Link to="/news" className="text-acll-green font-medium hover:underline">
            ← Back to News & updates
          </Link>
        </p>
      </div>
    </article>
  )
}
