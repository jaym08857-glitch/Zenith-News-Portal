import { Article, Category, Author, Comment, NewsletterSubscriber, AdPlacement, AnalyticsData } from "../types";

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Technology",
    slug: "technology",
    description: "Breakthroughs in artificial intelligence, quantum computing, hardware, and web architecture.",
    color: "#2563eb", // blue
    icon: "Cpu",
    postCount: 18
  },
  {
    id: "cat-2",
    name: "World News",
    slug: "world",
    description: "Global policy, economic developments, geopolitics, and international relations.",
    color: "#dc2626", // red
    icon: "Globe",
    postCount: 24
  },
  {
    id: "cat-3",
    name: "Business & Markets",
    slug: "business",
    description: "Financial markets, venture capital, startup ecosystems, and macroeconomic analysis.",
    color: "#059669", // emerald
    icon: "TrendingUp",
    postCount: 15
  },
  {
    id: "cat-4",
    name: "AI & Future Tech",
    slug: "ai-future",
    description: "Neural network architectures, autonomous systems, ethics, and robotic intelligence.",
    color: "#7c3aed", // violet
    icon: "Sparkles",
    postCount: 21
  },
  {
    id: "cat-5",
    name: "Science & Space",
    slug: "science",
    description: "Astrophysics, clean energy innovations, biotechnology, and deep space exploration.",
    color: "#0284c7", // sky
    icon: "Rocket",
    postCount: 12
  },
  {
    id: "cat-6",
    name: "Culture & Design",
    slug: "culture",
    description: "Architecture, digital art, product philosophy, typography, and modern lifestyle.",
    color: "#db2777", // pink
    icon: "Palette",
    postCount: 14
  }
];

