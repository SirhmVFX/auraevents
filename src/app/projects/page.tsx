"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { useMemo, useState } from "react";

export default function Projects() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [visible, setVisible] = useState(6);

  const allServices = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.services.forEach((x) => s.add(x)));
    return Array.from(s).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const hasQuery = q.length > 0;
    const hasFilters = selected.size > 0;

    return projects.filter((p) => {
      const matchesQuery = !hasQuery
        ? true
        : [p.title, p.client, p.location, p.description]
            .join(" ")
            .toLowerCase()
            .includes(q);
      const matchesFilters = !hasFilters
        ? true
        : p.services.some((s) => selected.has(s));
      return matchesQuery && matchesFilters;
    });
  }, [query, selected]);

  const shown = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  const toggleService = (s: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
    setVisible(6); // reset pagination on filter change
  };

  const clearFilters = () => {
    setSelected(new Set());
    setQuery("");
    setVisible(6);
  };

  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="uppercase tracking-widest text-sm text-black/50">
            Portfolio
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold">Past Projects</h1>
        </div>
        <p className="hidden md:block text-sm text-black/50">
          {projects.length} projects
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-12 gap-3">
        <div className="lg:col-span-5">
          <label className="block text-xs text-black/60 mb-1">Search</label>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(6);
            }}
            placeholder="Search title, client, location..."
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs text-black/60">
              Filter by services
            </label>
            <button
              onClick={clearFilters}
              className="text-xs text-black/60 hover:text-black underline"
            >
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {allServices.map((s) => {
              const active = selected.has(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleService(s)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition border ${
                    active
                      ? "bg-black text-white border-black"
                      : "bg-white text-black/70 border-black/10 hover:border-black/30"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-black/60">
          Showing{" "}
          <span className="font-semibold text-black">{shown.length}</span> of{" "}
          {filtered.length}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shown.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: i * 0.03 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl bg-transparent"
          >
            <Link href={`/projects/${p.slug}`} className="block">
              <div className="p-4">
                {/* Folder visual */}
                <div className="relative h-44">
                  {/* Back cover */}
                  <div className="absolute inset-0 translate-y-1 rounded-2xl bg-amber-300 shadow-md ring-1 ring-black/5" />
                  {/* Tab */}
                  <div className="absolute -top-2 left-6 h-6 w-24 rounded-t-md bg-amber-200 ring-1 ring-black/10" />
                  {/* Front cover */}
                  <div className="absolute inset-x-1 bottom-1 top-6 rounded-2xl bg-amber-400 shadow-xl ring-1 ring-black/5 group-hover:-translate-y-0.5 transition-transform">
                    {/* Paper/document peek with image */}
                    <div className="absolute inset-x-4 top-3 h-24 rounded-xl bg-white/90 ring-1 ring-black/5 overflow-hidden">
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover"
                        priority={i < 3}
                      />
                    </div>
                    {/* Title strip on the folder front */}
                    <div className="absolute left-4 right-4 bottom-3 flex items-center justify-between">
                      <h2 className="text-sm md:text-base font-bold text-black/80 line-clamp-1">
                        {p.title}
                      </h2>
                      <span className="text-[10px] md:text-xs text-black/60 whitespace-nowrap ml-2">
                        {p.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Meta under the folder */}
                <div className="mt-4">
                  <p className="text-sm text-black/60 line-clamp-1">
                    {p.location}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.services.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/70"
                      >
                        {s}
                      </span>
                    ))}
                    {p.services.length > 3 && (
                      <span className="text-xs text-black/40">
                        +{p.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA row */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Open folder</span>
                  <motion.span
                    aria-hidden
                    className="inline-block"
                    whileHover={{ x: 3 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {canLoadMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setVisible((v) => v + 6)}
            className="px-5 py-2 rounded-full bg-black text-white text-sm hover:opacity-90 transition"
          >
            Load more
          </button>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-10 text-center text-black/60">
          No projects match your search or filters.
        </div>
      )}
    </section>
  );
}
