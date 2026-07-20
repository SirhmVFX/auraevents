"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const tiers = [
    {
        id: "bold",
        tier: "Entry",
        spendRange: "₦50,000 – ₦500,000",
        cardLabel: "AURA",
        memberLabel: "SILVER",
        discount: "5%",
        discountSub: "OFF EVERY EVENT",
        cardBg: "bg-gradient-to-br from-neutral-700 to-neutral-800",
        chipColor: "bg-neutral-500",
        titleColor: "text-white",
        accentColor: "text-white",
        borderColor: "border-white/10",
        memberName: "SILVER MEMBER",
        description:
            "Your first step into the Aura family. Book a single event between ₦50k and ₦500k to unlock your Silver Member card and instant savings.",
        perks: ["5% off your next booking", "Early access to new event dates", "Monthly planning newsletter"],
        featured: false,
    },
    {
        id: "elite",
        tier: "Popular",
        spendRange: "₦500,000 – ₦2,000,000",
        cardLabel: "AURA",
        memberLabel: "GOLD",
        discount: "10%",
        discountSub: "OFF EVERY EVENT",
        cardBg: "bg-gradient-to-br from-neutral-600 to-neutral-700",
        chipColor: "bg-neutral-400",
        titleColor: "text-white",
        accentColor: "text-white",
        borderColor: "border-white/10",
        memberName: "GOLD MEMBER",
        description:
            "For clients who move with intention. A single booking between ₦500k and ₦2M earns you the Gold Member card and priority treatment.",
        perks: ["10% off every booking", "Priority scheduling & response", "Dedicated account manager", "Exclusive vendor discounts"],
        featured: true,
    },
    {
        id: "gold",
        tier: "Exclusive",
        spendRange: "₦2,000,000+",
        cardLabel: "AURA",
        memberLabel: "OBSIDIAN",
        discount: "15%",
        discountSub: "OFF EVERY EVENT",
        cardBg: "bg-gradient-to-br from-[#7a6520] to-[#b8920a]",
        chipColor: "bg-yellow-300",
        titleColor: "text-black",
        accentColor: "text-black",
        borderColor: "border-yellow-400/30",
        memberName: "OBSIDIAN MEMBER",
        description:
            "The pinnacle of the Aura experience. Spend ₦2M+ on a single event and join Obsidian — a lifetime tier with unmatched benefits.",
        perks: ["15% off for life", "White-glove concierge service", "First-look at new venues & vendors", "Annual appreciation dinner", "Complimentary add-ons on every event"],
        featured: false,
    },
];

// Fake card number dots
function CardDots() {
    return (
        <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((g) => (
                <span key={g} className="flex gap-0.5">
                    {[0, 1, 2, 3].map((d) => (
                        <span key={d} className="w-1 h-1 rounded-full bg-white/40 inline-block" />
                    ))}
                    {g < 3 && <span className="w-1.5" />}
                </span>
            ))}
            <span className="ml-1 text-white/50 text-[10px] tracking-widest">2025</span>
        </div>
    );
}

export default function MemberRewards() {
    return (
        <section className="bg-[#0d0d0d] text-white py-20 px-4 md:px-8">
            <div className="max-w-[1200px] mx-auto">

                {/* Header row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-end">
                    <div>
                        <div className="inline-flex items-center rounded-sm border border-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-6">
                            Member Rewards
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tight">
                            Book more.<br />Save more.
                        </h2>
                    </div>
                    <div className="lg:text-right">
                        <p className="text-white/50 text-sm leading-relaxed max-w-sm lg:ml-auto">
                            Every event you book moves you closer to a reward tier. Unlock exclusive discounts that apply automatically to every future booking.
                        </p>
                    </div>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.id}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`relative ${tier.featured ? "md:-mt-4 md:mb-4" : ""}`}
                        >
                            {/* Tier label row */}
                            <div className="flex items-center justify-between mb-3 px-1">
                                <span className="text-[10px] uppercase tracking-[0.18em] text-white/30 font-bold">
                                    {tier.tier}
                                </span>
                                <span className="text-[10px] text-white/30 font-medium">
                                    {tier.spendRange}
                                </span>
                            </div>

                            {/* The Card */}
                            <motion.div
                                whileHover={{ scale: 1.025, rotateY: 3 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                style={{ perspective: 800 }}
                                className={`relative rounded-xl overflow-hidden border ${tier.borderColor} ${tier.cardBg} p-5 h-[190px] flex flex-col justify-between shadow-2xl cursor-pointer`}
                            >
                                {/* Card top row */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${tier.titleColor} opacity-60`}>
                                            {tier.cardLabel}
                                        </p>
                                        <p className={`text-sm font-black uppercase tracking-widest ${tier.titleColor}`}>
                                            {tier.memberLabel}
                                        </p>
                                    </div>
                                    {/* Chip */}
                                    <div className={`w-8 h-6 rounded-sm ${tier.chipColor} opacity-80`} />
                                </div>

                                {/* Discount */}
                                <div>
                                    <div className={`text-5xl font-black leading-none ${tier.accentColor}`}>
                                        {tier.discount}
                                    </div>
                                    <div className={`text-[9px] font-bold tracking-[0.15em] mt-0.5 ${tier.accentColor} opacity-60`}>
                                        {tier.discountSub}
                                    </div>
                                </div>

                                {/* Card bottom row */}
                                <div className="flex items-center justify-between">
                                    <CardDots />
                                    <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${tier.titleColor} opacity-50`}>
                                        MEMBER
                                    </span>
                                </div>
                            </motion.div>

                            {/* Member name */}
                            <h3 className="mt-5 text-lg font-black uppercase tracking-wide text-white">
                                {tier.memberName}
                            </h3>

                            {/* Description */}
                            <p className="mt-2 text-sm text-white/50 leading-relaxed">
                                {tier.description}
                            </p>

                            {/* Perks list */}
                            <ul className="mt-4 space-y-1.5">
                                {tier.perks.map((perk) => (
                                    <li key={perk} className="flex items-center gap-2 text-xs text-white/40">
                                        <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                                        {perk}
                                    </li>
                                ))}
                            </ul>

                            {/* Spend row */}
                            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                                <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-bold">Spend</span>
                                <span className="text-sm font-black text-white">{tier.spendRange}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer row */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-white/10 pt-8">
                    <p className="text-xs text-white/25 max-w-sm leading-relaxed">
                        Discounts are applied automatically to your next booking once your tier is activated. Tiers are based on a single qualifying event, not cumulative spend.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-bold px-6 py-3 rounded-sm hover:bg-white hover:text-black transition-all duration-200 whitespace-nowrap"
                    >
                        START PLANNING →
                    </Link>
                </div>
            </div>
        </section>
    );
}
