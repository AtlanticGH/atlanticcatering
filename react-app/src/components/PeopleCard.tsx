import type { KeyboardEvent } from 'react'
import type { Person } from '@/data/people'
import { FadeIn } from '@/components/FadeIn'
import { assetUrl } from '@/utils/assets'

type PeopleCardProps = {
  person: Person
  onSelect: (person: Person) => void
}

export function PeopleCard({ person, onSelect }: PeopleCardProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(person)
    }
  }

  return (
    <FadeIn
      as="article"
      className="people-card group cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`View profile: ${person.name}`}
      onClick={() => onSelect(person)}
      onKeyDown={handleKeyDown}
    >
      <div className="people-card-image aspect-[3/4] rounded-2xl overflow-hidden relative bg-acll-navy/10">
        <div
          className="people-card-image-bg absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${assetUrl(person.image)}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-acll-navy/90 via-acll-navy/25 to-transparent" />
        <div className="absolute inset-0 flex items-end p-6 lg:p-8">
          <div className="leading-tight">
            <h3 className="text-white font-semibold text-[17px] lg:text-[18px] tracking-tight leading-tight">
              {person.name}
            </h3>
            <p className="text-white/80 text-[14px] lg:text-[15px] mt-0.5 leading-snug">{person.role}</p>
            <span className="inline-block text-acll-green text-[13px] font-medium mt-1.5 leading-none group-hover:underline">
              View profile →
            </span>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
