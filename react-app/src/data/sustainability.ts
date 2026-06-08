import { assetUrl } from '@/utils/assets'

export interface SustainabilityHero {
  kicker: string
  title: string
  subtitle: string
}

export interface AtlanticCaresMediaItem {
  id: string
  image: string
  alt: string
  title: string
  description: string
}

export interface AtlanticCaresIntro {
  kicker: string
  heading: string
  body1: string
  body2: string
  body2Bold: string
  body2Rest: string
}

export interface PillarsIntro {
  kicker: string
  heading: string
  body: string
}

export interface SustainabilityPillar {
  id: string
  title: string
  description: string
  icon: string
}

export interface ImpactIntro {
  kicker: string
  heading: string
  body: string
}

export interface ImpactMetric {
  id: string
  label: string
  value: number
  suffix: string
  context: string
  accent: 'env' | 'social' | 'safety' | string
}

export interface InitiativesIntro {
  kicker: string
  heading: string
  body: string
}

export interface SustainabilityInitiative {
  id: string
  name: string
  focus: string
  focusKey: string
  description: string
  image: string
  imageAlt: string
}

export interface ComplianceSection {
  kicker: string
  heading: string
  body: string
  frameworks: string[]
  standards: string[]
  reporting: string[]
}

export interface JourneyPriority {
  title: string
  objective: string
}

export interface CommitmentGroup {
  title: string
  items: string[]
}

export interface Journey2030 {
  journeyHeading: string
  prioritiesHeading: string
  priorities: JourneyPriority[]
  commitmentsHeading: string
  commitmentGroups: CommitmentGroup[]
  newsHeading: string
  careersHeading: string
  careersBody: string
  careersCtaLabel: string
  careersCtaHref: string
}

export interface SustainabilityCta {
  kicker: string
  heading: string
  body: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
}

export interface SustainabilityPageData {
  hero: SustainabilityHero
  atlanticCaresMedia: AtlanticCaresMediaItem[]
  atlanticCaresIntro: AtlanticCaresIntro
  pillarsIntro: PillarsIntro
  pillars: SustainabilityPillar[]
  impactIntro: ImpactIntro
  impactMetrics: ImpactMetric[]
  initiativesIntro: InitiativesIntro
  initiatives: SustainabilityInitiative[]
  compliance: ComplianceSection
  journey2030: Journey2030
  cta: SustainabilityCta
}

