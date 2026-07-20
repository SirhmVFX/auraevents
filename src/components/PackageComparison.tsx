"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const features = [
    {
        category: "Planning", items: [
            { label: "Initial consultation", essential: true, signature: true, prestige: true },
            { label: "Planning sessions", essential: "1×", signature: "Unlimited", prestige: "Unlimited + weekly check-ins" },
            { label: "Dedicated event manager", essential: false, signature: true, prestige: "Senior planner + backup" },
            { label: "24/7 WhatsApp access", essential: false, signature: true, prestige: true },
            { label: "Site visits", essential: "1×", signature: "3×", prestige: "Unlimited" },
        ]
    },
    {
        category: "Production", items: [
            { label: "Run-of-show document", essential: true, signature: true, prestige: true },
            { label: "Vendor sourcing", essential: "Recommendations", signature: "Full management", prestige: "Curated premium vendors" },
            { label: "AV & stage coordination", essential: false, signature: true, prestige: true },
            { label: "Day-of execution team", essential: "1 coordinator", signature: "Full team (5+)", prestige: "Full team (10+)" },
            { label: "Tech rehearsal", essential: false, signature: true, prestige: true },
        ]
    },
    {
        category: "Design & Décor", items: [
            { label: "Mood board creation", essential: false, signature: true, prestige: "Bespoke concept deck" },
            { label: "Décor concept", essential: false, signature: true, prestige: "Custom installation design" },
            { label: "Floral design", essential: false, signature: "Standard", prestige: "Bespoke signature florals" },
            { label: "Lighting design", essential: false, signature: true, prestige: "Full lighting production" },
        ]
    },
    {
        category: "Post-Event", items: [
            { label: "Post-event report", essential: "Basic summary", signature: "Full impact report", prestige: "Comprehensive + media package" },
            { label: "Guest feedback collection", essential: false, signature: true, prestige: true },
            { label: "Budget reconciliation", essential: false, signature: true, prestige: true },
        ]
    },
];

type PlanValue = true | false | string;

function Cell({ value, plan }: { value: PlanValue; plan: string }) {
    const isHighlighted = plan === "signature";
    if (value === false) {
        return <span className={`text-sm ${isHighlighted ? "text-white/30" : "text-black/20"}`}>—</span>;
    }
    if (value === true) {
        return (
            <span className={`inline-flex w-6 h-6 rounded-full items-center justify-center text-xs font-bold ${isHighlighted ? "bg-gold text-white" : "bg-black/10 text-black"
                }`}>✓</span>
        );
    }
    return <span className={`text-xs font-semibold ${isHighlighted ? "text-white/80" : "text-black/70"}`}>{value}</span>;
}

