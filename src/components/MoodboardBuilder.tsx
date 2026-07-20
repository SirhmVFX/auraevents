"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const THEMES = [
    { id: "romantic", label: "Romantic", emoji: "🌹", desc: "Soft blooms, candlelight, lace" },
    { id: "modern", label: "Modern Luxe", emoji: "✦", desc: "Sleek, geometric, monochromatic" },
    { id: "tropical", label: "Neo-Tropical", emoji: "🌴", desc: "Bold greens, warm woods, organic" },
    { id: "vintage", label: "Vintage Glam", emoji: "🎭", desc: "Art Deco, golds, velvets" },
    { id: "minimal", label: "Minimalist", emoji: "◻", desc: "Clean lines, white space, quiet luxury" },
    { id: "festive", label: "Afro-Festive", emoji: "🎊", desc: "Ankara prints, bold colour, drums" },
];

const COLOR_PALETTES = [
    { id: "blush", label: "Blush & Gold", colors: ["#f4c2c2", "#e8a87c", "#f9f0e8", "#d4a853"] },
    { id: "emerald", label: "Emerald & Black", colors: ["#2d6a4f", "#1b4332", "#000000", "#95d5b2"] },
    { id: "navy", label: "Navy & Silver", colors: ["#1a237e", "#283593", "#c0c0c0", "#e8eaf6"] },
    { id: "terracotta", label: "Terracotta & Cream", colors: ["#c1440e", "#e07b54", "#f5f0e8", "#8b4513"] },
    { id: "lavender", label: "Lavender & White", colors: ["#9b7cdb", "#c3b1e1", "#ffffff", "#6a4c93"] },
    { id: "midnight", label: "Midnight & Gold", colors: ["#0a0a1a", "#1a1a3e", "#d4a017", "#f0e68c"] },
];

const VIBES = [
    { id: "intimate", label: "Intimate & Personal", emoji: "🕯️" },
    { id: "grand", label: "Grand & Opulent", emoji: "👑" },
    { id: "playful", label: "Fun & Playful", emoji: "🎈" },
    { id: "elegant", label: "Elegant & Refined", emoji: "🥂" },
    { id: "bohemian", label: "Bohemian & Free", emoji: "🌿" },
    { id: "dramatic", label: "Dramatic & Bold", emoji: "⚡" },
];

