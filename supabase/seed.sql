-- Auto-generated seed for site_content

insert into public.site_content (id, data) values ('clients', '{
  "row1": [
    {
      "src": "images/clients/tullow.png",
      "alt": "Tullow"
    },
    {
      "src": "images/clients/newmont.png",
      "alt": "Newmont"
    },
    {
      "src": "images/clients/saipem.png",
      "alt": "Saipem"
    },
    {
      "src": "images/clients/borr-drill.png",
      "alt": "BORR Drill"
    },
    {
      "src": "images/clients/mantrac.png",
      "alt": "Mantrac"
    },
    {
      "src": "images/clients/Orica.png",
      "alt": "Orica"
    },
    {
      "src": "images/clients/Vivo.png",
      "alt": "Vivo"
    },
    {
      "src": "images/clients/Kaltire.png",
      "alt": "Kaltire"
    },
    {
      "src": "images/clients/Steval.png",
      "alt": "Steval"
    },
    {
      "src": "images/clients/ctp.png",
      "alt": "CTP"
    },
    {
      "src": "images/clients/MODEC.png",
      "alt": "MODEC"
    }
  ],
  "row2": [
    {
      "src": "images/clients/Aviance.png",
      "alt": "Aviance"
    },
    {
      "src": "images/clients/UMA.png",
      "alt": "UMA"
    },
    {
      "src": "images/clients/AMS.png",
      "alt": "AMS"
    },
    {
      "src": "images/clients/McDan.png",
      "alt": "McDan"
    },
    {
      "src": "images/clients/Fluor.png",
      "alt": "Fluor"
    },
    {
      "src": "images/clients/ENI.png",
      "alt": "ENI"
    },
    {
      "src": "images/clients/logistics-direct.png",
      "alt": "Logistics Direct"
    },
    {
      "src": "images/clients/GIS.png",
      "alt": "GIS"
    },
    {
      "src": "images/clients/Nyaho.png",
      "alt": "Nyaho"
    },
    {
      "src": "images/clients/AEL.png",
      "alt": "AEL"
    },
    {
      "src": "images/clients/WFP.png",
      "alt": "WFP"
    }
  ]
}'::jsonb)
on conflict (id) do update set data = excluded.data, updated_at = now();

insert into public.site_content (id, data) values ('contact', '{
  "email": "info@atlanticcatering-gh.com",
  "emailNote": "Response within 24 hours",
  "phone": "+233 30 200 0000",
  "phoneHref": "+233302000000",
  "phoneNote": "Mon–Fri, 8am–5pm GMT",
  "location": "Headquartered in Ghana",
  "city": "Accra",
  "careersEmail": "careers@atlanticcatering-gh.com",
  "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.790983475676!2d-0.1869644!3d5.6037168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzYnMTMuNCJOIDDCsDExJzEzLjEiVw!5e0!3m2!1sen!2sgh!4v1"
}'::jsonb)
on conflict (id) do update set data = excluded.data, updated_at = now();

insert into public.site_content (id, data) values ('home', '{
  "hero": {
    "titleLine1": "Focus on your core business.",
    "titleLine2": "We''ll take care of the rest.",
    "subtitle": "From land, air to sea—supporting businesses to deliver on their promises."
  },
  "whoWeAre": {
    "intro": "Founded in 2014, Atlantic Catering & Logistics Limited is a multi-ISO certified leader in corporate catering, camp management and integrated logistics, headquartered in Ghana.",
    "bullets": [
      "8 industrial kitchens",
      "5 regions",
      "Serving Oil & Gas, Mining, Aviation",
      "Multi-ISO certified",
      "Safety-first ethos",
      "565+ employees"
    ]
  }
}'::jsonb)
on conflict (id) do update set data = excluded.data, updated_at = now();