export const AUTHORS: Author[] = [
  {
    id: "auth-1",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    title: "Senior Technology Editor",
    bio: "Former AI researcher covering frontier tech, neural architecture shifts, and quantum computing breakthroughs.",
    twitterHandle: "@elena_rostova",
    verified: true
  },
  {
    id: "auth-2",
    name: "Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    title: "Chief Global Correspondent",
    bio: "Over 15 years reporting on international trade policy, European economic strategies, and diplomatic summits.",
    twitterHandle: "@marcus_vance",
    verified: true
  },
  {
    id: "auth-3",
    name: "Sophia Chen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300",
    title: "Venture & Silicon Valley Columnist",
    bio: "Writing on early-stage investments, unicorn valuations, semiconductor supply chains, and founder stories.",
    twitterHandle: "@sophia_techvc",
    verified: true
  },
  {
    id: "auth-4",
    name: "Dr. Julian Thorne",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    title: "Science & Space Editor",
    bio: "Astrophysicist and science communicator covering orbital research stations, fusion reactors, and NASA missions.",
    twitterHandle: "@dr_thorne_space",
    verified: true
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "Next-Gen Quantum Chips Achieve Operational Supremacy in Commercial Data Centers",
    slug: "quantum-chips-supremacy-data-centers",
    subtitle: "A monumental shift in computing density as cryogenic silicon architectures outpace classical supercomputers.",
    excerpt: "Engineers have successfully deployed 1,000-qubit processors in live cloud server environments, enabling real-time complex molecular modeling and instant cryptographic verification.",
    content: `
### The New Era of Cryogenic Computing

In a breakthrough that promises to reshape global computing infrastructure, researchers have successfully demonstrated stable, low-latency quantum operations within commercial data centers. Operating at sub-kelvin temperatures inside modular dilution refrigerators, the newly unveiled **Chronos Q-1** processor achieved a sustained 99.94% gate fidelity during a continuous 72-hour benchmark.

Unlike previous laboratory prototypes that required dedicated cleanroom containment and custom cooling grids, the Chronos Q-1 integrates directly into standard server racks via high-throughput optical interconnects.

> "We are moving from theoretical quantum advantage to practical industrial execution. Financial modeling, drug discovery, and aerodynamic simulations that previously took weeks now complete in under three seconds."
> — *Dr. Aris Thorne, Lead Quantum Systems Architect*

### Real-World Implications Across Industries

The immediate impact is being felt across three primary domains:

1. **Pharmaceutical Engineering**: Simulating complex protein folding dynamics at atomic resolution without relying on approximation heuristics.
2. **Global Logistics & Energy Grids**: Real-time optimization of continent-scale supply chains during extreme weather contingencies.
3. **Materials Science**: Accelerating the discovery of ambient-pressure superconductors and high-density solid-state battery electrolytes.

### Benchmark Performance Comparison

| Processing Task | Traditional Supercomputer Cluster | Chronos Q-1 Quantum Architecture | Speedup Factor |
| :--- | :--- | :--- | :--- |
| Molecular Dynamics Simulation | 14 Days | 4.2 Seconds | ~288,000x |
| Multi-Variable Financial Risk Matrix | 8 Hours | 120 Milliseconds | ~240,000x |
| Climate Fluid Grid Optimization | 36 Hours | 1.8 Seconds | ~72,000x |

### Navigating Security & Cryptographic Transitions

While the performance gains are undeniable, cybersecurity experts emphasize the urgency of adopting post-quantum encryption algorithms. Organizations around the world are rushing to upgrade legacy TLS layers to lattice-based cryptographic standards to prevent "harvest now, decrypt later" adversary strategies.

As cloud providers prepare to make quantum compute instances generally available next quarter, the technology landscape stands on the precipice of its most transformative decade since the invention of the microchip.
    `.trim(),
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200",
    imageCaption: "Cryogenic dilution refrigerator containing the Chronos Q-1 quantum processing cluster inside a modular data center.",
    category: "Technology",
    tags: ["Quantum Computing", "Deep Tech", "Hardware", "Cloud Infrastructure"],
    author: AUTHORS[0],
    publishedAt: "2026-07-25T14:30:00Z",
    readTime: "6 min read",
    views: 48920,
    likes: 1840,
    bookmarksCount: 620,
    shares: 410,
    commentsCount: 38,
    isHero: true,
    isFeatured: true,
    isTrending: true,
    isBreaking: false,
    isEditorPick: true,
    metaTitle: "Next-Gen Quantum Chips Achieve Commercial Supremacy | Global Chronicle",
    metaDescription: "Engineers deploy 1,000-qubit quantum processors into live data centers, revolutionizing molecular modeling and post-quantum encryption."
  },
  {
    id: "art-2",
    title: "Global Central Banks Announce Unified Cross-Border Settlement Standard",
    slug: "global-central-banks-settlement-standard",
    subtitle: "A historic consensus among 34 nations aims to reduce international wire latency from days to sub-second finality.",
    excerpt: "The new global financial framework relies on distributed ledger telemetry and instant liquidity pools to drastically slash cross-border transaction fees.",
    content: `
### Slashing Friction in International Commerce

Delegates at the Geneva Financial Summit reached a landmark accord today, establishing the **Global Interbank Telemetry Protocol (GITP)**. Designed to replace fragmented legacy SWIFT messaging rails, GITP allows sovereign financial institutions to settle cross-border transactions with immediate deterministic finality.

The system utilizes atomic swap mechanisms backed by tokenized central bank reserves, ensuring that exchange rate slippage is virtually eliminated during multi-currency conversions.

### Key Highlights of the GITP Framework

- **Sub-Second Finality**: Settlements occur within 350 milliseconds regardless of geographic distance.
- **92% Fee Reduction**: Slashing intermediary correspondent bank fees for small-to-medium enterprise exporters.
- **Embedded Compliance Verification**: Automated zero-knowledge proofs verify anti-money laundering regulations without exposing private party identities.

> "This agreement represents the single largest upgrade to global trade architecture in forty years," stated European Economic Council Chairperson Elena Rostova.
    `.trim(),
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200",
    imageCaption: "Financial tickers flashing live trade balances during the international summit in Geneva.",
    category: "Business & Markets",
    tags: ["Banking", "Global Economy", "Fintech", "Trade"],
    author: AUTHORS[1],
    publishedAt: "2026-07-25T16:00:00Z",
    readTime: "5 min read",
    views: 32150,
    likes: 1290,
    bookmarksCount: 410,
    shares: 280,
    commentsCount: 22,
    isHero: false,
    isFeatured: true,
    isTrending: true,
    isBreaking: true,
    isEditorPick: true,
    metaTitle: "Global Central Banks Launch Unified Settlement Standard | Chronicle",
    metaDescription: "34 nations agree on sub-second cross-border settlement protocols to slash fees and modernize trade rails."
  },
  {
    id: "art-3",
    title: "Autonomous AI Agents Reshape Enterprise Software Architecture",
    slug: "autonomous-ai-agents-reshape-enterprise-software",
    subtitle: "From single prompt LLMs to self-correcting multi-agent networks operating complex business workflows.",
    excerpt: "Software engineering teams are shifting from manual coding to orchestrating hierarchical AI agent clusters that continuously monitor, test, and patch software in production.",
    content: `
### Beyond Chat Interfaces to Goal-Oriented Systems

The technology industry is undergoing a paradigm shift. Rather than relying on human developers to manually craft boilerplates or debug microservice deployments, enterprise teams are deploying **autonomous multi-agent swarms**.

These agent architectures communicate via structured messaging protocols, delegating specialized responsibilities—such as security auditing, database migration, and frontend telemetry optimization.

### Architectural Comparison: Traditional vs. Agentic Workflows

1. **Traditional Development**: Human engineers write code -> Pull Request -> Automated CI pipeline -> Manual Code Review -> Staging deployment.
2. **Agentic Workflows**: Business specification -> Manager Agent decomposes tasks -> Sub-agents write, test, and perform formal verification -> Deployment executed with automated rollback guards.

> "The developer role is expanding from writer of code to director of intelligence systems," notes Silicon Valley technology analyst Sophia Chen.
    `.trim(),
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    imageCaption: "A software engineer monitoring multi-agent system execution diagrams on high-resolution displays.",
    category: "AI & Future Tech",
    tags: ["Artificial Intelligence", "Software Engineering", "Automation", "Agents"],
    author: AUTHORS[2],
    publishedAt: "2026-07-24T18:20:00Z",
    readTime: "7 min read",
    views: 54100,
    likes: 2410,
    bookmarksCount: 890,
    shares: 620,
    commentsCount: 45,
    isHero: false,
    isFeatured: true,
    isTrending: true,
    isBreaking: false,
    isEditorPick: true,
    metaTitle: "Autonomous AI Agents Reshape Enterprise Software | Global Chronicle",
    metaDescription: "Multi-agent AI networks are transforming software engineering from manual coding to goal-driven orchestration."
  },
  {
    id: "art-4",
    title: "James Webb Space Telescope Captures Clear Atmospheric Signature of Exo-Earth",
    slug: "webb-space-telescope-captures-exo-earth-atmosphere",
    subtitle: "Spectroscopic analysis confirms liquid water vapor, ozone, and carbon dioxide ratios matching early Earth.",
    excerpt: "Astronomers observing planetary system TRAPPIST-1e have detected unprecedented atmospheric chemical balance, signaling prime conditions for biological habitability.",
    content: `
### A Milestone in Astrobiological Discovery

Deep-space spectroscopic data transmitted from NASA's James Webb Space Telescope has provided humanity with its clearest view yet of an Earth-sized exoplanet atmospheric composition. Located 39 light-years away in the constellation Aquarius, planet **TRAPPIST-1e** exhibits unmistakable absorption features corresponding to molecular oxygen, water vapor, and nitrogen.

The observations were gathered during eight transit events over a six-month observation window, using JWST's Near-Infrared Spectrograph (NIRSpec).

### Atmospheric Chemical Signatures Detected

- **Water Vapor (H2O)**: Sustained cloud and surface condensation signatures.
- **Ozone (O3)**: Indicative of protective ultraviolet shielding.
- **Carbon Dioxide (CO2)**: Balanced carbon cycle feedback loops maintaining surface temperatures above freezing.

> "For centuries we have pondered whether our planet was a rare cosmic anomaly. Today, physics gives us our first empirical evidence that temperable worlds with active atmospheric cycles exist across our galactic neighborhood."
> — *Dr. Julian Thorne*
    `.trim(),
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    imageCaption: "Artist representation of exoplanet TRAPPIST-1e showing oceans and atmospheric gas layers.",
    category: "Science & Space",
    tags: ["Astronomy", "JWST", "Exoplanets", "NASA", "Space"],
    author: AUTHORS[3],
    publishedAt: "2026-07-24T11:15:00Z",
    readTime: "6 min read",
    views: 61200,
    likes: 3100,
    bookmarksCount: 1200,
    shares: 890,
    commentsCount: 52,
    isHero: false,
    isFeatured: false,
    isTrending: true,
    isBreaking: false,
    isEditorPick: true,
    metaTitle: "JWST Captures Clear Exo-Earth Atmosphere | Global Chronicle",
    metaDescription: "James Webb Space Telescope detects water vapor, ozone, and CO2 on TRAPPIST-1e, confirming habitable exoplanet signatures."
  },
  {
    id: "art-5",
    title: "The Architecture of Silence: Why Minimalist Design is Winning Modern Product Philosophy",
    slug: "architecture-of-silence-minimalist-design-philosophy",
    subtitle: "Stripping away digital clutter and cognitive noise to craft calm, high-intention user experiences.",
    excerpt: "In an era saturated with notifications and aggressive retention loops, design studios are embracing quiet interfaces, organic typography, and deliberate negative space.",
    content: `
### Reclaiming Attention Through Minimalist Form

For over a decade, digital interface design was dominated by engagement metrics, flashing banners, and constant feedback indicators. Today, a counter-movement is taking hold in design capitals from Tokyo to Copenhagen: **The Architecture of Silence**.

This philosophy posits that the highest expression of technology is invisible utility—tools that empower human capability without demanding continuous cognitive tribute.

### Principles of Calm Technology

1. **Subtle Feedback**: Micro-interactions that inform without startling.
2. **Spatial Hierarchy**: Using generous padding and mathematical grid relationships rather than heavy lines and box borders.
3. **Respect for Focus**: Defaulting to quiet states, allowing users to initiate interaction on their terms.
    `.trim(),
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200",
    imageCaption: "Clean minimalist workstation featuring natural materials and calm digital display typography.",
    category: "Culture & Design",
    tags: ["Design", "UX Philosophy", "Minimalism", "Digital Wellness"],
    author: AUTHORS[0],
    publishedAt: "2026-07-23T09:40:00Z",
    readTime: "4 min read",
    views: 28400,
    likes: 1540,
    bookmarksCount: 680,
    shares: 310,
    commentsCount: 19,
    isHero: false,
    isFeatured: false,
    isTrending: false,
    isBreaking: false,
    isEditorPick: false,
    metaTitle: "The Architecture of Silence in Modern Design | Global Chronicle",
    metaDescription: "Explore how minimalist design philosophy and calm technology are replacing digital noise and aggressive growth loops."
  },
  {
    id: "art-6",
    title: "Clean Fusion Energy Reactor Surpasses Commercial Net Power Threshold",
    slug: "clean-fusion-energy-reactor-surpasses-net-power-threshold",
    subtitle: "Magnetically confined plasma burns stably for over 24 hours, generating 3.4 gigawatts of thermal output.",
    excerpt: "The Helion-Alpha magnetic confinement plant has officially generated more net electrical energy than consumed, marking the dawn of unlimited zero-carbon baseload power.",
    content: `
### Overcoming the Sun in a Bottle

Nuclear fusion researchers have reached the holy grail of clean energy production. During a continuous testing sequence at the Mojave Fusion Testbed, magnetic pinch coils stabilized deuterium-helium-3 plasma at 150 million degrees Celsius, producing a continuous net power output of **3.4 gigawatts**.

Unlike traditional nuclear fission reactors, fusion produces zero high-level long-lived radioactive waste and carries zero risk of meltdown.

### Economic and Environmental Transformation

- **Zero Carbon Emissions**: Provides reliable baseload power independent of solar or wind variability.
- **Desalination at Scale**: Plentiful energy allows coastal regions to convert seawater into fresh agricultural water at a fraction of current costs.
- **Hydrogen Fuel Synthesis**: Abundant thermal energy makes green hydrogen production economic for heavy aviation and shipping.
    `.trim(),
    coverImage: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=1200",
    imageCaption: "Interior view of the toroidal magnetic confinement chamber during stable plasma ignition.",
    category: "Science & Space",
    tags: ["Clean Energy", "Fusion", "Climate", "Engineering"],
    author: AUTHORS[3],
    publishedAt: "2026-07-22T15:10:00Z",
    readTime: "5 min read",
    views: 42300,
    likes: 2150,
    bookmarksCount: 790,
    shares: 510,
    commentsCount: 31,
    isHero: false,
    isFeatured: true,
    isTrending: false,
    isBreaking: true,
    isEditorPick: false,
    metaTitle: "Clean Fusion Reactor Achieves Net Power Milestone | Global Chronicle",
    metaDescription: "Helion-Alpha magnetic fusion plant generates 3.4 GW thermal output in 24-hour continuous run."
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: "comm-1",
    articleId: "art-1",
    authorName: "David K. Vance",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120",
    content: "The implications for post-quantum cryptographic migration cannot be understated. Financial institutions need to adopt lattice-based encryption standards right now.",
    createdAt: "2026-07-25T15:45:00Z",
    likes: 24,
    replies: [
      {
        id: "rep-1",
        authorName: "Elena Rostova",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
        content: "Spot on, David. Most major central banks are already mandated to transition their primary communication layers by Q4 2026.",
        createdAt: "2026-07-25T16:10:00Z",
        likes: 12
      }
    ]
  },
  {
    id: "comm-2",
    articleId: "art-1",
    authorName: "Sarah Jenkins",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    content: "As a bio-informatics developer, being able to run molecular docking simulations in 4 seconds is an absolute dream come true!",
    createdAt: "2026-07-25T17:20:00Z",
    likes: 18
  },
  {
    id: "comm-3",
    articleId: "art-3",
    authorName: "Liam O'Connor",
    authorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120",
    content: "Autonomous swarms are incredible, but code review and security validation must remain human-verified for high-stakes healthcare and avionics software.",
    createdAt: "2026-07-24T20:05:00Z",
    likes: 31
  }
];

