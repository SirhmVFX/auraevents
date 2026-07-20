import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { events, getEventBySlug } from "@/lib/events";
import EventBookingWidget from "@/components/EventBookingWidget";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aura.example";

export function generateStaticParams() {
    return events.map((e) => ({ slug: e.slug }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateMetadata({ params }: any): Metadata {
    const event = getEventBySlug(params.slug);
    if (!event) return {};
    return {
        title: `${event.title} | Aura Events`,
        description: event.description,
        alternates: { canonical: `${SITE_URL}/events/${event.slug}` },
        openGraph: {
            title: `${event.title} | Aura Events`,
            description: event.description,
            images: [{ url: event.cover, width: 1200, height: 630, alt: event.title }],
            url: `${SITE_URL}/events/${event.slug}`,
            siteName: "Aura Events",
            type: "website",
        },
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EventDetailPage({ params }: any) {
    const event = getEventBySlug(params.slug);
    if (!event) return notFound();

    const soldOut = event.status === "sold-out" || event.spotsLeft === 0;
    const urgency = !soldOut && event.spotsLeft <= 20;
    const fillPercent = Math.round(((event.capacity - event.spotsLeft) / event.capacity) * 100);

    return (
        <main className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-12">
            {/* Back link */}
            <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition mb-6"
            >
                ← All events
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main content */}
                <div className="lg:col-span-2">
                    {/* Hero image */}
                    <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden mb-8">
                        <Image
                            src={event.cover}
                            alt={event.title}
                            fill
                            priority
                            className="object-cover"
                            sizes="(min-width:1024px) 66vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <span className="rounded-full bg-white/90 text-black text-xs font-bold px-3 py-1.5">
                                {event.category}
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                        {event.title}
                    </h1>

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-4 text-sm text-black/60 mb-6">
                        <span className="flex items-center gap-1.5">📅 {event.displayDate}</span>
                        <span className="flex items-center gap-1.5">⏰ {event.time}</span>
                        <span className="flex items-center gap-1.5">📍 {event.venue}, {event.location}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {event.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/60">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="prose prose-neutral max-w-none">
                        <h2 className="text-xl font-extrabold mb-3">About this event</h2>
                        <p className="text-black/70 leading-relaxed text-base">{event.description}</p>

                        <h2 className="text-xl font-extrabold mt-8 mb-3">What to expect</h2>
                        <ul className="space-y-2 text-black/70">
                            <li>✦ World-class programming curated by the Aura Events team</li>
                            <li>✦ Premium venue with exceptional hospitality</li>
                            <li>✦ Networking opportunities with industry professionals</li>
                            <li>✦ Catering and refreshments included</li>
                            <li>✦ Event materials & digital resources provided</li>
                            <li>✦ Photography and content creation opportunities</li>
                        </ul>

                        <h2 className="text-xl font-extrabold mt-8 mb-3">Venue & Directions</h2>
                        <p className="text-black/70">
                            <strong>{event.venue}</strong><br />
                            {event.location}<br />
                            Detailed directions and parking information will be sent in your booking confirmation.
                        </p>
                    </div>

                    {/* Capacity bar */}
                    <div className="mt-8 rounded-2xl border border-black/5 bg-white p-5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold">
                                {soldOut ? "This event is sold out" : `${event.capacity - event.spotsLeft} of ${event.capacity} spots filled`}
                            </span>
                            {urgency && (
                                <span className="text-xs font-bold text-gold">
                                    ⚡ Only {event.spotsLeft} left!
                                </span>
                            )}
                        </div>
                        <div className="h-2 rounded-full bg-black/5 overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${soldOut ? "bg-red-400" : urgency ? "bg-gold-light" : "bg-black"}`}
                                style={{ width: `${soldOut ? 100 : fillPercent}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Booking widget */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-24">
                        <EventBookingWidget event={event} />
                    </div>
                </aside>
            </div>
        </main>
    );
}
