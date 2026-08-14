import type { Metadata } from "next";
import EventsListing from "@/components/EventsListing";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aura.example";

export const metadata: Metadata = {
    title: "Upcoming Events | Aura Events",
    description:
        "Browse and book upcoming Aura Events — masterclasses, galas, summits, workshops, and exclusive experiences in Lagos and beyond.",
    alternates: { canonical: `${SITE_URL}/events` },
    openGraph: {
        title: "Upcoming Events | Aura Events",
        description: "Browse and book upcoming events from Nigeria's #1 event planning company.",
        url: `${SITE_URL}/events`,
        siteName: "Aura Events",
        type: "website",
    },
};

export default function EventsPage() {
    return (
        <main className="page-wrap page-y">
            <div className="flex items-end justify-between gap-6 mb-10 md:mb-12">
                <div>
                    <p className="uppercase tracking-widest text-xs text-black/40 mb-2">What&apos;s on</p>
                    <h1 className="text-3xl md:text-5xl font-extrabold">Upcoming Events</h1>
                    <p className="mt-3 text-black/60 max-w-lg leading-relaxed">
                        Masterclasses, galas, workshops, and exclusive experiences. Book your spot before they sell out.
                    </p>
                </div>
                <Link
                    href="/events/new"
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-bold hover:opacity-90 transition"
                >
                    + Submit your event
                </Link>
            </div>

            <EventsListing />
        </main>
    );
}