export const INITIAL_SUBSCRIBERS: NewsletterSubscriber[] = [
  { id: "sub-1", email: "alex.tech@enterprise.io", subscribedAt: "2026-07-20T10:00:00Z", status: "active", categoryInterest: "Technology" },
  { id: "sub-2", email: "maria.investor@fund.com", subscribedAt: "2026-07-21T11:30:00Z", status: "active", categoryInterest: "Business & Markets" },
  { id: "sub-3", email: "j.space@astronomy.org", subscribedAt: "2026-07-22T14:15:00Z", status: "active", categoryInterest: "Science & Space" },
  { id: "sub-4", email: "designer@studio.co", subscribedAt: "2026-07-23T08:45:00Z", status: "active", categoryInterest: "Culture & Design" },
  { id: "sub-5", email: "editor@chronicle-news.com", subscribedAt: "2026-07-24T16:20:00Z", status: "active", categoryInterest: "AI & Future Tech" }
];

export const INITIAL_ADS: AdPlacement[] = [
  {
    id: "ad-1",
    name: "Enterprise Cloud Leaderboard Banner",
    zone: "header-leaderboard",
    dimensions: "728x90",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    title: "Apex Cloud Infrastructure",
    subtitle: "99.999% Uptime for Next-Gen Neural Workloads",
    destinationUrl: "#monetization-preview",
    active: true,
    impressions: 14250,
    clicks: 340
  },
  {
    id: "ad-2",
    name: "Fintech Terminal Sidebar Rectangle",
    zone: "sidebar-rectangle",
    dimensions: "300x250",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400",
    title: "QuantTerminal Pro",
    subtitle: "Real-Time Global Market Telemetry & Analytics",
    destinationUrl: "#monetization-preview",
    active: true,
    impressions: 9800,
    clicks: 210
  }
];

