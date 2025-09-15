export type Project = {
  id: number;
  slug: string;
  title: string;
  client: string;
  date: string;
  location: string;
  description: string;
  cover: string;
  services: string[];
  attendees: string;
  budgetRange: string;
  gallery: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "luxury-wedding-lagoon",
    title: "Luxury Lagoon Wedding",
    client: "The Okoyes",
    date: "Jun 2025",
    location: "Lagoon Front, Lagos",
    description:
      "A sunset waterfront ceremony with bespoke florals, live strings, and a candle‑lit reception under the stars.",
    cover:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1600&auto=format&fit=crop",
    services: ["Full Planning", "Design", "Vendor Management", "Production"],
    attendees: "250",
    budgetRange: "$$$$",
    gallery: [
      "https://images.unsplash.com/photo-1509326066968-4a9b3d4d3ab3?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520697222863-0cfb6fa1cc2f?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    slug: "tech-product-launch",
    title: "Tech Product Launch",
    client: "Aurelia Devices",
    date: "May 2025",
    location: "Eko Convention Centre",
    description:
      "Immersive reveal with synchronized lighting, interactive demo pods, and press briefing lounge.",
    cover:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop",
    services: ["Launch Strategy", "Stage Design", "AV", "Press"],
    attendees: "1,200",
    budgetRange: "$$$",
    gallery: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: 3,
    slug: "corporate-retreat-abeokuta",
    title: "Corporate Leadership Retreat",
    client: "Nimbus Group",
    date: "Apr 2025",
    location: "Abeokuta Hills Resort",
    description:
      "Three‑day offsite with strategy workshops, culinary experiences, and fireside networking.",
    cover:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
    services: ["Logistics", "Team Building", "Decor", "Hospitality"],
    attendees: "80",
    budgetRange: "$$$",
    gallery: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: 4,
    slug: "garden-bridal-shower",
    title: "Garden Bridal Shower",
    client: "Ada & Friends",
    date: "Mar 2025",
    location: "Private Garden, Ikoyi",
    description:
      "Pastel palette picnic with artisanal desserts, live acoustic set, and custom photo wall.",
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    services: ["Styling", "Catering", "Entertainment"],
    attendees: "40",
    budgetRange: "$$",
    gallery: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: 5,
    slug: "award-gala-night",
    title: "Annual Awards Gala",
    client: "Beta Bank",
    date: "Feb 2025",
    location: "Civic Centre",
    description:
      "Black‑tie gala with LED stage backdrop, choreographed walk‑ups, and red carpet media wall.",
    cover:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop",
    services: ["Stage Management", "Lighting", "Red Carpet"],
    attendees: "600",
    budgetRange: "$$$",
    gallery: [
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: 6,
    slug: "kids-carnival-festival",
    title: "Kids' Carnival Festival",
    client: "Sunrise Schools",
    date: "Jan 2025",
    location: "School Grounds, Lekki",
    description:
      "Colourful game booths, parade floats, and family picnic zones with roaming mascots.",
    cover:
      "https://images.unsplash.com/photo-1464375117522-1311d2433b42?q=80&w=1600&auto=format&fit=crop",
    services: ["Permits", "Logistics", "Vendors"],
    attendees: "1,800",
    budgetRange: "$$",
    gallery: [
      "https://images.unsplash.com/photo-1508606572321-901ea443707f?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: 7,
    slug: "fashion-pop-up-series",
    title: "Fashion Pop‑up Series",
    client: "Maison K",
    date: "Dec 2024",
    location: "Multiple Malls, Lagos",
    description:
      "Modular booths, runway moments, and influencer meet‑and‑greets across three weekends.",
    cover:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop",
    services: ["Experiential", "Branding", "Sponsorship"],
    attendees: "3,500",
    budgetRange: "$$$",
    gallery: [
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: 8,
    slug: "ngo-fundraiser-dinner",
    title: "NGO Fundraiser Dinner",
    client: "Heal Africa",
    date: "Nov 2024",
    location: "Banquet Hall, VI",
    description:
      "Donor dinner with pledge moments, impact exhibits, and silent auction corners.",
    cover:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
    services: ["Fundraising", "Production", "Curation"],
    attendees: "220",
    budgetRange: "$$$",
    gallery: [
      "https://images.unsplash.com/photo-1425421543490-6a133856ff32?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: 9,
    slug: "private-birthday-soiree",
    title: "Private Birthday Soirée",
    client: "Manny",
    date: "Oct 2024",
    location: "Penthouse, Ikoyi",
    description:
      "Neo‑tropical theme with mixology bar, DJ, and ambient projection mapping.",
    cover:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1600&auto=format&fit=crop",
    services: ["Concept", "Vendors", "Run Sheet"],
    attendees: "120",
    budgetRange: "$$",
    gallery: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",
    ],
  },
  {
    id: 10,
    slug: "conference-expo-2024",
    title: "Innovators Conference & Expo",
    client: "Dev Nexus",
    date: "Sep 2024",
    location: "Expo Centre",
    description:
      "Keynotes across two stages, 50+ exhibitor booths, and a startup pitch arena.",
    cover:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop",
    services: ["Program", "Exhibition", "AV"],
    attendees: "2,300",
    budgetRange: "$$$$",
    gallery: [
      "https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=1600&auto=format&fit=crop",
    ],
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getRelatedProjects = (slug: string, count = 3): Project[] => {
  const current = getProjectBySlug(slug);
  if (!current) return projects.slice(0, count);
  const byOverlap = projects
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      p,
      score: p.services.filter((s) => current.services.includes(s)).length,
    }))
    .sort((a, b) => b.score - a.score);
  const related = byOverlap
    .filter((x) => x.score > 0)
    .slice(0, count)
    .map((x) => x.p);
  if (related.length < count) {
    // Fill remaining slots with most recent others
    const filler = projects
      .filter((p) => p.slug !== slug && !related.some((r) => r.slug === p.slug))
      .slice(0, count - related.length);
    return [...related, ...filler];
  }
  return related;
};
