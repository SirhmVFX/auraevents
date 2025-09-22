// src/lib/articles.ts
export type FAQ = { q: string; a: string };
export type Backlink = { label: string; href: string };
export type Article = {
  slug: string;
  title: string;
  keyword: string; // primary SEO keyword
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaLabel: string;
  ctaHref: string;
  paragraphs: string[]; // >= 5
  howToSteps: string[]; // step-by-step guide
  faq: FAQ[];
  backlinks: Backlink[]; // external authoritative refs
  related: string[]; // related article slugs
  date: string; // ISO date e.g., '2025-09-01'
  readTime: string; // e.g., '6 min'
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const paragraphsFor = (keyword: string): string[] => [
  `Effective ${keyword} starts with a clear objective. Define the event’s purpose, ideal attendee profile, and success metrics before drafting timelines or budgets—this keeps every decision aligned.`,
  `Budget structure comes next. Group costs into strategic buckets (venue, production, catering, marketing, staffing) and set a 10–15% contingency. Track weekly to catch variances early.`,
  `Vendor selection impacts guest experience. Prioritize reliability and alignment with your creative brief. Lock SLAs, response times, and backups, then centralize contacts for seamless execution.`,
  `Communication rhythm prevents friction. Maintain pre‑event weekly syncs, a centralized run‑of‑show, and real-time reporting during show days to surface risks and unblock teams quickly.`,
  `Post‑event analysis is where you level up. Pair qualitative feedback with quantitative KPIs—attendance, engagement, conversion—to optimize your next ${keyword} cycle with evidence.`,
  `Pro tip: Document learnings in a one‑page report within 72 hours. Summarize what worked, what didn’t, and what to repeat—your future self (and sponsors) will thank you.`,
];

const stepsFor = (keyword: string): string[] => [
  `Set SMART goals for your ${keyword} and write a simple one-line event thesis.`,
  `Draft a milestone timeline with clear owners and due dates.`,
  `Build a budget with categories, quotes, and a contingency line.`,
  `Source vendors with SLAs, scope of work, and escalation paths.`,
  `Create a detailed run‑of‑show with cues, roles, and backups.`,
  `Conduct a tech rehearsal and finalize guest comms flows.`,
  `Debrief within 72 hours and publish insights + next steps.`,
];

const faqFor = (keyword: string): FAQ[] => [
  {
    q: `What is ${keyword}?`,
    a: `${keyword} aligns your goals, audience, budget, timeline, and vendors into one execution plan designed to deliver measurable outcomes.`,
  },
  {
    q: "How far in advance should I plan?",
    a: "Small activations need 6–8 weeks. Large conferences often require 3–6 months for venue holds, speakers, and sponsorships.",
  },
  {
    q: "How do I stay on budget?",
    a: "Prioritize must‑haves, negotiate vendor bundles, and track every expense weekly against your baseline with 10–15% contingency.",
  },
];

const backlinksDefault: Backlink[] = [
  { label: "Event Industry Council", href: "https://www.eventscouncil.org/" },
  { label: "PCMA Resources", href: "https://www.pcma.org/" },
  { label: "Meeting Professionals Intl", href: "https://www.mpi.org/" },
];

type TitleSpec = [title: string, keyword: string];

const TITLES: TitleSpec[] = [
  [
    "Event Planning Basics: From Vision to Run‑of‑Show",
    "event planning basics",
  ],
  [
    "Mastering Event Budgets: Templates and Cost Control",
    "event budget planning",
  ],
  [
    "Venue Scouting Like a Pro: Contracts, Layouts, Logistics",
    "venue scouting",
  ],
  ["Building a High‑Impact Event Timeline", "event timeline"],
  ["Sponsorships that Convert: Packages and ROI", "event sponsorships"],
  [
    "Experiential Design: Crafting Memorable Guest Journeys",
    "experiential event design",
  ],
  [
    "Flawless Registration: Tickets, Badges, and Check‑In",
    "event registration best practices",
  ],
  ["AV and Tech: Sound, Lighting, and Live Streaming", "event av setup"],
  ["Marketing Your Event: Content, Social, and Email", "event marketing"],
  ["Run‑of‑Show: The Hour‑by‑Hour Playbook", "run of show"],
  [
    "Vendor Management: Contracts, SLAs, and Backups",
    "vendor management for events",
  ],
  ["Risk and Safety: Plans, Insurance, Compliance", "event risk management"],
  [
    "Catering that Delights: Menus, Dietary, and Flow",
    "event catering planning",
  ],
  ["Sustainable Events: Low‑Waste, High‑Impact", "sustainable events"],
  ["Post‑Event Success: Surveys, NPS, and Follow‑Up", "post event follow up"],
  ["Team Roles and Staffing: Volunteers to Stage Managers", "event staffing"],
  ["Hybrid Events: In‑Person Meets Virtual", "hybrid events"],
  [
    "Sponsorship Fulfillment: Deliverables and Reporting",
    "sponsorship fulfillment",
  ],
  ["B2B Conference Playbook: From CFP to Expo", "b2b conference planning"],
  [
    "Product Launch Events: Hype, Demos, and PR",
    "product launch event planning",
  ],
];

const makeArticle = (
  title: string,
  keyword: string,
  index: number
): Article => {
  const slug = slugify(title);
  const date = `2025-09-${String((index % 28) + 1).padStart(2, "0")}`;
  const readTime = `${5 + (index % 5)} min`;

  return {
    slug,
    title,
    keyword,
    metaTitle: `${title} | Aura Events`,
    metaDescription: `A complete guide to ${keyword}: strategies, templates, how‑to steps, FAQs, and proven tips to run high‑impact events.`,
    heroTitle: title,
    heroSubtitle: `Your complete guide to ${keyword} for modern events—objectives, budgets, timelines, vendors, and measurement.`,
    ctaLabel: "Get a free planning consult",
    ctaHref: "/contact?type=consult",
    paragraphs: paragraphsFor(keyword),
    howToSteps: stepsFor(keyword),
    faq: faqFor(keyword),
    backlinks: backlinksDefault,
    related: [], // filled below
    date,
    readTime,
  };
};

const articles: Article[] = TITLES.map(([t, k], i) => makeArticle(t, k, i));

// build related (next 3)
for (let i = 0; i < articles.length; i++) {
  const rel: string[] = [];
  for (let j = 1; j <= 3; j++) {
    rel.push(articles[(i + j) % articles.length].slug);
  }
  articles[i].related = rel;
}

export default articles;
