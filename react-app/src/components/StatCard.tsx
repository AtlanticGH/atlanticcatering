import { FadeIn } from '@/components/FadeIn'
import type { StatItem } from '@/data/stats'

export function StatCard({ target, label, suffix, prefix }: StatItem) {
  return (
    <FadeIn className="stat-card text-center">
      <span
        className="stat-number block text-2xl md:text-3xl font-semibold text-acll-navy tracking-tight"
        data-target={target}
        {...(suffix ? { 'data-suffix': suffix } : {})}
        {...(prefix ? { 'data-prefix': prefix } : {})}
      >
        0
      </span>
      <span className="text-[13px] text-acll-muted mt-0.5 block">{label}</span>
    </FadeIn>
  )
}
