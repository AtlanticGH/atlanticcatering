import type { KeyboardEvent } from 'react'
import type { Person } from '@/data/people'
import { FadeIn } from '@/components/FadeIn'
import { assetUrl } from '@/utils/assets'

type PeopleFeaturedCardProps = {
  person: Person
  onSelect: (person: Person) => void
}

function bioExcerpt(bio: string): string {
  return bio
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)[0] ?? ''
}

export function PeopleFeaturedCard({ person, onSelect }: PeopleFeaturedCardProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(person)
    }
  }

  return (
    <FadeIn
      as="article"
      className="people-featured-card group cursor-pointer max-w-5xl mx-auto outline-none"
      role="button"
      tabIndex={0}
      aria-label={`View profile: ${person.name}`}
      onClick={() => onSelect(person)}
      onKeyDown={handleKeyDown}
    >
      <div className="grid lg:grid-cols-[minmax(260px,2fr)_minmax(0,3fr)] gap-0 items-stretch rounded-2xl overflow-hidden border border-acll-navy/[0.08] bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="people-featured-card-image relative aspect-[3/4] lg:aspect-auto lg:min-h-[28rem] bg-acll-navy/10">
          <div
            className="people-featured-card-image-bg absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${assetUrl(person.image)}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-acll-navy/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/20" />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 lg:pl-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green mb-3">
            {person.role}
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-acll-navy tracking-tight mb-4">
            {person.name}
          </h3>
          <p className="text-acll-navy/70 text-[15px] leading-relaxed mb-6 line-clamp-4">
            {bioExcerpt(person.bio)}
          </p>
          <span className="text-acll-green text-sm font-medium group-hover:underline">
            View full profile →
          </span>
        </div>
      </div>
    </FadeIn>
  )
}
