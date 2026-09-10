// Initial graphic design portfolio showcase projects and sample lead submissions

export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    title: "AURA - Futuristic Cyberpunk Brand Identity",
    category: "Brand Identity",
    categorySlug: "brand-identity",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
    ],
    client: "AURA Technologies Inc.",
    year: "2024",
    tags: ["Branding", "3D Logo", "Visual System", "Guidelines"],
    description: "Complete rebrand for an AI tech startup. Created an adaptive holographic logo mark, custom typography, dark cyber palette, and a 50-page brand strategy guide.",
    featured: true,
    liveUrl: "https://behance.net"
  },
  {
    id: "proj-2",
    title: "NEO VORTEX - 3D Motion & Geometric Art",
    category: "3D & Motion",
    categorySlug: "3d-motion",
    thumbnail: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=1200&q=80"
    ],
    client: "Vortex Digital Agency",
    year: "2024",
    tags: ["Blender 3D", "Octane Render", "Motion Graphics"],
    description: "Abstract glass and chrome geometric sculptures modeled in Blender with raytracing lighting for an international electronic music festival.",
    featured: true,
    liveUrl: "https://dribbble.com"
  },
  {
    id: "proj-3",
    title: "LUMEN - Luxury Botanical Packaging",
    category: "Packaging",
    categorySlug: "packaging",
    thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1200&q=80"
    ],
    client: "Lumen Organics London",
    year: "2023",
    tags: ["Packaging", "Gold Foil Print", "Eco-Design"],
    description: "Eco-friendly glass skincare bottle packaging design featuring embossed gold leaf typography and bespoke floral graphic illustrations.",
    featured: true,
    liveUrl: "https://instagram.com"
  },
  {
    id: "proj-4",
    title: "HYPERION - Web & App Design System",
    category: "UI/UX & Web",
    categorySlug: "ui-ux-web",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
    ],
    client: "Hyperion SaaS Platform",
    year: "2024",
    tags: ["Figma", "UI/UX", "Dashboard", "Design System"],
    description: "End-to-end design system and responsive Webflow site for a high-volume financial analytics dashboard with custom icon set and glass UI components.",
    featured: true,
    liveUrl: "https://figma.com"
  },
  {
    id: "proj-5",
    title: "KINETIC - Editorial Magazine & Poster Series",
    category: "Brand Identity",
    categorySlug: "brand-identity",
    thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80"
    ],
    client: "Kinetic Arts Press",
    year: "2023",
    tags: ["Typography", "Editorial", "Print Design"],
    description: "Swiss minimalism meets bold modern typography. A 120-page collectible coffee table art book and matching promotional billboard series.",
    featured: false,
    liveUrl: "https://behance.net"
  },
  {
    id: "proj-6",
    title: "SOLARIS - Beverage Can & Merchandise Kit",
    category: "Packaging",
    categorySlug: "packaging",
    thumbnail: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=1200&q=80"
    ],
    client: "Solaris Brewery",
    year: "2024",
    tags: ["Can Design", "Illustration", "Merch"],
    description: "Vibrant neon gradient aluminum beer can sleeve art paired with custom apparel merch line and social media campaign assets.",
    featured: false,
    liveUrl: "https://dribbble.com"
  }
];

export const INITIAL_LEADS = [
  {
    id: "lead-101",
    name: "Sarah Jenkins",
    email: "sarah@nexuscreative.io",
    phone: "+1 (555) 987-6543",
    service: "Brand Identity & Strategy",
    budget: "$5,000 - $10,000",
    timeline: "1 Month",
    message: "Hi Alex! We love your 3D branding work on AURA. We are launching an AI fintech startup next month and need a complete visual identity and Figma design system.",
    status: "New",
    date: "2026-09-08 14:30"
  },
  {
    id: "lead-102",
    name: "Marcus Vance",
    email: "marcus@vortexgaming.com",
    phone: "+1 (555) 444-3210",
    service: "3D Asset Modeling & Visuals",
    budget: "$3,000 - $5,000",
    timeline: "2 Weeks",
    message: "Looking for 5 hero 3D rendered key visuals for our upcoming web3 esports tournament website.",
    status: "In Progress",
    date: "2026-09-05 09:15"
  },
  {
    id: "lead-103",
    name: "Elena Rostova",
    email: "elena@luxecosmetics.fr",
    phone: "+33 6 12 34 56 78",
    service: "Packaging & Print Design",
    budget: "$10,000+",
    timeline: "2 Months",
    message: "Bonjour Alex. We require luxury packaging redesign for our eco-luxury organic perfume line in Paris.",
    status: "Contacted",
    date: "2026-09-01 18:45"
  }
];
