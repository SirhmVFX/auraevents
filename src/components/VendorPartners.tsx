"use client";

import { motion } from "framer-motion";

const partners = [
    { name: "Eko Hotel", category: "Venue", initials: "EK", color: "bg-stone-100" },
    { name: "The Wheatbaker", category: "Venue", initials: "WB", color: "bg-amber-100" },
    { name: "Civic Centre Lagos", category: "Venue", initials: "CC", color: "bg-blue-100" },
    { name: "Landmark Centre", category: "Venue", initials: "LC", color: "bg-teal-100" },
    { name: "Binta Photo", category: "Photography", initials: "BP", color: "bg-pink-100" },
    { name: "Lens & Light Co.", category: "Photography", initials: "LL", color: "bg-purple-100" },
    { name: "Golden Fork", category: "Catering", initials: "GF", color: "bg-yellow-100" },
    { name: "Nourish Lagos", category: "Catering", initials: "NL", color: "bg-green-100" },
    { name: "Bloom Florals", category: "Florals", initials: "BF", color: "bg-rose-100" },
    { name: "Studio AV Pro", category: "AV & Tech", initials: "SA", color: "bg-indigo-100" },
    { name: "SoundWave NG", category: "Entertainment", initials: "SW", color: "bg-violet-100" },
    { name: "Decor By Amaka", category: "Décor", initials: "DA", color: "bg-gold-pale" },
];

// Duplicate for seamless infinite scroll
const row1 = [...partners.slice(0, 6), ...partners.slice(0, 6)];
const row2 = [...partners.slice(6), ...partners.slice(6)];

function PartnerCard({ p }: { p: typeof partners[0] }) {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-5 py-3.5 shadow-sm shrink-0">
            <div className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center text-sm font-extrabold text-black/60`}>
                {p.initials}
            </div>
            <div>
                <p className="text-sm font-bold whitespace-nowrap">{p.name}</p>
                <p className="text-[10px] text-black/40">{p.category}</p>
            </div>
        </div>
    );
}

export default function VendorPartners() {
    return (
        <section className="py-20 overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 mb-10 text-center">
                <p className="uppercase tracking-widest text-xs text-black/40 mb-2">Trusted partners</p>
                <h2 className="text-3xl md:text-4xl font-extrabold">
                    Connected to Lagos&apos;s finest
                </h2>
                <p className="mt-3 text-sm text-black/50 max-w-lg mx-auto">
                    We&apos;ve spent 12+ years building relationships with the best venues, caterers, photographers, and specialists — so you get access to a curated network, not a random vendor list.
                </p>
            </div>

            {/* Row 1 — scrolls left */}
            <div className="relative mb-4">
                <div className="flex gap-3 animate-[scroll-left_30s_linear_infinite]" style={{ width: "max-content" }}>
                    {row1.map((p, i) => <PartnerCard key={`r1-${i}`} p={p} />)}
                </div>
                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
            </div>

            {/* Row 2 — scrolls right */}
            <div className="relative">
                <div className="flex gap-3 animate-[scroll-right_35s_linear_infinite]" style={{ width: "max-content" }}>
                    {row2.map((p, i) => <PartnerCard key={`r2-${i}`} p={p} />)}
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
            </div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-center mt-10"
            >
                <p className="text-sm text-black/40">
                    Are you a vendor? {" "}
                    <a href="mailto:partners@aura.com" className="underline text-black/70 hover:text-black transition">
                        Apply to join our network →
                    </a>
                </p>
            </motion.div>
        </section>
    );
}
