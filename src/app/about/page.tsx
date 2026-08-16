import type { Metadata } from "next";
import Team from "@/components/Team";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Cta from "@/components/Cta";
import AboutHero from "@/components/AboutHero";
import MemberRewards from "@/components/MemberRewards";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aura.example";

export const metadata: Metadata = {
    title: "About Aura Events | Our Story, Mission & Team",
    description:
        "Learn the story behind Aura Events — a Lagos-based premium event planning company with 12+ years of excellence, 500+ events, and a team of passionate creators.",
    alternates: { canonical: `${SITE_URL}/about` },
    openGraph: {
        title: "About Aura Events | Our Story, Mission & Team",
        description:
            "Learn the story behind Aura Events — 12+ years of event excellence across weddings, corporate events, galas, and activations.",
        url: `${SITE_URL}/about`,
        siteName: "Aura Events",
        type: "website",
    },
};

export default function AboutPage() {
    return (
        <main>
            <AboutHero />
            <Stats />

            {/* Mission & Values */}
            <section className="page-wrap section-y" id="why">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    <div>
                        <p className="uppercase tracking-widest text-xs text-black/40 mb-4">Our philosophy</p>
                        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-8">
                            We don&apos;t just plan events — we architect emotions
                        </h2>
                        <p className="text-black/70 leading-relaxed mb-5">
                            Aura Events was founded on a single belief: that every event is a story waiting to be told. Whether it&apos;s an intimate garden bridal shower or a 2,000-person conference, we approach every brief with the same obsessive attention to detail and genuine creative passion.
                        </p>
                        <p className="text-black/70 leading-relaxed mb-5">
                            Our roots are in Lagos — one of Africa&apos;s most vibrant creative capitals — and that energy informs everything we do. We blend global production standards with local cultural intelligence to create events that feel authentic, unexpected, and unforgettable.
                        </p>
                        <p className="text-black/70 leading-relaxed">
                            We don&apos;t believe in cookie-cutter events. Every brief gets a fresh lens, every client gets our best thinking, and every guest leaves with a story to tell.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        {[
                            { icon: "🎯", title: "Mission", text: "To make extraordinary events accessible, seamless, and genuinely joyful for every client." },
                            { icon: "🌟", title: "Vision", text: "To be Africa's most loved event experiences company — known for creativity, precision, and heart." },
                            { icon: "💡", title: "Innovation", text: "We stay ahead of trends in experiential design, technology, and sustainability." },
                            { icon: "🤝", title: "Integrity", text: "Transparent pricing, honest communication, and accountability at every step." },
                        ].map((v) => (
                            <div key={v.title} className="rounded-2xl bg-white border border-black/5 shadow-sm p-6">
                                <div className="text-3xl mb-4">{v.icon}</div>
                                <h3 className="font-extrabold mb-2">{v.title}</h3>
                                <p className="text-xs text-black/60 leading-relaxed">{v.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Team />
            <MemberRewards />
            <Process />
            <Cta />
        </main>
    );
}
