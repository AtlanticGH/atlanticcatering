export interface StatItem {
  target: number
  label: string
  suffix?: string
  prefix?: string
}

export const stats: StatItem[] = [
  { target: 15, label: 'Locations across 6 regions' },
  { target: 3, label: 'Meals annually', suffix: 'M+' },
  { target: 6000, label: '+ Meals daily' },
  { target: 565, label: '+ Employees' },
  { target: 6, label: 'Service areas' },
  { target: 3, label: 'ISO certifications' },
]