const INSPIRATIONS = [
    { id: "garden", label: "Garden Setting", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400&auto=format&fit=crop" },
    { id: "waterfront", label: "Waterfront", img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=400&auto=format&fit=crop" },
    { id: "ballroom", label: "Grand Ballroom", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop" },
    { id: "rooftop", label: "Rooftop / Skyline", img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop" },
    { id: "outdoor", label: "Outdoor Grounds", img: "https://images.unsplash.com/photo-1464375117522-1311d2433b42?q=80&w=400&auto=format&fit=crop" },
    { id: "industrial", label: "Industrial Chic", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop" },
];

type Board = {
    theme: string | null;
    palette: string | null;
    vibe: string | null;
    inspiration: string | null;
};

export default function MoodboardBuilder() {
    const [board, setBoard] = useState<Board>({ theme: null, palette: null, vibe: null, inspiration: null });
    const [submitted, setSubmitted] = useState(false);
    const [step, setStep] = useState(0);

    const complete = Object.values(board).filter(Boolean).length;
    const total = 4;
    const progress = (complete / total) * 100;

    const toggle = (key: keyof Board, value: string) => {
        setBoard((b) => ({ ...b, [key]: b[key] === value ? null : value }));
    };

    const selectedTheme = THEMES.find((t) => t.id === board.theme);
    const selectedPalette = COLOR_PALETTES.find((p) => p.id === board.palette);
    const selectedVibe = VIBES.find((v) => v.id === board.vibe);
    const selectedInspiration = INSPIRATIONS.find((i) => i.id === board.inspiration);

    const steps = [
        {
            key: "theme",
            label: "Choose a theme",
            subtitle: "What visual world do you want to create?",
            content: (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {THEMES.map((t) => (
                        <motion.button
                            key={t.id}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => toggle("theme", t.id)}
                            className={`rounded-2xl border-2 p-4 text-left transition-all ${board.theme === t.id ? "border-black bg-black text-white" : "border-black/10 hover:border-black/30 bg-white"
                                }`}
                        >
                            <div className="text-2xl mb-2">{t.emoji}</div>
                            <p className="font-bold text-sm">{t.label}</p>
                            <p className={`text-xs mt-1 ${board.theme === t.id ? "text-white/60" : "text-black/40"}`}>{t.desc}</p>
                        </motion.button>
                    ))}
                </div>
            ),
        },
        {
            key: "palette",
            label: "Pick a colour palette",
            subtitle: "Colours set the emotional tone of your event.",
            content: (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {COLOR_PALETTES.map((p) => (
                        <motion.button
                            key={p.id}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => toggle("palette", p.id)}
                            className={`rounded-2xl border-2 p-4 text-left transition-all ${board.palette === p.id ? "border-black bg-black text-white" : "border-black/10 hover:border-black/30 bg-white"
                                }`}
                        >
                            <div className="flex gap-1.5 mb-3">
                                {p.colors.map((c) => (
                                    <div key={c} className="w-8 h-8 rounded-lg border border-black/10" style={{ backgroundColor: c }} />
                                ))}
                            </div>
                            <p className={`font-bold text-xs ${board.palette === p.id ? "text-white" : ""}`}>{p.label}</p>
                        </motion.button>
                    ))}
                </div>
            ),
        },
        {
            key: "vibe",
            label: "Set the vibe",
            subtitle: "How should guests feel when they walk in?",
            content: (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {VIBES.map((v) => (
                        <motion.button
                            key={v.id}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => toggle("vibe", v.id)}
                            className={`rounded-2xl border-2 p-4 text-center transition-all ${board.vibe === v.id ? "border-black bg-black text-white" : "border-black/10 hover:border-black/30 bg-white"
                                }`}
                        >
                            <div className="text-3xl mb-2">{v.emoji}</div>
                            <p className={`font-bold text-sm ${board.vibe === v.id ? "text-white" : ""}`}>{v.label}</p>
                        </motion.button>
                    ))}
                </div>
            ),
        },
        {
            key: "inspiration",
            label: "Pick a setting",
            subtitle: "What environment inspires you most?",
            content: (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {INSPIRATIONS.map((ins) => (
                        <motion.button
                            key={ins.id}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => toggle("inspiration", ins.id)}
                            className={`relative rounded-2xl overflow-hidden border-2 transition-all h-28 ${board.inspiration === ins.id ? "border-orange-500 scale-105 shadow-lg" : "border-transparent hover:border-black/30"
                                }`}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={ins.img} alt={ins.label} className="w-full h-full object-cover" />
                            <div className={`absolute inset-0 transition-all ${board.inspiration === ins.id ? "bg-black/30" : "bg-black/40"}`} />
                            <p className="absolute bottom-2 left-0 right-0 text-center text-white text-xs font-bold">{ins.label}</p>
                            {board.inspiration === ins.id && (
                                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">✓</div>
                            )}
                        </motion.button>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-20" id="moodboard">
            <div className="text-center mb-12">
                <p className="uppercase tracking-widest text-xs text-black/40 mb-2">Vision Builder</p>
                <h2 className="text-3xl md:text-5xl font-extrabold">
                    Build your event mood board
                </h2>
                <p className="mt-4 text-black/50 max-w-md mx-auto text-sm">
                    Not sure how to describe your vision? Pick your vibes here and we&apos;ll use it as the starting point for your planning brief.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Builder */}
                <div className="lg:col-span-2">
                    {/* Progress */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-2 rounded-full bg-black/5 overflow-hidden">
                            <motion.div
                                animate={{ width: `${progress}%` }}
                                className="h-full rounded-full bg-black"
                                transition={{ duration: 0.4 }}
                            />
                        </div>
                        <span className="text-xs font-bold text-black/40">{complete}/{total}</span>
                    </div>

                    {/* Step tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                        {steps.map((s, i) => (
                            <button
                                key={s.key}
                                onClick={() => setStep(i)}
                                className={`rounded-full px-3 py-1.5 text-xs font-bold border transition whitespace-nowrap flex items-center gap-1.5 ${step === i ? "bg-black text-white border-black" : "border-black/10 text-black/50 hover:border-black/30"
                                    }`}
                            >
                                {board[s.key as keyof Board] && <span className="text-green-400">✓</span>}
                                {s.label}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25 }}
                        >
                            <p className="text-sm text-black/50 mb-4">{steps[step].subtitle}</p>
                            {steps[step].content}
                        </motion.div>
                    </AnimatePresence>

                    {/* Nav */}
                    <div className="flex items-center justify-between mt-6">
                        <button
                            disabled={step === 0}
                            onClick={() => setStep(s => s - 1)}
                            className="px-4 py-2 rounded-xl border border-black/10 text-sm font-semibold disabled:opacity-30 hover:bg-black/5 transition"
                        >
                            ← Back
                        </button>
                        {step < steps.length - 1 ? (
                            <button
                                onClick={() => setStep(s => s + 1)}
                                className="px-4 py-2 rounded-xl bg-black text-white text-sm font-semibold hover:opacity-90 transition"
                            >
                                Next →
                            </button>
                        ) : (
                            <button
                                disabled={complete < 2}
                                onClick={() => setSubmitted(true)}
                                className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition disabled:opacity-40"
                            >
                                Send to our team →
                            </button>
                        )}
                    </div>
                </div>

                {/* Preview board */}
                <div className="lg:col-span-1">
                    <div className="rounded-3xl border border-black/5 bg-white shadow-sm p-5 sticky top-24">
                        <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4">Your mood board preview</p>

                        {complete === 0 ? (
                            <div className="text-center py-10 text-black/20 text-sm">
                                Start selecting to build your board →
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {selectedTheme && (
                                    <div className="rounded-xl bg-black/5 p-3 flex items-center gap-3">
                                        <span className="text-2xl">{selectedTheme.emoji}</span>
                                        <div>
                                            <p className="text-xs font-bold text-black/40">Theme</p>
                                            <p className="font-bold text-sm">{selectedTheme.label}</p>
                                        </div>
                                    </div>
                                )}
                                {selectedPalette && (
                                    <div className="rounded-xl bg-black/5 p-3">
                                        <p className="text-xs font-bold text-black/40 mb-2">Palette: {selectedPalette.label}</p>
                                        <div className="flex gap-2">
                                            {selectedPalette.colors.map((c) => (
                                                <div key={c} className="w-8 h-8 rounded-lg border border-black/10" style={{ backgroundColor: c }} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {selectedVibe && (
                                    <div className="rounded-xl bg-black/5 p-3 flex items-center gap-3">
                                        <span className="text-2xl">{selectedVibe.emoji}</span>
                                        <div>
                                            <p className="text-xs font-bold text-black/40">Vibe</p>
                                            <p className="font-bold text-sm">{selectedVibe.label}</p>
                                        </div>
                                    </div>
                                )}
                                {selectedInspiration && (
                                    <div className="rounded-xl overflow-hidden h-20 relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={selectedInspiration.img} alt={selectedInspiration.label} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <p className="text-white text-xs font-bold">{selectedInspiration.label}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {complete >= 2 && !submitted && (
                            <button
                                onClick={() => setSubmitted(true)}
                                className="mt-4 w-full rounded-xl bg-black text-white font-bold py-3 text-xs hover:bg-orange-500 transition"
                            >
                                Send this to our team →
                            </button>
                        )}

                        {submitted && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-4 rounded-xl bg-green-50 border border-green-100 p-4 text-center"
                            >
                                <p className="text-2xl mb-1">🎉</p>
                                <p className="text-sm font-bold">Board sent!</p>
                                <p className="text-xs text-black/50 mt-1">Our team will reach out with a concept inspired by your selections.</p>
                                <Link href="/contact" className="mt-2 text-xs underline text-black/60 hover:text-black transition block">
                                    Add more details →
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
