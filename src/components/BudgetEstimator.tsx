"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const EVENT_CONFIGS: Record<string, {
    label: string;
    emoji: string;
    basePerHead: number;
    minGuests: number;
    maxGuests: number;
    venueBase: number;
    productionBase: number;
    decorBase: number;
    cateringBase: number;
}> = {
    wedding: {
        label: "Wedding",
        emoji: "💍",
        basePerHead: 35000,
        minGuests: 50,
        maxGuests: 500,
        venueBase: 800000,
        productionBase: 600000,
        decorBase: 700000,
        cateringBase: 25000,
    },
    corporate: {
        label: "Corporate Event",
        emoji: "🏢",
        basePerHead: 18000,
        minGuests: 50,
        maxGuests: 2000,
        venueBase: 500000,
        productionBase: 1200000,
        decorBase: 250000,
        cateringBase: 15000,
    },
    birthday: {
        label: "Birthday / Private",
        emoji: "🎂",
        basePerHead: 22000,
        minGuests: 20,
        maxGuests: 300,
        venueBase: 350000,
        productionBase: 250000,
        decorBase: 400000,
        cateringBase: 18000,
    },
    gala: {
        label: "Gala / Awards",
        emoji: "🏆",
        basePerHead: 40000,
        minGuests: 100,
        maxGuests: 1000,
        venueBase: 1200000,
        productionBase: 1500000,
        decorBase: 800000,
        cateringBase: 28000,
    },
    activation: {
        label: "Brand Activation",
        emoji: "🎪",
        basePerHead: 8000,
        minGuests: 200,
        maxGuests: 5000,
        venueBase: 400000,
        productionBase: 900000,
        decorBase: 350000,
        cateringBase: 5000,
    },
    conference: {
        label: "Conference / Expo",
        emoji: "🎤",
        basePerHead: 12000,
        minGuests: 100,
        maxGuests: 5000,
        venueBase: 600000,
        productionBase: 2000000,
        decorBase: 200000,
        cateringBase: 10000,
    },
};

const TIERS = [
    { label: "Essential", multiplier: 0.65, desc: "Clean, well-executed, focused on the must-haves" },
    { label: "Signature", multiplier: 1.0, desc: "Our most popular — full service with creative direction" },
    { label: "Prestige", multiplier: 1.55, desc: "No ceiling — custom, luxurious, unforgettable" },
];

const fmt = (n: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

function Bar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-xs text-black/50 w-24 shrink-0">{label}</span>
            <div className="flex-1 h-2 rounded-full bg-black/5 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(value / max) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`h-full rounded-full ${color}`}
                />
            </div>
            <span className="text-xs font-bold w-24 text-right">{fmt(value)}</span>
        </div>
    );
}

