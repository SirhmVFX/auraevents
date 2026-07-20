"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
    {
        icon: "💍",
        title: "Weddings & Social",
        description:
            "Bespoke ceremonies, receptions, bridal showers, and milestone celebrations crafted around your unique love story.",
        features: ["Full planning & coordination", "Floral & décor design", "Vendor management", "Day-of execution"],
        href: "/services#weddings",
        accent: "from-pink-500 to-rose-500",
        bg: "bg-pink-50",
    },
    {
        icon: "🏢",
        title: "Corporate Events",
        description:
            "Conferences, product launches, retreats, and galas that elevate your brand and engage your stakeholders.",
        features: ["Stage & AV production", "Program design", "Sponsor activation", "Press coordination"],
        href: "/services#corporate",
        accent: "from-blue-500 to-indigo-600",
        bg: "bg-blue-50",
    },
    {
        icon: "🎪",
        title: "Experiential & Pop-ups",
        description:
            "Immersive activations, brand pop-ups, and live experiences that turn audiences into brand advocates.",
        features: ["Concept development", "Experiential design", "Influencer integration", "ROI measurement"],
        href: "/services#experiential",
        accent: "from-purple-500 to-violet-600",
        bg: "bg-purple-50",
    },
    {
        icon: "🌐",
        title: "Hybrid & Virtual",
        description:
            "Seamless in-person + digital events that connect global audiences with professional-grade streaming and interaction.",
        features: ["Live streaming setup", "Virtual attendee experience", "Tech rehearsals", "On-demand recording"],
        href: "/services#hybrid",
        accent: "from-teal-500 to-cyan-600",
        bg: "bg-teal-50",
    },
    {
        icon: "🏆",
        title: "Awards & Galas",
        description:
            "Black-tie evenings, recognition ceremonies, and fundraising galas with cinematic production value.",
        features: ["Red carpet logistics", "LED staging", "Choreographed walk-ups", "Silent auctions"],
        href: "/services#galas",
        accent: "from-[#7a6520] to-[#b8920a]",
        bg: "bg-gold-pale",
    },
    {
        icon: "🎈",
        title: "Private Celebrations",
        description:
            "Birthdays, anniversaries, baby showers, and private soirées curated with personality and flair.",
        features: ["Theme conceptualization", "Custom installations", "Entertainment booking", "Catering curation"],
        href: "/services#private",
        accent: "from-green-500 to-emerald-600",
        bg: "bg-green-50",
    },
];

export default function ServicesGrid() {
    return (
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-20">
            <div className="flex items-end justify-between mb-12">
                <div>
                    <p className="uppercase tracking-widest text-xs text-black/40 mb-2">What we do</p>
                    <h2 className="text-3xl md:text-5xl font-extrabold">
                        Every event type, <br className="hidden md:block" />
                        expertly handled
                    </h2>
                </div>
                <Link
                    href="/services"
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm hover:opacity-90 transition"
                >
                    All services →
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((s, i) => (
                    <motion.div
                        key={s.title}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        className={`group rounded-3xl ${s.bg} border border-black/5 p-6 flex flex-col gap-4 cursor-pointer`}
                    >
                        <Link href={s.href} className="flex flex-col gap-4 flex-1">
                            <div
                                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.accent} flex items-center justify-center text-2xl shadow-lg`}
                            >
                                {s.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold mb-2">{s.title}</h3>
                                <p className="text-sm text-black/60 leading-relaxed">{s.description}</p>
                            </div>
                            <ul className="flex flex-col gap-1.5 mt-auto">
                                {s.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-xs text-black/70">
                                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${s.accent} flex-shrink-0`} />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-center gap-2 text-sm font-bold mt-2 group-hover:gap-3 transition-all">
                                Learn more <span>→</span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