insert into public.site_content (id, data) values ('news', '[
  {
    "slug": "article-1",
    "category": "Award",
    "categoryKey": "award",
    "title": "1st in Tourism & Hospitality – Ghana Club 100 (2024)",
    "excerpt": "We''re proud to rank first in Tourism & Hospitality in the Ghana Club 100.",
    "image": "images/DSC04606.jpg",
    "imageAlt": "Ghana Club 100 Tourism & Hospitality award – Atlantic Catering & Logistics",
    "year": 2024,
    "collageVariant": "large",
    "collageTitle": "1st in Tourism & Hospitality (2024)",
    "collageExcerpt": "Ghana Club 100 – Award",
    "collageImage": "images/DSC04603.jpg",
    "body": [
      "We are proud to announce that Atlantic Catering & Logistics Limited has been ranked first in Tourism & Hospitality in the Ghana Club 100 (2024). The Ghana Club 100 recognises the top 100 companies in Ghana based on profitability, growth, and size.",
      "This recognition reflects our team''s commitment to excellence in corporate catering, camp management, and integrated logistics. We thank our clients, partners, and every member of the Atlantic Catering and Logistics Limited family for making this possible.",
      "We will continue to raise standards in our sector and contribute to Ghana''s hospitality and tourism landscape."
    ]
  },
  {
    "slug": "article-2",
    "category": "Milestone",
    "categoryKey": "milestone",
    "title": "First Ghanaian Caterer to sign UN Global Compact (2025)",
    "excerpt": "Our commitment to sustainability is now formalized with the UNGC.",
    "image": "images/DSC04610.jpg",
    "imageAlt": "UN Global Compact signing – Atlantic Catering & Logistics",
    "year": 2025,
    "collageVariant": "small",
    "collageTitle": "UN Global Compact (2025)",
    "collageExcerpt": "First Ghanaian caterer – Milestone",
    "collageImage": "images/DSC04610.jpg",
    "body": [
      "Atlantic Catering & Logistics Limited is proud to be the first Ghanaian caterer to sign the United Nations Global Compact (UNGC). Our commitment to sustainability, human rights, labour standards, environment, and anti-corruption is now formalised within this global framework.",
      "The UN Global Compact encourages businesses to align their operations and strategies with ten universally accepted principles. By joining, we commit to annual reporting on our progress and to embedding responsible practices across our catering, camp management, and logistics operations.",
      "This milestone supports our existing multi-ISO certifications and our roadmap for environmental and social impact. We invite our partners and peers to join us in building a more sustainable and inclusive industry."
    ]
  },
  {
    "slug": "article-3",
    "category": "Recognition",
    "categoryKey": "recognition",
    "title": "National Catering Service of the Year 2023",
    "excerpt": "Industry recognition for excellence in catering and service delivery.",
    "image": "images/DSC04813.jpg",
    "imageAlt": "National Catering Service of the Year 2023 – Atlantic Catering & Logistics",
    "year": 2023,
    "collageVariant": "offset",
    "collageTitle": "National Catering Service of the Year 2023",
    "collageExcerpt": "Industry recognition",
    "collageImage": "images/DSC04813.jpg",
    "body": [
      "Atlantic Catering & Logistics Limited was honoured to receive the National Catering Service of the Year 2023 award. This industry recognition reflects our commitment to excellence in catering and service delivery across corporate, remote-site, and event operations.",
      "Our culinary and operations teams work every day to deliver consistent quality, food safety, and client satisfaction. This award is a testament to their dedication and to the trust our clients place in us.",
      "We thank the organisers and our peers for this recognition and will continue to raise the bar for catering and logistics services in Ghana and beyond."
    ]
  }
]'::jsonb)
on conflict (id) do update set data = excluded.data, updated_at = now();