export default function BudgetEstimator() {
    const [eventType, setEventType] = useState("wedding");
    const [guests, setGuests] = useState(150);
    const [tier, setTier] = useState(1);
    const [addOns, setAddOns] = useState<Set<string>>(new Set());
    const [showResult, setShowResult] = useState(false);

    const config = EVENT_CONFIGS[eventType];

    const ADD_ONS = [
        { id: "photography", label: "📸 Photography & Video", cost: 350000 },
        { id: "livestream", label: "📡 Live Streaming", cost: 280000 },
        { id: "florist", label: "🌸 Premium Florals", cost: 400000 },
        { id: "entertainment", label: "🎵 Live Entertainment", cost: 500000 },
        { id: "transport", label: "🚐 Guest Transport", cost: 200000 },
        { id: "gifting", label: "🎁 Guest Gifting", cost: 150000 },
    ];

    const toggleAddOn = (id: string) => {
        setAddOns((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const breakdown = useMemo(() => {
        const t = TIERS[tier].multiplier;
        const venue = config.venueBase * t;
        const production = config.productionBase * t;
        const decor = config.decorBase * t;
        const catering = config.cateringBase * guests * t;
        const planning = (venue + production + decor + catering) * 0.12;
        const addOnTotal = Array.from(addOns).reduce((sum, id) => {
            const a = ADD_ONS.find((x) => x.id === id);
            return sum + (a ? a.cost * t : 0);
        }, 0);
        const subtotal = venue + production + decor + catering + planning + addOnTotal;
        const contingency = subtotal * 0.1;
        return { venue, production, decor, catering, planning, addOnTotal, subtotal, contingency, total: subtotal + contingency };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventType, guests, tier, addOns]);

    const maxVal = Math.max(breakdown.venue, breakdown.production, breakdown.decor, breakdown.catering, breakdown.planning);

    return (
        <section className="page-wrap section-y" id="estimator">
            <div className="text-center mb-12">
                <p className="uppercase tracking-widest text-xs text-black/40 mb-2">Budget Estimator</p>
                <h2 className="text-3xl md:text-5xl font-extrabold">
                    What will your event cost?
                </h2>
                <p className="mt-4 text-black/50 max-w-lg mx-auto text-sm">
                    Get an instant ballpark estimate. All figures are in Nigerian Naira and based on our real project data. No sign-up required.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* LEFT — inputs */}
                <div className="rounded-3xl border border-black/5 bg-white shadow-sm p-6 md:p-8 flex flex-col gap-7">

                    {/* Event type */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-black/40 block mb-3">1. Event type</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {Object.entries(EVENT_CONFIGS).map(([key, val]) => (
                                <button
                                    key={key}
                                    onClick={() => { setEventType(key); setGuests(val.minGuests); setShowResult(false); }}
                                    className={`rounded-xl py-2.5 px-3 text-sm font-semibold border transition flex items-center gap-2 ${eventType === key
                                            ? "bg-black text-white border-black"
                                            : "bg-white text-black/70 border-black/10 hover:border-black/30"
                                        }`}
                                >
                                    <span>{val.emoji}</span> {val.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Guest count */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-black/40">
                                2. Guest count
                            </label>
                            <span className="text-2xl font-extrabold">{guests}</span>
                        </div>
                        <input
                            type="range"
                            min={config.minGuests}
                            max={config.maxGuests}
                            step={10}
                            value={guests}
                            onChange={(e) => { setGuests(+e.target.value); setShowResult(false); }}
                            className="w-full accent-black"
                        />
                        <div className="flex justify-between text-xs text-black/30 mt-1">
                            <span>{config.minGuests}</span>
                            <span>{config.maxGuests}</span>
                        </div>
                    </div>

                    {/* Service tier */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-black/40 block mb-3">3. Service tier</label>
                        <div className="flex flex-col gap-2">
                            {TIERS.map((t, i) => (
                                <button
                                    key={t.label}
                                    onClick={() => { setTier(i); setShowResult(false); }}
                                    className={`rounded-xl px-4 py-3 text-left border transition ${tier === i ? "bg-black text-white border-black" : "border-black/10 hover:border-black/30"
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-sm">{t.label}</span>
                                        {i === 1 && <span className="text-[10px] font-bold rounded-full bg-gold/20 text-gold px-2 py-0.5">Most popular</span>}
                                    </div>
                                    <p className={`text-xs mt-0.5 ${tier === i ? "text-white/60" : "text-black/40"}`}>{t.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add-ons */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-black/40 block mb-3">4. Add-ons (optional)</label>
                        <div className="grid grid-cols-2 gap-2">
                            {ADD_ONS.map((a) => (
                                <button
                                    key={a.id}
                                    onClick={() => { toggleAddOn(a.id); setShowResult(false); }}
                                    className={`rounded-xl px-3 py-2.5 text-xs font-semibold border transition text-left ${addOns.has(a.id) ? "bg-black text-white border-black" : "border-black/10 hover:border-black/30"
                                        }`}
                                >
                                    {a.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setShowResult(true)}
                        className="w-full rounded-xl bg-black text-white font-bold py-4 text-sm hover:bg-gold transition mt-2"
                    >
                        Calculate my estimate →
                    </button>
                </div>

                {/* RIGHT — result */}
                <div className="sticky top-24">
                    <AnimatePresence mode="wait">
                        {showResult ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-3xl border border-black/5 bg-white shadow-sm p-6 md:p-8 flex flex-col gap-6"
                            >
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-black/40 mb-1">Estimated total</p>
                                    <div className="text-4xl md:text-5xl font-extrabold text-black">
                                        {fmt(breakdown.total)}
                                    </div>
                                    <p className="text-xs text-black/40 mt-1">
                                        {EVENT_CONFIGS[eventType].emoji} {EVENT_CONFIGS[eventType].label} · {guests} guests · {TIERS[tier].label}
                                    </p>
                                </div>

                                {/* Range indicator */}
                                <div className="rounded-2xl bg-gold-pale border border-gold/20 px-5 py-4">
                                    <div className="flex items-center justify-between text-sm font-bold mb-1">
                                        <span className="text-black/50">Low end</span>
                                        <span className="text-black/50">High end</span>
                                    </div>
                                    <div className="flex items-center justify-between text-lg font-extrabold">
                                        <span>{fmt(breakdown.total * 0.85)}</span>
                                        <span className="text-gold">→</span>
                                        <span>{fmt(breakdown.total * 1.15)}</span>
                                    </div>
                                    <p className="text-xs text-black/40 mt-2 text-center">Actual quote depends on your specific brief</p>
                                </div>

                                {/* Cost breakdown bars */}
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">Cost breakdown</p>
                                    <div className="flex flex-col gap-3">
                                        <Bar label="Venue" value={breakdown.venue} max={maxVal} color="bg-gold-light" />
                                        <Bar label="Production" value={breakdown.production} max={maxVal} color="bg-blue-400" />
                                        <Bar label="Décor" value={breakdown.decor} max={maxVal} color="bg-pink-400" />
                                        <Bar label="Catering" value={breakdown.catering} max={maxVal} color="bg-green-400" />
                                        <Bar label="Planning fee" value={breakdown.planning} max={maxVal} color="bg-purple-400" />
                                        {breakdown.addOnTotal > 0 && (
                                            <Bar label="Add-ons" value={breakdown.addOnTotal} max={maxVal} color="bg-amber-400" />
                                        )}
                                    </div>
                                    <div className="border-t border-black/5 mt-4 pt-4 flex justify-between text-sm">
                                        <span className="text-black/50">Contingency (10%)</span>
                                        <span className="font-bold">{fmt(breakdown.contingency)}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-black/30 text-center">
                                    This is an estimate, not a quote. Prices vary by vendor, season, and scope.
                                </p>

                                <Link
                                    href={`/contact?plan=custom&type=${eventType}&guests=${guests}`}
                                    className="flex items-center justify-center w-full rounded-xl bg-black text-white font-bold py-4 text-sm hover:bg-gold transition"
                                >
                                    Get a real quote from our team →
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="rounded-3xl border-2 border-dashed border-black/10 p-10 flex flex-col items-center justify-center gap-4 text-center min-h-[300px]"
                            >
                                <div className="text-6xl">{EVENT_CONFIGS[eventType].emoji}</div>
                                <h3 className="font-extrabold text-xl">Fill in your details</h3>
                                <p className="text-sm text-black/40 max-w-xs">
                                    Adjust the options on the left and hit Calculate to see your personalised budget estimate.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
