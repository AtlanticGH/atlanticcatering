import { assetUrl } from '@/utils/assets'

export interface HomeService {
  id: string
  title: string
  description: string
  image: string
  linkAnchor: string
}

export const homeServices: HomeService[] = [
  {
    id: 'offshore',
    title: 'Offshore Catering & Supply',
    description: 'Full catering and supply chain for offshore operations.',
    image: assetUrl('images/DSC04606.jpg'),
    linkAnchor: '#offshore',
  },
  {
    id: 'camp',
    title: 'Camp Management',
    description: 'End-to-end camp operations including 360° support.',
    image: assetUrl('images/DSC04601.jpg'),
    linkAnchor: '#camp',
  },
  {
    id: 'inflight',
    title: 'Inflight Catering',
    description: 'Premium inflight meals and logistics for aviation.',
    image: assetUrl('images/DSC04603.jpg'),
    linkAnchor: '#inflight',
  },
  {
    id: 'vip',
    title: 'VIP Catering',
    description: 'Bespoke catering for high-profile clients.',
    image: assetUrl('images/DSC04610.jpg'),
    linkAnchor: '#vip',
  },
  {
    id: 'events',
    title: 'Event Planning',
    description: 'Corporate events, conferences and celebrations.',
    image: assetUrl('images/DSC04664.jpg'),
    linkAnchor: '#events',
  },
  {
    id: 'chandelling',
    title: 'Ship Chandelling',
    description: 'Maritime supply and provisioning.',
    image: assetUrl('images/DSC04801.jpg'),
    linkAnchor: '#chandelling',
  },
  {
    id: 'support',
    title: '24/7 Support',
    description: 'Round-the-clock operational support.',
    image: assetUrl('images/DSC04813.jpg'),
    linkAnchor: '#support',
  },
  {
    id: 'school',
    title: 'School Catering',
    description: 'Nutrition and catering for education.',
    image: assetUrl('images/DSC04816.jpg'),
    linkAnchor: '#school',
  },
  {
    id: 'hospital',
    title: 'Hospital Catering',
    description: 'Healthcare and hospital food services.',
    image: assetUrl('images/DSC04967.jpg'),
    linkAnchor: '#hospital',
  },
]
