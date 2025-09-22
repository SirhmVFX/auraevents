"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Article } from "@/lib/articles";

function getCategory(a: Article): string {
  const key = `${a.title} ${a.keyword}`.toLowerCase();
  if (key.includes("budget")) return "Budgeting";
  if (key.includes("venue")) return "Venues";
  if (key.includes("sponsor")) return "Sponsorships";
  if (key.includes("timeline")) return "Planning";
  if (key.includes("registration")) return "Registration";
  if (key.includes("av") || key.includes("tech")) return "AV & Tech";
  if (key.includes("marketing")) return "Marketing";
  if (
    key.includes("run of show") ||
    key.includes("run‑of‑show") ||
    key.includes("playbook")
  )
    return "Operations";
  if (key.includes("vendor")) return "Vendors";
  if (key.includes("risk") || key.includes("safety")) return "Risk";
  if (key.includes("catering")) return "Catering";
  if (key.includes("sustainable") || key.includes("sustain"))
    return "Sustainability";
  if (key.includes("post") || key.includes("follow")) return "Post‑Event";
  if (key.includes("staff") || key.includes("team")) return "Staffing";
  if (key.includes("hybrid")) return "Hybrid";
  if (key.includes("conference")) return "Conferences";
  if (key.includes("product launch")) return "Product Launch";
  return "Planning";
}

export default function ArticlesIndex({ articles }: { articles: Article[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    for (const a of articles) set.add(getCategory(a));
    return Array.from(set).sort((a, b) =>
      a === "All" ? -1 : a.localeCompare(b)
    );
  }, [articles]);

  const filtered = useMemo(() => {
    const ql = q.toLowerCase().trim();
    return articles.filter((a) => {
      const matchesSearch =
        !ql || `${a.title} ${a.metaDescription}`.toLowerCase().includes(ql);
      const c = getCategory(a);
      const matchesCat = cat === "All" || c === cat;
      return matchesSearch && matchesCat;
    });
  }, [articles, q, cat]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
        <div className="flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-full border border-black/10 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-sm border transition ${
                cat === c
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black/10 hover:border-black/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((a) => (
          <li
            key={a.slug}
            className="rounded-2xl border border-black/5 bg-white/70 backdrop-blur p-5 hover:shadow-md transition-shadow"
          >
            <p className="text-xs text-black/50">
              {new Date(a.date).toLocaleDateString()} • {a.readTime}
            </p>
            <h2 className="mt-1 text-lg font-bold">
              <Link className="hover:underline" href={`/articles/${a.slug}`}>
                {a.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-black/70 line-clamp-3">
              {a.metaDescription}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-black/50">{getCategory(a)}</span>
              <Link
                className="inline-flex items-center gap-1 text-sm font-semibold hover:underline"
                href={`/articles/${a.slug}`}
              >
                Read article →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
