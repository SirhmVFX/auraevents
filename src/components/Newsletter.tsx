"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setStatus("loading");
        // Simulate API call — replace with actual newsletter endpoint
        await new Promise((r) => setTimeout(r, 1200));
        setStatus("success");
    };

    return (
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-gold px-8 md:px-14 py-14 text-white text-center"
            >
                {/* Decorative blobs */}
                <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

                <div className="relative z-10">
                    <p className="uppercase tracking-widest text-xs text-white/70 mb-3">Free insights</p>
                    <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
                        Level up your events game 🎯
                    </h2>
                    <p className="text-white/80 max-w-lg mx-auto mb-8 text-sm md:text-base">
                        Join 4,200+ event professionals getting weekly tips on planning, design, budgets, and vendor secrets — straight to your inbox. No fluff, just gold.
                    </p>

                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="inline-flex items-center gap-3 bg-white/20 rounded-2xl px-6 py-4 text-white font-semibold text-lg"
                            >
                                <span className="text-2xl">🎉</span>
                                You&apos;re in! Welcome to the Aura circle.
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                onSubmit={handleSubmit}
                                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                            >
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    aria-label="Email address"
                                    className="flex-1 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-white/50 backdrop-blur"
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="rounded-xl bg-white text-[#7a6520] font-bold px-6 py-3 text-sm hover:bg-gold-pale transition disabled:opacity-70 whitespace-nowrap"
                                >
                                    {status === "loading" ? "Joining…" : "Get free tips →"}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {status !== "success" && (
                        <p className="mt-3 text-xs text-white/50">
                            No spam, ever. Unsubscribe anytime.
                        </p>
                    )}

                    {/* Social proof */}
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <div className="flex -space-x-2">
                            {["EP", "UX", "AM", "KD"].map((initials) => (
                                <div
                                    key={initials}
                                    className="w-8 h-8 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-[10px] font-bold"
                                >
                                    {initials}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-white/70">4,200+ subscribers love this</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