insert into public.site_content (id, data) values ('page-meta', '{
  "/": {
    "title": "Atlantic Catering & Logistics Limited | Corporate Catering, Camp Management & Integrated Logistics",
    "description": "Atlantic Catering and Logistics Limited delivers corporate catering, camp management and integrated logistics from land, air to sea. Multi-ISO certified. Ghana-headquartered since 2014."
  },
  "/about": {
    "title": "About | Atlantic Catering & Logistics Limited",
    "description": "Who we are: multi-ISO certified leader in corporate catering, camp management and integrated logistics. Ghana-headquartered since 2014. Our people, achievements and services."
  },
  "/services": {
    "title": "Services | Atlantic Catering & Logistics Limited",
    "description": "Offshore catering, camp management, inflight catering, VIP catering, events, ship chandelling, 24/7 support, school and hospital catering."
  },
  "/sustainability": {
    "title": "Sustainability | Atlantic Catering & Logistics Limited",
    "description": "Atlantic CARES sustainability framework: environmental responsibility, social impact, governance and measurable outcomes across our operations."
  },
  "/news": {
    "title": "News | Atlantic Catering & Logistics Limited",
    "description": "Latest news, awards and updates from Atlantic Catering & Logistics Limited."
  },
  "/careers": {
    "title": "Careers | Atlantic Catering & Logistics Limited",
    "description": "Join Atlantic Catering & Logistics. We are an equal opportunity employer. View current openings and send your CV to careers@atlanticcatering-gh.com."
  },
  "/contact": {
    "title": "Contact | Atlantic Catering & Logistics Limited",
    "description": "Get in touch with Atlantic Catering & Logistics. General enquiries, careers, and headquarters in Ghana."
  },
  "/shop": {
    "title": "Shop | Atlantic Catering & Logistics Limited",
    "description": "Retail products and palm oil line from Atlantic Catering & Logistics. E-commerce coming soon."
  },
  "/404": {
    "title": "Page Not Found | Atlantic Catering & Logistics Limited",
    "description": "The page you are looking for could not be found."
  }
}'::jsonb)
on conflict (id) do update set data = excluded.data, updated_at = now();

