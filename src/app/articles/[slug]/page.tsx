import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

const SLUG_TO_ARTICLE: Record<
  string,
  { title: string; date: string; readTime: string; body: string }
> = {
  "10-proven-tips-for-stress-free-event-planning": {
    title: "10 Proven Tips for Stress‑Free Event Planning",
    date: "Sep 2025",
    readTime: "5 min",
    body: "Your article content goes here...",
  },
  "how-to-build-a-budget-that-actually-works": {
    title: "How to Build a Budget That Actually Works",
    date: "Sep 2025",
    readTime: "6 min",
    body: "Your article content goes here...",
  },
  "creating-unforgettable-guest-experiences": {
    title: "Creating Unforgettable Guest Experiences",
    date: "Aug 2025",
    readTime: "4 min",
    body: "Your article content goes here...",
  },
  "venue-scouting-a-practical-checklist": {
    title: "Venue Scouting: A Practical Checklist",
    date: "Aug 2025",
    readTime: "7 min",
    body: "Your article content goes here...",
  },
  "the-ultimate-event-day-run-of-show": {
    title: "The Ultimate Event Day Run‑of‑Show",
    date: "Jul 2025",
    readTime: "8 min",
    body: "Your article content goes here...",
  },
  "sponsorships-pitch-package-and-price": {
    title: "Sponsorships: Pitch, Package, and Price",
    date: "Jul 2025",
    readTime: "6 min",
    body: "Your article content goes here...",
  },
};

export default function ArticlePage({ params }: Props) {
  const article = SLUG_TO_ARTICLE[params.slug];
  if (!article) return notFound();

  return (
    <main className="max-w-[800px] mx-auto px-4 md:px-6 lg:px-8 py-16">
      <p className="text-sm text-black/50">
        {article.date} • {article.readTime}
      </p>
      <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">
        {article.title}
      </h1>
      <article className="prose prose-neutral mt-6">
        <p>{article.body}</p>
      </article>
    </main>
  );
}
