type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="py-16 lg:py-24 bg-acll-navy text-white overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green/90 fade-in">
            {eyebrow}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 mb-4 fade-in text-white">
            {title}
          </h1>
          <p className="text-[15px] text-white/70 fade-in">{description}</p>
        </div>
      </div>
    </section>
  )
}
