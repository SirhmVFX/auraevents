"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EventItem } from "@/lib/events";

export default function EventBookingWidget({ event }: { event: EventItem }) {
    const soldOut = event.status === "sold-out" || event.spotsLeft === 0;
    const [qty, setQty] = useState(1);
    const [step, setStep] = useState<"details" | "booking" | "success">("details");
    const [form, setForm] = useState({ name: "", email: "", phone: "" });
    const [loading, setLoading] = useState(false);

    const handleBook = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1400));
        setLoading(false);
        setStep("success");
    };

    return (
        <div className="rounded-3xl border border-black/10 bg-white shadow-lg overflow-hidden">
            {/* Price header */}
            <div className="bg-black text-white px-6 py-5">
                <p className="text-white/50 text-xs mb-1">Price per ticket</p>
                <p className="text-3xl font-extrabold">{event.price}</p>
                {!soldOut && (
                    <p className="text-white/60 text-xs mt-1">
                        {event.spotsLeft} spots remaining
                    </p>
                )}
            </div>

            <div className="p-6">
                <AnimatePresence mode="wait">
                    {step === "success" ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-4"
                        >
                            <div className="text-5xl mb-3">🎟️</div>
                            <h3 className="font-extrabold text-xl mb-2">You&apos;re booked!</h3>
                            <p className="text-sm text-black/60 mb-4">
                                Confirmation sent to <strong>{form.email}</strong>. See you at the event!
                            </p>
                            <div className="rounded-xl bg-gold-pale border border-gold/20 p-4 text-sm text-[#7a6520]">
                                Add to your calendar and share with friends 🎉
                            </div>
                        </motion.div>
                    ) : step === "booking" ? (
                        <motion.form
                            key="booking"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onSubmit={handleBook}
                            className="flex flex-col gap-4"
                        >
                            <button
                                type="button"
                                onClick={() => setStep("details")}
                                className="text-xs text-black/50 hover:text-black transition text-left"
                            >
                                ← Back
                            </button>
                            <h3 className="font-extrabold text-lg">Your details</h3>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-black/60">Full Name *</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Your full name"
                                    value={form.name}
                                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                    className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/10"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-black/60">Email Address *</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="your@email.com"
                                    value={form.email}
                                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                    className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/10"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-black/60">Phone / WhatsApp</label>
                                <input
                                    type="tel"
                                    placeholder="+234 801 000 0000"
                                    value={form.phone}
                                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                                    className="rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/10"
                                />
                            </div>

                            {/* Order summary */}
                            <div className="rounded-xl bg-black/5 p-3 text-sm">
                                <div className="flex justify-between text-black/60 mb-1">
                                    <span>{qty}x ticket</span>
                                    <span>{event.price}</span>
                                </div>
                                <div className="flex justify-between font-bold border-t border-black/10 pt-2 mt-2">
                                    <span>Total</span>
                                    <span>{event.price}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-gold text-white font-bold py-3.5 text-sm hover:bg-gold-dark transition disabled:opacity-60"
                            >
                                {loading ? "Processing…" : `Reserve ${qty} ticket${qty > 1 ? "s" : ""} →`}
                            </button>
                            <p className="text-center text-xs text-black/40">
                                Secure checkout. Instant confirmation.
                            </p>
                        </motion.form>
                    ) : (
                        <motion.div key="details" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {soldOut ? (
                                <div className="text-center py-4">
                                    <div className="text-4xl mb-3">😢</div>
                                    <h3 className="font-extrabold text-lg mb-2">Sold Out</h3>
                                    <p className="text-sm text-black/60 mb-4">
                                        This event is fully booked. Join the waitlist and we&apos;ll notify you if spots open up.
                                    </p>
                                    <button className="w-full rounded-xl bg-black text-white font-bold py-3 text-sm hover:opacity-90 transition">
                                        Join Waitlist →
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Quantity selector */}
                                    <div className="flex items-center justify-between mb-5">
                                        <span className="text-sm font-bold">Tickets</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setQty((q) => Math.max(1, q - 1))}
                                                className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-lg hover:bg-black/5 transition"
                                                aria-label="Decrease quantity"
                                            >
                                                −
                                            </button>
                                            <span className="w-6 text-center font-bold">{qty}</span>
                                            <button
                                                onClick={() => setQty((q) => Math.min(event.spotsLeft, q + 1))}
                                                className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-lg hover:bg-black/5 transition"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Event quick info */}
                                    <div className="rounded-xl bg-black/5 p-3 mb-5 space-y-2 text-sm text-black/60">
                                        <p className="flex gap-2">📅 <span>{event.displayDate}</span></p>
                                        <p className="flex gap-2">⏰ <span>{event.time}</span></p>
                                        <p className="flex gap-2">📍 <span>{event.venue}</span></p>
                                    </div>

                                    <button
                                        onClick={() => setStep("booking")}
                                        className="w-full rounded-xl bg-black text-white font-bold py-3.5 text-sm hover:bg-gold transition"
                                    >
                                        Book {qty} ticket{qty > 1 ? "s" : ""} →
                                    </button>

                                    <p className="text-center text-xs text-black/40 mt-3">
                                        Free cancellation up to 48 hours before the event.
                                    </p>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Share */}
            <div className="border-t border-black/5 px-6 py-4">
                <p className="text-xs text-black/40 text-center">Share this event</p>
                <div className="flex justify-center gap-3 mt-2">
                    {["WhatsApp", "Twitter", "Copy link"].map((s) => (
                        <button
                            key={s}
                            className="text-xs text-black/50 hover:text-black transition underline"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