insert into public.site_content (id, data) values ('people', '[
  {
    "name": "Maud Lindsay-Gamrat",
    "role": "Chief Executive Officer",
    "image": "images/ceo portrat 7.png",
    "bio": "Maud Lindsay-Gamrat is a seasoned business leader, with over two decades of experience in the Ghanaian landscape. Her multifaceted expertise encompasses key areas such as: Inflight, Camp and Remote Site, Offshore and Onshore Catering Operations.\nOver a remarkable twenty-four-year career, Maud has played pivotal roles in Ghana''s Inflight and Offshore Catering Operations, contributing significantly to Sales, Marketing, Human Resources and Finance sectors. Beyond her adeptness in inflight services, she has successfully initiated and managed numerous remote site catering and hospitality projects, all accomplished within the Ghanaian context.\nAs the CEO of Atlantic, Maud has championed local capacity development, leading a team of over 545, with an extraordinary 98% percent being Ghanaians. The company, under her guidance, excels in delivering specialized catering and virtual services aboard two FPSOs in Ghana and on some of the continent''s biggest mine sites, remote sites and onsite corporate operations.\nHer outstanding achievements have garnered several awards, the most recent including the Most Outstanding Female Owned Business in Ghana''s Upstream Petroleum sector awarded by the Petroleum Commission of Ghana, Glitz Woman of the Year for Catering & Hospitality by Glitz Africa among others.\nMaud has also featured on various Business and Entrepreneurship Events, Conferences and Programs, notably appearing on CNN''s \"Passion to Portfolio\", a program highlighting emerging and established global entrepreneurs.\nMaud''s influence extends beyond the corporate realm. Her fervent advocacy for women''s empowerment is palpable, evidenced by her commitment to empowering female employees for professional and capacity building through self-development training initiatives and courses. She extends this passion to local women food vendors and farmers across Ghana, championing activities that uplift and strengthen local communities.\nHer dedication further encompasses environmental sustainability, inclusivity and social responsibility. Maud continually strives to make Atlantic more sustainable and socially responsible.\nMaud is married to Jeff, a Co-Founder and Executive Director of Atlantic and blessed with two daughters."
  },
  {
    "name": "John Ansah",
    "role": "Quality & Remote Site Director",
    "image": "images/DSC04601.jpg",
    "bio": "Part of the Atlantic leadership team."
  },
  {
    "name": "Hubert Tossou",
    "role": "Operations Director",
    "image": "images/DSC04603.jpg",
    "bio": "Part of the Atlantic leadership team."
  },
  {
    "name": "Suzan Valentina Dogbe",
    "role": "Finance Manager",
    "image": "images/DSC04610.jpg",
    "bio": "Part of the Atlantic leadership team."
  },
  {
    "name": "Joseph K. Sam",
    "role": "HR Manager",
    "image": "images/DSC04664.jpg",
    "bio": "Part of the Atlantic leadership team."
  },
  {
    "name": "Francis Sadiq",
    "role": "Production Manager",
    "image": "images/DSC04801.jpg",
    "bio": "Part of the Atlantic leadership team."
  },
  {
    "name": "Freda Opoku",
    "role": "Admin Manager",
    "image": "images/DSC04813.jpg",
    "bio": "Part of the Atlantic leadership team."
  },
  {
    "name": "Jemima Tagoe",
    "role": "QHSE Manager",
    "image": "images/DSC04816.jpg",
    "bio": "Part of the Atlantic leadership team."
  },
  {
    "name": "Stephen Kodzi",
    "role": "Events Manager",
    "image": "images/DSC04967.jpg",
    "bio": "Part of the Atlantic leadership team."
  },
  {
    "name": "Cephas Adzaho",
    "role": "IT Manager",
    "image": "images/DSC04979.jpg",
    "bio": "Part of the Atlantic leadership team."
  },
  {
    "name": "Elvira Kudiabor",
    "role": "Warehouse Manager",
    "image": "images/DSC04990.jpg",
    "bio": "Part of the Atlantic leadership team."
  },
  {
    "name": "Prince Charles Afotey",
    "role": "Project Manager, Newmont Ahafo South Mine Site",
    "image": "images/IMG_0490.jpg",
    "bio": "Part of the Atlantic leadership team."
  },
  {
    "name": "Eugene Baah",
    "role": "Project Manager, Newmont Ahafo North Mine Site",
    "image": "images/IMG_0467.jpg",
    "bio": "Part of the Atlantic leadership team."
  }
]'::jsonb)
on conflict (id) do update set data = excluded.data, updated_at = now();

insert into public.site_content (id, data) values ('services', '[
  {
    "id": "offshore",
    "name": "Offshore Catering & Supply",
    "tagline": "Quality meals & logistics for offshore operations",
    "description": "Full catering and supply chain solutions for offshore oil & gas and maritime operations. Quality meals, provisions and logistics so your teams stay focused and fueled.",
    "image": "images/DSC04606.jpg"
  },
  {
    "id": "camp",
    "name": "Camp Management",
    "tagline": "Accommodation, catering & 360° camp support",
    "description": "End-to-end camp operations including accommodation, catering, housekeeping and 360° support. Safe, compliant camps so your workforce is comfortable and productive.",
    "image": "images/DSC04601.jpg"
  },
  {
    "id": "inflight",
    "name": "Inflight Catering",
    "tagline": "Premium meals & logistics for aviation",
    "description": "Premium inflight meals and logistics for aviation. Quality, safety and on-time delivery for airlines and charter operators.",
    "image": "images/DSC04603.jpg"
  },
  {
    "id": "vip",
    "name": "VIP Catering",
    "tagline": "Bespoke dining for executives & events",
    "description": "Bespoke catering for high-profile clients, executive dining and exclusive events. Discreet, premium service tailored to your needs.",
    "image": "images/DSC04610.jpg"
  },
  {
    "id": "events",
    "name": "Event Planning",
    "tagline": "Corporate events, conferences & celebrations",
    "description": "Corporate events, conferences, product launches and celebrations. From concept to cleanup, we handle catering and logistics.",
    "image": "images/DSC04664.jpg"
  },
  {
    "id": "chandelling",
    "name": "Ship Chandelling",
    "tagline": "Maritime supply & provisioning for vessels",
    "description": "Maritime supply and provisioning: food, stores and logistics for vessels in port and at anchor. Reliable, compliant and on schedule.",
    "image": "images/DSC04801.jpg"
  },
  {
    "id": "support",
    "name": "24/7 Support",
    "tagline": "Round-the-clock operational support",
    "description": "Round-the-clock operational support for all our services.",
    "image": "images/DSC04813.jpg"
  },
  {
    "id": "school",
    "name": "School Catering",
    "tagline": "Healthy, safe meals for education",
    "description": "Nutrition-focused catering for schools and educational institutions. Healthy, safe meals that support learning.",
    "image": "images/DSC04816.jpg"
  },
  {
    "id": "hospital",
    "name": "Hospital Catering",
    "tagline": "Diet-compliant, hygienic healthcare catering",
    "description": "Healthcare and hospital food services. Diet-compliant, hygienic and patient-focused catering for healthcare facilities.",
    "image": "images/DSC04967.jpg"
  }
]'::jsonb)
on conflict (id) do update set data = excluded.data, updated_at = now();

