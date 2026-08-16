"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { useMemo, useState } from "react";
import BeforeAfter from "@/components/BeforeAfter";

const EVENT_TYPES = ["All", "Wedding", "Corporate", "Birthday", "Gala", "Activation", "Conference", "Social"];

const TYPE_EMOJI: Record<string, string> = {
  All: "✦", Wedding: "💍", Corporate: "🏢", Birthday: "🎂",
  Gala: "🏆", Activation: "🎪", Conference: "🎤", Social: "🌸",
};

export default function Projects() {
  const [query, setQuery] = useState("");
  const [eventType, setEventType] = useState("All");
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [visible, setVisible] = useState(6);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const allServices = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.services.forEach((x) => s.add(x)));
    return Array.from(s).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesQuery = !q || [p.title, p.client, p.location, p.description].join(" ").toLowerCase().includes(q);
      const matchesType = eventType === "All" || p.eventType === eventType;
      const matchesServices = selectedServices.size === 0 || p.services.some((s) => selectedServices.has(s));
      return matchesQuery && matchesType && matchesServices;
    });
  }, [query, eventType, selectedServices]);

  const shown = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  const toggleService = (s: string) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s); else next.add(s);
      return next;
    });
    setVisible(6);
  };

  const clearFilters = () => {
    setSelectedServices(new Set());
    setQuery("");
    setEventType("All");
    setVisible(6);
  };

  return (
    <>
    <section className="page-wrap page-y">
      {/* Header */}
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-12">
        <div>
          <p className="uppercase tracking-widest text-xs text-black/40 mb-2">Portfolio</p>
          <h1 className="text-3xl md:text-5xl font-extrabold">Past Projects</h1>
          <p className="mt-3 text-black/50 text-sm max-w-lg leading-relaxed">
            {projects.length} events executed across weddings, corporate, birthdays, galas, and activations.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg border transition ${viewMode === "grid" ? "bg-black text-white border-black" : "border-black/10 text-black/50 hover:border-black/30"}`} aria-label="Grid view">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="7" height="7" rx="1.5" /><rect x="9" y="0" width="7" height="7" rx="1.5" /><rect x="0" y="9" width="7" height="7" rx="1.5" /><rect x="9" y="9" width="7" height="7" rx="1.5" /></svg>
          </button>
          <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg border transition ${viewMode === "list" ? "bg-black text-white border-black" : "border-black/10 text-black/50 hover:border-black/30"}`} aria-label="List view">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="0" y="0" width="16" height="3" rx="1.5" /><rect x="0" y="6.5" width="16" height="3" rx="1.5" /><rect x="0" y="13" width="16" height="3" rx="1.5" /></svg>
          </button>
        </div>
      </div>

      {/* Event type filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {EVENT_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => { setEventType(type); setVisible(6); }}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold border transition-all ${eventType === type ? "bg-black text-white border-black" : "bg-white text-black/60 border-black/10 hover:border-black/30"
              }`}
          >
            <span>{TYPE_EMOJI[type]}</span>
            <span>{type}</span>
          </button>
        ))}
      </div>

      {/* Search + service filters */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5">
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setVisible(6); }}
            placeholder="Search title, client, location..."
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs text-black/60">Filter by services</label>
            <button onClick={clearFilters} className="text-xs text-black/60 hover:text-black underline">Clear all</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {allServices.map((s) => {
              const active = selectedServices.has(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleService(s)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition border ${active ? "bg-black text-white border-black" : "bg-white text-black/70 border-black/10 hover:border-black/30"
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
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-black/60">
          Showing <span className="font-semibold text-black">{shown.length}</span> of {filtered.length}
        </p>
      </div>

      {/* Grid view */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                    <div className="absolute inset-0 translate-y-1 rounded-2xl bg-amber-300 shadow-md ring-1 ring-black/5" />
                    <div className="absolute -top-2 left-6 h-6 w-24 rounded-t-md bg-amber-200 ring-1 ring-black/10" />
                    <div className="absolute inset-x-1 bottom-1 top-6 rounded-2xl bg-amber-400 shadow-xl ring-1 ring-black/5 group-hover:-translate-y-0.5 transition-transform">
                      <div className="absolute inset-x-4 top-3 h-24 rounded-xl bg-white/90 ring-1 ring-black/5 overflow-hidden">
                        <Image src={p.cover} alt={p.title} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" priority={i < 3} />
                      </div>
                      <div className="absolute left-4 right-4 bottom-3 flex items-center justify-between">
                        <h2 className="text-sm md:text-base font-bold text-black/80 line-clamp-1">{p.title}</h2>
                        <span className="text-[10px] md:text-xs text-black/60 whitespace-nowrap ml-2">{p.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{TYPE_EMOJI[p.eventType]}</span>
                      <span className="text-xs font-semibold text-black/50">{p.eventType}</span>
                    </div>
                    <p className="text-sm text-black/60 line-clamp-1">{p.location}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.services.slice(0, 3).map((s) => (
                        <span key={s} className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/70">{s}</span>
                      ))}
                      {p.services.length > 3 && <span className="text-xs text-black/40">+{p.services.length - 3} more</span>}
                    </div>
                  </div>

                  {/* Testimonial preview if exists */}
                  {p.testimonial && (
                    <div className="mt-3 rounded-xl bg-gold-pale border border-gold/20 px-3 py-2">
                      <p className="text-xs text-black/60 line-clamp-2 italic">&ldquo;{p.testimonial.text}&rdquo;</p>
                      <p className="text-[10px] font-bold text-gold mt-1">— {p.testimonial.name}</p>
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-semibold">Open folder</span>
                    <motion.span aria-hidden className="inline-block" whileHover={{ x: 3 }}>→</motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* List view */}
      {viewMode === "list" && (
        <div className="flex flex-col gap-4">
          {shown.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <Link href={`/projects/${p.slug}`} className="flex items-center gap-5 rounded-2xl border border-black/5 bg-white p-4 hover:shadow-md transition group">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={p.cover} alt={p.title} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{TYPE_EMOJI[p.eventType]}</span>
                    <span className="text-xs text-black/40">{p.eventType}</span>
                    <span className="text-black/20">·</span>
                    <span className="text-xs text-black/40">{p.date}</span>
                  </div>
                  <h2 className="font-extrabold text-base group-hover:text-gold transition">{p.title}</h2>
                  <p className="text-sm text-black/50 mt-0.5">{p.client} · {p.location}</p>
                </div>
                <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                  {p.services.slice(0, 2).map((s) => (
                    <span key={s} className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/60">{s}</span>
                  ))}
                  <span className="text-black/30 group-hover:text-black transition ml-2">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {canLoadMore && (
        <div className="flex justify-center mt-12">
          <button onClick={() => setVisible((v) => v + 6)} className="px-5 py-2 rounded-full bg-black text-white text-sm hover:opacity-90 transition">
            Load more ({filtered.length - visible} remaining)
          </button>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-10 text-center text-black/60 py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="font-bold mb-2">No projects match your filters.</p>
          <button onClick={clearFilters} className="text-sm underline hover:text-black transition">Clear all filters</button>
        </div>
      )}
    </section>
    <BeforeAfter />
    </>
  );
}
