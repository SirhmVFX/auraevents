"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function Articles() {
  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  const articles = [
    {
      id: 1,
      title: "10 Proven Tips for Stress‑Free Event Planning",
      excerpt:
        "From timelines to vendor coordination, learn the secrets to delivering seamless events every time.",
      tag: "Planning",
      readTime: "5 min",
      date: "Sep 2025",
      views: "1.2k",
    },
    {
      id: 2,
      title: "How to Build a Budget That Actually Works",
      excerpt:
        "Smart allocation, hidden costs to watch, and practical templates to keep your spend on track.",
      tag: "Budgeting",
      readTime: "6 min",
      date: "Sep 2025",
      views: "980",
    },
    {
      id: 3,
      title: "Creating Unforgettable Guest Experiences",
      excerpt:
        "Design touchpoints that wow—from invites to post‑event follow‑ups—using experience mapping.",
      tag: "Experience",
      readTime: "4 min",
      date: "Aug 2025",
      views: "2.3k",
    },
    {
      id: 4,
      title: "Venue Scouting: A Practical Checklist",
      excerpt:
        "Capacity, logistics, lighting, and permits—everything to evaluate before you sign.",
      tag: "Venues",
      readTime: "7 min",
      date: "Aug 2025",
      views: "1.1k",
    },
    {
      id: 5,
      title: "The Ultimate Event Day Run‑of‑Show",
      excerpt:
        "Minute‑by‑minute coordination tips so your crew knows exactly what happens and when.",
      tag: "Operations",
      readTime: "8 min",
      date: "Jul 2025",
      views: "1.9k",
    },
    {
      id: 6,
      title: "Sponsorships: Pitch, Package, and Price",
      excerpt:
        "Grow revenue by crafting irresistible sponsor assets and measuring ROI that matters.",
      tag: "Sponsorships",
      readTime: "6 min",
      date: "Jul 2025",
      views: "743",
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="uppercase tracking-widest text-sm text-black/50">
            Insights
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold">Articles</h2>
        </div>
        <Link
          href="#"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm hover:opacity-90 transition"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a, i) => (
          <motion.article
            key={a.id}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-orange-200/5 bg-white/70 backdrop-blur shadow-sm hover:shadow-xl transition-shadow"
          >
            {/** Full-card clickable overlay */}
            <Link
              href={`/articles/${slugify(a.title)}`}
              className="absolute inset-0 z-10"
              aria-label={`Read: ${a.title}`}
            />
            {/* Decorative gradient background */}
            <div className="pointer-events-none absolute -top-32 -right-20 h-56 w-56 rounded-full bg-gradient-to-tr from-pink-200/50 to-orange-200/50 blur-2xl group-hover:scale-110 transition-transform" />

            <div className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/70">
                  {a.tag}
                </span>
                <span className="text-xs text-black/40">• {a.readTime}</span>
                <span className="text-xs text-black/40">• {a.date}</span>
                <span className="text-xs text-black/40">• {a.views} views</span>
              </div>

              <h3 className="text-lg md:text-xl font-bold leading-snug">
                <Link
                  href={`/articles/${slugify(a.title)}`}
                  className="hover:underline decoration-2 underline-offset-4"
                >
                  {a.title}
                </Link>
              </h3>

              <p className="mt-2 text-sm text-black/70">{a.excerpt}</p>

              <div className="mt-5 flex items-center justify-between">
                <Link
                  href={`/articles/${slugify(a.title)}`}
                  className="text-sm font-semibold text-black group/btn inline-flex items-center gap-2"
                >
                  Read article
                  <motion.span
                    aria-hidden
                    whileHover={{ x: 3 }}
                    className="inline-block translate-x-0 transition-transform"
                  >
                    →
                  </motion.span>
                </Link>

                <div className="flex -space-x-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-xs">
                    EP
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-black text-xs">
                    UX
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Articles;
