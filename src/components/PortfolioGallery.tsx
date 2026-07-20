"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/projects";

const EVENT_TYPES = ["All", "Wedding", "Corporate", "Birthday", "Gala", "Activation", "Conference", "Social"] as const;

const TYPE_EMOJI: Record<string, string> = {
    All: "✦",
    Wedding: "💍",
    Corporate: "🏢",
    Birthday: "🎂",
    Gala: "🏆",
    Activation: "🎪",
    Conference: "🎤",
    Social: "🌸",
};

export default function PortfolioGallery() {
    const [active, setActive] = useState<string>("All");
    const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
    const [view, setView] = useState<"grid" | "masonry">("grid");
    const containerRef = useRef<HTMLDivElement>(null);

    const filtered = useMemo(() =>
        active === "All" ? projects : projects.filter((p) => p.eventType === active),
        [active]
    );

    const handleFilter = (type: string) => {
        setActive(type);
    };

    return (
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-20">
            {/* Header */}
            <div className="flex items-end justify-between mb-10">
                <div>
                    <p className="uppercase tracking-widest text-xs text-black/40 mb-2">Portfolio</p>
                    <h2 className="text-3xl md:text-5xl font-extrabold">
                        Work that speaks <br className="hidden md:block" />for itself
                    </h2>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={() => setView("grid")}
                        className={`p-2 rounded-lg border transition ${view === "grid" ? "bg-black text-white border-black" : "border-black/10 text-black/50 hover:border-black/30"}`}
                        aria-label="Grid view"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <rect x="0" y="0" width="7" height="7" rx="1.5" />
                            <rect x="9" y="0" width="7" height="7" rx="1.5" />
                            <rect x="0" y="9" width="7" height="7" rx="1.5" />
                            <rect x="9" y="9" width="7" height="7" rx="1.5" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setView("masonry")}
                        className={`p-2 rounded-lg border transition ${view === "masonry" ? "bg-black text-white border-black" : "border-black/10 text-black/50 hover:border-black/30"}`}
                        aria-label="Masonry view"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <rect x="0" y="0" width="7" height="10" rx="1.5" />
                            <rect x="9" y="0" width="7" height="6" rx="1.5" />
                            <rect x="0" y="12" width="7" height="4" rx="1.5" />
                            <rect x="9" y="8" width="7" height="8" rx="1.5" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
                {EVENT_TYPES.map((type) => (
                    <motion.button
                        key={type}
                        onClick={() => handleFilter(type)}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold border transition-all ${active === type
                            ? "bg-black text-white border-black shadow-lg"
                            : "bg-white text-black/60 border-black/10 hover:border-black/30"
                            }`}
                    >
                        <span>{TYPE_EMOJI[type]}</span>
                        <span>{type}</span>
                        {active === type && (
                            <span className="ml-1 text-xs opacity-70">
                                ({active === "All" ? projects.length : projects.filter((p) => p.eventType === type).length})
                            </span>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Gallery grid */}
            <motion.div
                ref={containerRef}
                layout
                className={`grid gap-4 ${view === "masonry"
                    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
            >
                <AnimatePresence mode="popLayout">
                    {filtered.map((project, i) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.94 }}
                            transition={{ duration: 0.3, delay: i * 0.03 }}
                            className={`group relative overflow-hidden rounded-2xl bg-black cursor-pointer ${view === "masonry" && i % 5 === 0 ? "row-span-2" : ""
                                }`}
                            style={view === "masonry" ? { aspectRatio: i % 5 === 0 ? "3/4" : "1/1" } : { aspectRatio: "4/3" }}
                            onClick={() => setLightbox({ src: project.cover, title: project.title })}
                        >
                            <Image
                                src={project.cover}
                                alt={project.title}
                                fill
                                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Hover overlay content */}
                            <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="rounded-full bg-white/20 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                                        {project.eventType}
                                    </span>
                                </div>
                                <h3 className="text-white font-extrabold text-base leading-tight">{project.title}</h3>
                                <p className="text-white/70 text-xs mt-1">{project.location} · {project.date}</p>
                                <div className="mt-3 flex gap-2">
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="rounded-full bg-white text-black text-xs font-bold px-3 py-1.5 hover:bg-gold hover:text-white transition"
                                    >
                                        View project →
                                    </Link>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setLightbox({ src: project.cover, title: project.title }); }}
                                        className="rounded-full border border-white/40 text-white text-xs font-bold px-3 py-1.5 hover:bg-white/10 transition"
                                    >
                                        Expand ⤢
                                    </button>
                                </div>
                            </div>

                            {/* Event type badge (always visible) */}
                            <div className="absolute top-3 left-3">
                                <span className="text-lg">{TYPE_EMOJI[project.eventType]}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
                <div className="text-center py-20 text-black/40">
                    No projects in this category yet.
                </div>
            )}

            {/* View all CTA */}
            <div className="text-center mt-10">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 px-6 py-3 text-sm font-semibold hover:bg-black hover:text-white transition"
                >
                    View all {projects.length} projects →
                </Link>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-label={lightbox.title}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
                        >
                            <Image
                                src={lightbox.src}
                                alt={lightbox.title}
                                width={1200}
                                height={800}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => setLightbox(null)}
                                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                                <p className="text-white font-bold">{lightbox.title}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