export const INITIAL_ANALYTICS: AnalyticsData = {
  totalPageViews: 284920,
  uniqueVisitors: 94120,
  avgReadTimeMinutes: 4.8,
  newsletterSubscribersCount: 45280,
  dailyVisits: [
    { date: "Jul 20", views: 34100, visitors: 11200 },
    { date: "Jul 21", views: 38900, visitors: 12800 },
    { date: "Jul 22", views: 41200, visitors: 13500 },
    { date: "Jul 23", views: 39500, visitors: 12900 },
    { date: "Jul 24", views: 44200, visitors: 14600 },
    { date: "Jul 25", views: 48920, visitors: 16120 },
    { date: "Jul 26", views: 51200, visitors: 17200 }
  ],
  categoryDistribution: [
    { category: "Technology", count: 18, percentage: 30 },
    { category: "World News", count: 24, percentage: 25 },
    { category: "AI & Future Tech", count: 21, percentage: 20 },
    { category: "Business & Markets", count: 15, percentage: 15 },
    { category: "Science & Space", count: 12, percentage: 10 }
  ],
  topArticles: [
    { title: "Next-Gen Quantum Chips Achieve Commercial Supremacy", views: 48920, slug: "quantum-chips-supremacy-data-centers" },
    { title: "James Webb Space Telescope Captures Clear Atmospheric Signature", views: 61200, slug: "webb-space-telescope-captures-exo-earth-atmosphere" },
    { title: "Autonomous AI Agents Reshape Enterprise Software Architecture", views: 54100, slug: "autonomous-ai-agents-reshape-enterprise-software" },
    { title: "Clean Fusion Energy Reactor Surpasses Commercial Threshold", views: 42300, slug: "clean-fusion-energy-reactor-surpasses-net-power-threshold" }
  ]
};