export default function PackageComparison() {
    const [mobileTab, setMobileTab] = useState<"essential" | "signature" | "prestige">("signature");

    const plans: {
        key: "essential" | "signature" | "prestige";
        label: string;
        price: string;
        bg: string;
        text: string;
        border: string;
        badge?: string;
    }[] = [
        { key: "essential", label: "Essentials", price: "From ₦750k", bg: "bg-white", text: "text-black", border: "border-black/10" },
        { key: "signature", label: "Signature", price: "From ₦2.2M", bg: "bg-black", text: "text-white", border: "border-transparent", badge: "Most Popular" },
        { key: "prestige", label: "Prestige", price: "Custom", bg: "bg-white", text: "text-black", border: "border-black/10" },
    ] as const;

    return (
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-20" id="packages">
            <div className="text-center mb-12">
                <p className="uppercase tracking-widest text-xs text-black/40 mb-2">Package comparison</p>
                <h2 className="text-3xl md:text-5xl font-extrabold">
                    Everything you get, side by side
                </h2>
                <p className="mt-4 text-black/50 max-w-md mx-auto text-sm">
                    No guesswork. Compare exactly what&apos;s included in each tier and choose the right level for your event.
                </p>
            </div>

            {/* Mobile tab switcher */}
            <div className="flex md:hidden gap-2 mb-6 rounded-2xl bg-black/5 p-1">
                {plans.map((p) => (
                    <button
                        key={p.key}
                        onClick={() => setMobileTab(p.key)}
                        className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${mobileTab === p.key ? "bg-black text-white shadow" : "text-black/50"
                            }`}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block rounded-3xl overflow-hidden border border-black/5 shadow-sm">
                {/* Header row */}
                <div className="grid grid-cols-4 gap-0">
                    <div className="bg-black/3 p-5 border-b border-black/5" />
                    {plans.map((p) => (
                        <div key={p.key} className={`p-5 border-b border-black/5 relative ${p.bg} ${p.text}`}>
                            {p.badge && (
                                <span className="absolute top-3 right-3 text-[10px] font-bold rounded-full bg-gold text-white px-2 py-0.5">
                                    {p.badge}
                                </span>
                            )}
                            <p className="text-xs uppercase tracking-widest opacity-50 mb-1">{p.key === "essential" ? "Entry" : p.key === "signature" ? "Popular" : "Exclusive"}</p>
                            <p className="text-xl font-extrabold">{p.label}</p>
                            <p className="text-sm font-bold mt-1 opacity-70">{p.price}</p>
                        </div>
                    ))}
                </div>

                {/* Feature rows */}
                {features.map((group) => (
                    <div key={group.category}>
                        {/* Category header */}
                        <div className="grid grid-cols-4 bg-black/3">
                            <div className="px-5 py-2.5 col-span-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">{group.category}</span>
                            </div>
                        </div>
                        {group.items.map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.02 }}
                                className="grid grid-cols-4 border-b border-black/5 last:border-0"
                            >
                                <div className="px-5 py-3.5 text-sm text-black/70 flex items-center">{item.label}</div>
                                <div className="px-5 py-3.5 bg-white flex items-center"><Cell value={item.essential} plan="essential" /></div>
                                <div className="px-5 py-3.5 bg-black flex items-center"><Cell value={item.signature} plan="signature" /></div>
                                <div className="px-5 py-3.5 bg-white flex items-center"><Cell value={item.prestige} plan="prestige" /></div>
                            </motion.div>
                        ))}
                    </div>
                ))}

                {/* CTA row */}
                <div className="grid grid-cols-4">
                    <div className="bg-black/3 p-5" />
                    {plans.map((p) => (
                        <div key={p.key} className={`p-5 ${p.bg}`}>
                            <Link
                                href={`/contact?plan=${p.key}`}
                                className={`block text-center rounded-xl py-3 text-sm font-bold transition ${p.key === "signature"
                                    ? "bg-gold text-white hover:bg-gold-dark"
                                    : "bg-black/10 text-black hover:bg-black hover:text-white"
                                    }`}
                            >
                                Get started →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile view */}
            <div className="md:hidden rounded-3xl border border-black/5 overflow-hidden">
                {features.map((group) => (
                    <div key={group.category}>
                        <div className="bg-black/5 px-4 py-2.5">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">{group.category}</span>
                        </div>
                        {group.items.map((item) => {
                            const val = item[mobileTab];
                            return (
                                <div key={item.label} className="flex items-center justify-between px-4 py-3.5 border-b border-black/5 last:border-0">
                                    <span className="text-sm text-black/70 flex-1 pr-4">{item.label}</span>
                                    <div className="shrink-0"><Cell value={val} plan={mobileTab} /></div>
                                </div>
                            );
                        })}
                    </div>
                ))}
                <div className="p-4">
                    <Link
                        href={`/contact?plan=${mobileTab}`}
                        className="block text-center rounded-xl py-3 bg-black text-white text-sm font-bold hover:bg-gold transition"
                    >
                        Get started with {plans.find(p => p.key === mobileTab)?.label} →
                    </Link>
                </div>
            </div>
        </section>
    );
}