export const sustainabilityPageData: SustainabilityPageData = {
  hero: {
    kicker: 'Sustainability',
    title: 'Sustainability',
    subtitle:
      'We integrate environmental, social and governance principles into every contract and kitchen, turning commitments into measurable outcomes.',
  },
  atlanticCaresMedia: [
    {
      id: 'cares-clean-street-bites',
      image: assetUrl('images/DSC04606.jpg'),
      alt: 'Trained street food vendors serving safely prepared meals',
      title: 'Clean Street Bites Initiative',
      description:
        'Supporting street food vendors across all 16 regions with training, PPE and food safety guidance.',
    },
    {
      id: 'cares-palm-prosperity',
      image: assetUrl('images/DSC04601.jpg'),
      alt: 'Palm smallholder community engaged in sustainable sourcing',
      title: 'Palm Prosperity Project',
      description:
        'Building traceable, community-centered palm oil supply chains that strengthen livelihoods.',
    },
    {
      id: 'cares-waste-to-wealth',
      image: assetUrl('images/DSC04603.jpg'),
      alt: 'Kitchen team sorting waste and used oil for recycling',
      title: 'Waste to Wealth',
      description:
        'Converting used oil, organic waste and energy use into measurable environmental gains.',
    },
    {
      id: 'cares-governance',
      image: assetUrl('images/DSC04610.jpg'),
      alt: 'Team reviewing governance, ethics and compliance documentation',
      title: 'Governance & Reporting',
      description:
        'Strengthening transparency, reporting and ethics frameworks across our operations.',
    },
  ],
  atlanticCaresIntro: {
    kicker: 'Our framework',
    heading: 'Atlantic CARES',
    body1: "Our recipe for success goes beyond food; it's about people, purpose and the planet.",
    body2:
      'Atlantic CARES is our sustainability and community impact framework, built on our core values and designed to create long-term value for people and planet. We dedicate ',
    body2Bold: '5% of our annual revenue',
    body2Rest:
      ' to community development and sustainability programmes under three key pillars:',
  },
  pillarsIntro: {
    kicker: 'Pillars',
    heading: 'How we structure our sustainability work',
    body:
      'Our framework is anchored on three core pillars that guide every decision, investment and partnership across our value chain.',
  },
  pillars: [
    {
      id: 'environment',
      title: 'Environmental Responsibility',
      description:
        'Reducing emissions, food waste and resource use across kitchens, logistics and facilities.',
      icon: 'leaf',
    },
    {
      id: 'social',
      title: 'Social Impact',
      description:
        'Creating safe, inclusive workplaces and investing in local communities and suppliers.',
      icon: 'users',
    },
    {
      id: 'governance',
      title: 'Governance & Ethics',
      description:
        'Embedding transparent oversight, compliant operations and ethical conduct in everything we do.',
      icon: 'shield',
    },
    {
      id: 'innovation',
      title: 'Innovation & Future Readiness',
      description:
        'Piloting new models, technologies and partnerships that accelerate sustainable growth.',
      icon: 'spark',
    },
  ],
  impactIntro: {
    kicker: 'Impact',
    heading: 'Key sustainability metrics',
    body:
      'We track progress through clear KPIs so customers and partners can see where we are today and where we are heading.',
  },
  impactMetrics: [
    {
      id: 'co2',
      label: 'CO\u2082 emissions reduced since 2020',
      value: 320,
      suffix: ' t',
      context: 'Scope 1 & 2 market-based',
      accent: 'env',
    },
    {
      id: 'energy',
      label: 'Energy efficiency improvement',
      value: 24,
      suffix: '%',
      context: 'kWh per meal served',
      accent: 'env',
    },
    {
      id: 'community',
      label: 'Annual community investment',
      value: 450,
      suffix: 'k',
      context: 'Local currency, grants & in-kind support',
      accent: 'social',
    },
    {
      id: 'safety',
      label: 'Reduction in lost-time incidents',
      value: 38,
      suffix: '%',
      context: 'Compared to 3-year average baseline',
      accent: 'safety',
    },
  ],
  initiativesIntro: {
    kicker: 'Initiatives',
    heading: 'Flagship initiatives and programmes',
    body:
      'Our programmes translate strategy into on-the-ground action, co-designed with clients, employees and communities.',
  },
  initiatives: [
    {
      id: 'waste-to-value',
      name: 'Waste-to-Value Kitchens',
      focus: 'Environment',
      focusKey: 'environment',
      description:
        'Redesigning menus, procurement and processes to cut food waste and convert unavoidable waste into animal feed, compost or energy.',
      image: assetUrl('images/DSC04664.jpg'),
      imageAlt: 'Kitchen and food waste reduction initiatives',
    },
    {
      id: 'local-sourcing',
      name: 'Local Sourcing & Supplier Uplift',
      focus: 'Social',
      focusKey: 'social',
      description:
        'Partnering with local growers and SMEs, offering capacity-building, payment predictability and standards coaching.',
      image: assetUrl('images/DSC04801.jpg'),
      imageAlt: 'Local sourcing and supplier partnerships',
    },
    {
      id: 'safe-workplaces',
      name: 'Safe Workplaces, Every Shift',
      focus: 'Governance',
      focusKey: 'governance',
      description:
        'Embedding behaviour-based safety, near-miss reporting and continuous training in every site we operate.',
      image: assetUrl('images/DSC04813.jpg'),
      imageAlt: 'Safe workplaces and training on site',
    },
    {
      id: 'future-skills',
      name: 'Future Skills Academy',
      focus: 'Social',
      focusKey: 'social',
      description:
        'Providing accredited training and on-the-job development for young people entering the hospitality and logistics sectors.',
      image: assetUrl('images/DSC04816.jpg'),
      imageAlt: 'Future Skills Academy training',
    },
    {
      id: 'low-carbon-logistics',
      name: 'Low-Carbon Logistics',
      focus: 'Environment',
      focusKey: 'environment',
      description:
        'Optimising delivery routes, consolidating loads and piloting lower-emission vehicles across key corridors.',
      image: assetUrl('images/DSC04967.jpg'),
      imageAlt: 'Low-carbon logistics and delivery',
    },
    {
      id: 'ethics-line',
      name: 'Independent Ethics & Speak-Up Line',
      focus: 'Governance',
      focusKey: 'governance',
      description:
        'Maintaining confidential, independently managed channels for reporting concerns without fear of retaliation.',
      image: assetUrl('images/DSC04979.jpg'),
      imageAlt: 'Ethics and speak-up programme',
    },
  ],
  compliance: {
    kicker: 'Standards',
    heading: 'Compliance, frameworks and standards',
    body:
      'Our sustainability approach is anchored in recognised international frameworks and independently audited management systems.',
    frameworks: [
      'UN Global Compact principles',
      'ESG and climate risk expectations from institutional clients',
      'Human rights and labour standards in line with international norms',
    ],
    standards: [
      'ISO 14001 Environmental Management',
      'ISO 45001 Occupational Health & Safety',
      'ISO 9001 Quality Management',
    ],
    reporting: [
      'Annual sustainability / ESG report for key stakeholders',
      'Customer-specific sustainability scorecards and dashboards',
      'Site-level performance reviews with agreed KPIs',
    ],
  },
  journey2030: {
    journeyHeading: 'Our Journey to 2030',
    prioritiesHeading: 'Core Priorities and Objectives',
    priorities: [
      {
        title: 'Tackling Food Waste',
        objective: 'Reduce 40% of food waste generated from our operations.',
      },
      {
        title: 'Revolutionizing Waste Management',
        objective: 'Achieve 60% of total waste sorted by 2030.',
      },
      {
        title: 'Driving Responsible Sourcing',
        objective: 'Ensure 100% compliance with sustainable purchasing commitments.',
      },
      {
        title: 'Reducing Single-Use Plastics',
        objective: 'Make 50% of all products purchased plastic-free by 2030.',
      },
      {
        title: 'Developing Paperless Processes',
        objective: 'Implement paperless processes in 90% of our operational sites.',
      },
      {
        title: 'Reducing Carbon Emissions',
        objective: 'Decrease carbon emissions by 30% at sites with carbon footprint analyses.',
      },
      {
        title: 'Investing in Our Communities',
        objective:
          'Support local initiatives through regular donations and active engagement to foster positive social impact.',
      },
    ],
    commitmentsHeading: 'Commitments to Our People',
    commitmentGroups: [
      {
        title: 'Upholding Integrity',
        items: [
          'Show respect to stakeholders in every interaction.',
          'Prioritize workplace health and safety.',
        ],
      },
      {
        title: 'Empowering People and Embracing Diversity',
        items: [
          'Foster an inclusive and welcoming environment.',
          'Recognize and nurture talent based on skills and potential.',
          'Promote inclusion and diversity at every level.',
        ],
      },
      {
        title: 'Innovative Leadership',
        items: [
          'Encourage professional and personal development.',
          'Create opportunities for growth through innovative management practices.',
        ],
      },
    ],
    newsHeading: 'News & Updates',
    careersHeading: 'Careers at Atlantic',
    careersBody:
      'Our people are at the heart of everything we do. We recruit talented, passionate individuals and invest in their growth through training, mentorship and opportunities across our nationwide network. We are an equal opportunity employer, committed to diversity, inclusion and empowering our teams to thrive.',
    careersCtaLabel: 'Join Us: Explore current opportunities.',
    careersCtaHref: '/careers',
  },
  cta: {
    kicker: 'Next steps',
    heading: 'Explore our sustainability reporting',
    body:
      'Access our latest sustainability report or speak with our team about how we can support your ESG objectives on the ground.',
    primaryLabel: 'Request sustainability report',
    primaryHref: '/contact',
    secondaryLabel: 'Talk to our sustainability team',
    secondaryHref: '/contact',
  },
}
