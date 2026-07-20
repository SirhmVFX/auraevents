"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { events } from "@/lib/events";

const categories = ["All", "Wedding", "Corporate", "Gala", "Activation", "Private", "Hybrid"];

export default function EventsListing() {
    const [filter, setFilter] = useState("All");
    const [showPast, setShowPast] = useState(false);

    const filtered = useMemo(() => {
        return events.filter((e) => {
            const matchesCat = filter === "All" || e.category === filter;
            const matchesStatus = showPast ? true : e.status !== "past";
            return matchesCat && matchesStatus;
        });
    }, [filter, showPast]);

    const featured = filtered.filter((e) => e.featured);
    const rest = filtered.filter((e) => !e.featured);

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
                {categories.map((c) => (
                    <button
                        key={c}
                        onClick={() => setFilter(c)}
                        className={`rounded-full px-4 py-1.5 text-sm font-semibold border transition ${filter === c
                                ? "bg-black text-white border-black"
                                : "bg-white text-black/70 border-black/10 hover:border-black/30"
                            }`}
                    >
                        {c}
                    </button>
                ))}
                <label className="ml-auto flex items-center gap-2 text-sm text-black/60 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showPast}
                        onChange={(e) => setShowPast(e.target.checked)}
                        className="rounded"
                    />
                    Show past events
                </label>
            </div>

            {/* Featured Events */}
            {featured.length > 0 && (
                <div className="mb-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">✨ Featured</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featured.map((event, i) => (
                            <EventCard key={event.id} event={event} index={i} isFeatured />
                        ))}
                    </div>
                </div>
            )}

            {/* All Events */}
            {rest.length > 0 && (
                <div>
                    {featured.length > 0 && (
                        <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">All events</p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rest.map((event, i) => (
                            <EventCard key={event.id} event={event} index={i} />
                        ))}
                    </div>
                </div>
            )}

            {filtered.length === 0 && (
                <div className="text-center py-20 text-black/50">
                    No events match the current filters.
                </div>
            )}
        </div>
    );
}

function EventCard({
    event,
    index,
    isFeatured = false,
}: {
    event: (typeof events)[0];
    index: number;
    isFeatured?: boolean;
}) {
    const urgency = event.spotsLeft > 0 && event.spotsLeft <= 20;
    const soldOut = event.status === "sold-out" || event.spotsLeft === 0;

    return (
        <motion.article
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`group rounded-3xl overflow-hidden bg-white border shadow-sm hover:shadow-xl transition-shadow ${isFeatured ? "border-orange-200" : "border-black/5"
                }`}
        >
            <Link href={`/events/${event.slug}`} className="block">
                {/* Cover */}
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={event.cover}
                        alt={event.title}
                        fill
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm ${soldOut ? "bg-red-500/80" : "bg-black/50"
                            }`}>
                            {soldOut ? "Sold Out" : event.category}
                        </span>
                        {isFeatured && !soldOut && (
                            <span className="rounded-full bg-orange-500/90 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-white">
                                Featured
                            </span>
                        )}
                    </div>

                    {/* Date badge */}
                    <div className="absolute bottom-3 right-3 rounded-xl bg-white/90 backdrop-blur px-3 py-1.5 text-center">
                        <p className="text-[10px] font-bold uppercase text-black/50 leading-none">
                            {event.displayDate.split(" ")[0]}
                        </p>
                        <p className="text-lg font-extrabold text-black leading-none">
                            {event.displayDate.split(" ")[1].replace(",", "")}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h2 className="font-extrabold text-lg leading-snug mb-2 group-hover:text-orange-600 transition-colors">
                        {event.title}
                    </h2>
                    <p className="text-sm text-black/60 line-clamp-2 mb-4">{event.description}</p>

                    <div className="flex items-center gap-2 text-xs text-black/50 mb-4">
                        <span>📍 {event.venue}</span>
                        <span>·</span>
                        <span>⏰ {event.time}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-extrabold text-lg">{event.price}</p>
                            {!soldOut && (
                                <p className={`text-xs ${urgency ? "text-orange-500 font-bold" : "text-black/50"}`}>
                                    {urgency ? `⚡ Only ${event.spotsLeft} spots left!` : `${event.spotsLeft} of ${event.capacity} spots`}
                                </p>
                            )}
                        </div>
                        <div className={`rounded-full px-4 py-2 text-xs font-bold transition ${soldOut
                                ? "bg-black/10 text-black/40 cursor-not-allowed"
                                : "bg-black text-white group-hover:bg-orange-500"
                            }`}>
                            {soldOut ? "Waitlist" : "Book now →"}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