insert into public.site_content (id, data) values ('stats', '[
  {
    "target": 15,
    "label": "Locations across 6 regions"
  },
  {
    "target": 3,
    "label": "Meals annually",
    "suffix": "M+"
  },
  {
    "target": 6000,
    "label": "+ Meals daily"
  },
  {
    "target": 565,
    "label": "+ Employees"
  },
  {
    "target": 6,
    "label": "Service areas"
  },
  {
    "target": 3,
    "label": "ISO certifications"
  }
]'::jsonb)
on conflict (id) do update set data = excluded.data, updated_at = now();

insert into public.site_content (id, data) values ('sustainability', '{
  "hero": {
    "kicker": "Sustainability",
    "title": "Sustainability",
    "subtitle": "We integrate environmental, social and governance principles into every contract and kitchen, turning commitments into measurable outcomes."
  },
  "atlanticCaresMedia": [
    {
      "id": "cares-clean-street-bites",
      "image": "images/DSC04606.jpg",
      "alt": "Trained street food vendors serving safely prepared meals",
      "title": "Clean Street Bites Initiative",
      "description": "Supporting street food vendors across all 16 regions with training, PPE and food safety guidance."
    },
    {
      "id": "cares-palm-prosperity",
      "image": "images/DSC04601.jpg",
      "alt": "Palm smallholder community engaged in sustainable sourcing",
      "title": "Palm Prosperity Project",
      "description": "Building traceable, community-centered palm oil supply chains that strengthen livelihoods."
    },
    {
      "id": "cares-waste-to-wealth",
      "image": "images/DSC04603.jpg",
      "alt": "Kitchen team sorting waste and used oil for recycling",
      "title": "Waste to Wealth",
      "description": "Converting used oil, organic waste and energy use into measurable environmental gains."
    },
    {
      "id": "cares-governance",
      "image": "images/DSC04610.jpg",
      "alt": "Team reviewing governance, ethics and compliance documentation",
      "title": "Governance & Reporting",
      "description": "Strengthening transparency, reporting and ethics frameworks across our operations."
    }
  ],
  "atlanticCaresIntro": {
    "kicker": "Our framework",
    "heading": "Atlantic CARES",
    "body1": "Our recipe for success goes beyond food; it''s about people, purpose and the planet.",
    "body2": "Atlantic CARES is our sustainability and community impact framework, built on our core values and designed to create long-term value for people and planet. We dedicate ",
    "body2Bold": "5% of our annual revenue",
    "body2Rest": " to community development and sustainability programmes under three key pillars:"
  },
  "pillarsIntro": {
    "kicker": "Pillars",
    "heading": "How we structure our sustainability work",
    "body": "Our framework is anchored on three core pillars that guide every decision, investment and partnership across our value chain."
  },
  "pillars": [
    {
      "id": "environment",
      "title": "Environmental Responsibility",
      "description": "Reducing emissions, food waste and resource use across kitchens, logistics and facilities.",
      "icon": "leaf"
    },
    {
      "id": "social",
      "title": "Social Impact",
      "description": "Creating safe, inclusive workplaces and investing in local communities and suppliers.",
      "icon": "users"
    },
    {
      "id": "governance",
      "title": "Governance & Ethics",
      "description": "Embedding transparent oversight, compliant operations and ethical conduct in everything we do.",
      "icon": "shield"
    },
    {
      "id": "innovation",
      "title": "Innovation & Future Readiness",
      "description": "Piloting new models, technologies and partnerships that accelerate sustainable growth.",
      "icon": "spark"
    }
  ],
  "impactIntro": {
    "kicker": "Impact",
    "heading": "Key sustainability metrics",
    "body": "We track progress through clear KPIs so customers and partners can see where we are today and where we are heading."
  },
  "impactMetrics": [
    {
      "id": "co2",
      "label": "CO₂ emissions reduced since 2020",
      "value": 320,
      "suffix": " t",
      "context": "Scope 1 & 2 market-based",
      "accent": "env"
    },
    {
      "id": "energy",
      "label": "Energy efficiency improvement",
      "value": 24,
      "suffix": "%",
      "context": "kWh per meal served",
      "accent": "env"
    },
    {
      "id": "community",
      "label": "Annual community investment",
      "value": 450,
      "suffix": "k",
      "context": "Local currency, grants & in-kind support",
      "accent": "social"
    },
    {
      "id": "safety",
      "label": "Reduction in lost-time incidents",
      "value": 38,
      "suffix": "%",
      "context": "Compared to 3-year average baseline",
      "accent": "safety"
    }
  ],
  "initiativesIntro": {
    "kicker": "Initiatives",
    "heading": "Flagship initiatives and programmes",
    "body": "Our programmes translate strategy into on-the-ground action, co-designed with clients, employees and communities."
  },
  "initiatives": [
    {
      "id": "waste-to-value",
      "name": "Waste-to-Value Kitchens",
      "focus": "Environment",
      "focusKey": "environment",
      "description": "Redesigning menus, procurement and processes to cut food waste and convert unavoidable waste into animal feed, compost or energy.",
      "image": "images/DSC04664.jpg",
      "imageAlt": "Kitchen and food waste reduction initiatives"
    },
    {
      "id": "local-sourcing",
      "name": "Local Sourcing & Supplier Uplift",
      "focus": "Social",
      "focusKey": "social",
      "description": "Partnering with local growers and SMEs, offering capacity-building, payment predictability and standards coaching.",
      "image": "images/DSC04801.jpg",
      "imageAlt": "Local sourcing and supplier partnerships"
    },
    {
      "id": "safe-workplaces",
      "name": "Safe Workplaces, Every Shift",
      "focus": "Governance",
      "focusKey": "governance",
      "description": "Embedding behaviour-based safety, near-miss reporting and continuous training in every site we operate.",
      "image": "images/DSC04813.jpg",
      "imageAlt": "Safe workplaces and training on site"
    },
    {
      "id": "future-skills",
      "name": "Future Skills Academy",
      "focus": "Social",
      "focusKey": "social",
      "description": "Providing accredited training and on-the-job development for young people entering the hospitality and logistics sectors.",
      "image": "images/DSC04816.jpg",
      "imageAlt": "Future Skills Academy training"
    },
    {
      "id": "low-carbon-logistics",
      "name": "Low-Carbon Logistics",
      "focus": "Environment",
      "focusKey": "environment",
      "description": "Optimising delivery routes, consolidating loads and piloting lower-emission vehicles across key corridors.",
      "image": "images/DSC04967.jpg",
      "imageAlt": "Low-carbon logistics and delivery"
    },
    {
      "id": "ethics-line",
      "name": "Independent Ethics & Speak-Up Line",
      "focus": "Governance",
      "focusKey": "governance",
      "description": "Maintaining confidential, independently managed channels for reporting concerns without fear of retaliation.",
      "image": "images/DSC04979.jpg",
      "imageAlt": "Ethics and speak-up programme"
    }
  ],
  "compliance": {
    "kicker": "Standards",
    "heading": "Compliance, frameworks and standards",
    "body": "Our sustainability approach is anchored in recognised international frameworks and independently audited management systems.",
    "frameworks": [
      "UN Global Compact principles",
      "ESG and climate risk expectations from institutional clients",
      "Human rights and labour standards in line with international norms"
    ],
    "standards": [
      "ISO 14001 Environmental Management",
      "ISO 45001 Occupational Health & Safety",
      "ISO 9001 Quality Management"
    ],
    "reporting": [
      "Annual sustainability / ESG report for key stakeholders",
      "Customer-specific sustainability scorecards and dashboards",
      "Site-level performance reviews with agreed KPIs"
    ]
  },
  "journey2030": {
    "journeyHeading": "Our Journey to 2030",
    "prioritiesHeading": "Core Priorities and Objectives",
    "priorities": [
      {
        "title": "Tackling Food Waste",
        "objective": "Reduce 40% of food waste generated from our operations."
      },
      {
        "title": "Revolutionizing Waste Management",
        "objective": "Achieve 60% of total waste sorted by 2030."
      },
      {
        "title": "Driving Responsible Sourcing",
        "objective": "Ensure 100% compliance with sustainable purchasing commitments."
      },
      {
        "title": "Reducing Single-Use Plastics",
        "objective": "Make 50% of all products purchased plastic-free by 2030."
      },
      {
        "title": "Developing Paperless Processes",
        "objective": "Implement paperless processes in 90% of our operational sites."
      },
      {
        "title": "Reducing Carbon Emissions",
        "objective": "Decrease carbon emissions by 30% at sites with carbon footprint analyses."
      },
      {
        "title": "Investing in Our Communities",
        "objective": "Support local initiatives through regular donations and active engagement to foster positive social impact."
      }
    ],
    "commitmentsHeading": "Commitments to Our People",
    "commitmentGroups": [
      {
        "title": "Upholding Integrity",
        "items": [
          "Show respect to stakeholders in every interaction.",
          "Prioritize workplace health and safety."
        ]
      },
      {
        "title": "Empowering People and Embracing Diversity",
        "items": [
          "Foster an inclusive and welcoming environment.",
          "Recognize and nurture talent based on skills and potential.",
          "Promote inclusion and diversity at every level."
        ]
      },
      {
        "title": "Innovative Leadership",
        "items": [
          "Encourage professional and personal development.",
          "Create opportunities for growth through innovative management practices."
        ]
      }
    ],
    "newsHeading": "News & Updates",
    "careersHeading": "Careers at Atlantic",
    "careersBody": "Our people are at the heart of everything we do. We recruit talented, passionate individuals and invest in their growth through training, mentorship and opportunities across our nationwide network. We are an equal opportunity employer, committed to diversity, inclusion and empowering our teams to thrive.",
    "careersCtaLabel": "Join Us: Explore current opportunities.",
    "careersCtaHref": "/careers"
  },
  "cta": {
    "kicker": "Next steps",
    "heading": "Explore our sustainability reporting",
    "body": "Access our latest sustainability report or speak with our team about how we can support your ESG objectives on the ground.",
    "primaryLabel": "Request sustainability report",
    "primaryHref": "/contact",
    "secondaryLabel": "Talk to our sustainability team",
    "secondaryHref": "/contact"
  }
}'::jsonb)
on conflict (id) do update set data = excluded.data, updated_at = now();

