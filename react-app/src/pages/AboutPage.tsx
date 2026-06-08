import { useState } from 'react'
import { PageHero } from '@/components/PageHero'
import { FadeIn } from '@/components/FadeIn'
import { PeopleCard } from '@/components/PeopleCard'
import { ProfileModal } from '@/components/ProfileModal'
import type { Person } from '@/data/people'
import { people } from '@/data/people'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'

const achievements = [
  {
    title: '1st in Tourism & Hospitality',
    subtitle: 'Ghana Club 100 (2024)',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M8 9v6a4 4 0 0 0 8 0V9M7 22h10" />
      </svg>
    ),
  },
  {
    title: 'Most Outstanding Female Owned Company',
    subtitle: 'Recognition for excellence',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'National Catering Service of the Year 2023',
    subtitle: 'Industry leadership',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'First Ghanaian Caterer to sign UNGC (2025)',
    subtitle: 'UN Global Compact commitment',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
] as const

const workforceStats = [
  { target: 565, label: 'Employees' },
  { target: 435, label: 'Culinary team' },
  { target: 100, label: 'Support staff' },
  { target: 30, label: 'Logistics experts' },
] as const

function WorkforceStat({ target, label }: { target: number; label: string }) {
  return (
    <FadeIn className="text-center">
      <span
        className="workforce-stat block text-3xl md:text-4xl font-semibold tracking-tight"
        data-target={target}
      >
        0
      </span>
      <span className="text-[13px] text-acll-muted mt-0.5 block">{label}</span>
    </FadeIn>
  )
}

export function AboutPage() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  useAnimatedCounter('.workforce-stat')

  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="About us"
        description="Who we are, what we do, and the people behind our promise."
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green block text-center">
              Recognition
            </span>
          </FadeIn>
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-acll-navy tracking-tight mt-1 mb-10 text-center">
              Recent achievements
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-acll-navy/[0.08] rounded-xl overflow-hidden">
            {achievements.map((achievement) => (
              <FadeIn key={achievement.title} as="article" className="achievement-card bg-white p-6">
                <span
                  className="achievement-icon flex items-center justify-center w-10 h-10 rounded-lg bg-acll-green/10 text-acll-green mb-4"
                  aria-hidden="true"
                >
                  {achievement.icon}
                </span>
                <h3 className="font-medium text-acll-navy text-[15px] mb-1">{achievement.title}</h3>
                <p className="text-acll-muted text-[13px]">{achievement.subtitle}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="our-people" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green block text-center">
              Leadership
            </span>
          </FadeIn>
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold text-acll-navy tracking-tight mt-1 mb-2 text-center">
              Our team
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="text-acll-navy/70 text-[15px] text-center max-w-xl mx-auto mb-12">
              Our leadership team uses years of experience to drive innovation within Atlantic & the industry
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {people.map((person) => (
              <PeopleCard key={person.name} person={person} onSelect={setSelectedPerson} />
            ))}
          </div>
        </div>
      </section>

      <section className="our-people-future-section py-16 lg:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green block text-center">
              Our workforce
            </span>
          </FadeIn>
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 mb-3 text-center">
              Our people, our future
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="text-center text-acll-navy/75 text-[15px] max-w-xl mx-auto mb-10">
              Committed to diversity, inclusion and the growth of every team member.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {workforceStats.map((stat) => (
              <WorkforceStat key={stat.label} target={stat.target} label={stat.label} />
            ))}
          </div>
          <p className="text-center text-acll-muted text-[13px] max-w-2xl mx-auto">
            Equal opportunity and a workplace where everyone can thrive.
          </p>
        </div>
      </section>

      <ProfileModal
        person={selectedPerson}
        isOpen={selectedPerson !== null}
        onClose={() => setSelectedPerson(null)}
      />
    </>
  )
}
