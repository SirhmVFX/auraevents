// src/app/articles/page.tsx
import type { Metadata } from "next";
import articles from "@/lib/articles";
import ArticlesIndex from "@/components/ArticlesIndex";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aura.example";

export const metadata: Metadata = {
  title: "Event Planning Articles | Aura Events",
  description:
    "Guides and playbooks for event planning: budgets, timelines, venues, sponsorships, hybrid events, and more.",
  alternates: { canonical: `${SITE_URL}/articles` },
  openGraph: {
    title: "Event Planning Articles | Aura Events",
    description:
      "Guides and playbooks for event planning: budgets, timelines, venues, sponsorships, hybrid events, and more.",
    url: `${SITE_URL}/articles`,
    siteName: "Aura Events",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Planning Articles | Aura Events",
    description:
      "Guides and playbooks for event planning: budgets, timelines, venues, sponsorships, hybrid events, and more.",
  },
};

export default function ArticlesIndexPage() {
  return (
    <main className="max-w-[1100px] mx-auto px-4 md:px-6 lg:px-8 py-16">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">Articles</h1>
        <p className="mt-2 text-black/70">
          Expert resources to plan, launch, and optimize high‑impact events.
        </p>
      </header>
      <ArticlesIndex articles={articles} />
    </main>
  );
}
