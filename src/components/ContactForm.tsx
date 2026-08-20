"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const eventTypes = [
    "Wedding / Social",
    "Corporate Event",
    "Brand Activation",
    "Hybrid / Virtual",
    "Award Gala",
    "Private Celebration",
    "Other",
];

const budgetRanges = [
    "Under $2,000",
    "$2,000 – $5,000",
    "$5,000 – $15,000",
    "$15,000 – $50,000",
    "$50,000+",
    "Not sure yet",
];

function ContactFormInner() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        eventType: searchParams.get("service") || "",
        eventDate: "",
        guestCount: "",
        budget: "",
        message: "",
        hearAboutUs: "",
    });

    const set = (field: string, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        // Replace with actual form submission endpoint (e.g., Formspree, server action, etc.)
        await new Promise((r) => setTimeout(r, 1500));
        setStatus("success");
    };

    return (
        <AnimatePresence mode="wait">
            {status === "success" ? (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 p-12 text-center"
                >
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-2xl font-extrabold mb-3">We&apos;ve received your enquiry!</h2>
                    <p className="text-black/60 max-w-sm mx-auto">
                        Thank you, <strong>{form.name}</strong>! Our team will reach out within 24 hours to discuss your vision. Check your inbox at <strong>{form.email}</strong>.
                    </p>
                    <p className="mt-6 text-sm text-black/40">
                        Can&apos;t wait? WhatsApp us directly →{" "}
                        <a href="https://wa.me/2348142856571" className="underline text-black/70" target="_blank" rel="noopener noreferrer">
                            +234 814 285 6571
                        </a>
                    </p>
                </motion.div>
            ) : (
                <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="rounded-3xl bg-white border border-black/5 shadow-sm p-7 md:p-10 flex flex-col gap-6"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-black/60">Full Name *</label>
                            <input
                                required
                                type="text"
                                placeholder="Adaeze Okafor"
                                value={form.name}
                                onChange={(e) => set("name", e.target.value)}
                                className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                            />
                        </div>
                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-black/60">Email Address *</label>
                            <input
                                required
                                type="email"
                                placeholder="adaeze@company.com"
                                value={form.email}
                                onChange={(e) => set("email", e.target.value)}
                                className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Phone */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-black/60">Phone / WhatsApp</label>
                            <input
                                type="tel"
                                placeholder="+234 801 000 0000"
                                value={form.phone}
                                onChange={(e) => set("phone", e.target.value)}
                                className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                            />
                        </div>
                        {/* Event type */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-black/60">Event Type *</label>
                            <select
                                required
                                value={form.eventType}
                                onChange={(e) => set("eventType", e.target.value)}
                                className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 bg-white"
                            >
                                <option value="" disabled>Select event type</option>
                                {eventTypes.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Date */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-black/60">Event Date</label>
                            <input
                                type="date"
                                value={form.eventDate}
                                onChange={(e) => set("eventDate", e.target.value)}
                                className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                            />
                        </div>
                        {/* Guest count */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-black/60">Expected Guest Count</label>
                            <input
                                type="number"
                                placeholder="e.g. 150"
                                value={form.guestCount}
                                onChange={(e) => set("guestCount", e.target.value)}
                                min="1"
                                className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                            />
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-black/60">Estimated Budget</label>
                        <div className="flex flex-wrap gap-2">
                            {budgetRanges.map((b) => (
                                <button
                                    key={b}
                                    type="button"
                                    onClick={() => set("budget", b)}
                                    className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition ${form.budget === b
                                            ? "bg-black text-white border-black"
                                            : "bg-white text-black/70 border-black/10 hover:border-black/30"
                                        }`}
                                >
                                    {b}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-black/60">Tell us about your vision *</label>
                        <textarea
                            required
                            rows={4}
                            placeholder="Describe your event dream — theme, vibe, must-haves, anything that excites you..."
                            value={form.message}
                            onChange={(e) => set("message", e.target.value)}
                            className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 resize-none"
                        />
                    </div>

                    {/* How did you hear */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-black/60">How did you hear about us?</label>
                        <select
                            value={form.hearAboutUs}
                            onChange={(e) => set("hearAboutUs", e.target.value)}
                            className="rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10 bg-white"
                        >
                            <option value="">Select an option</option>
                            <option>Instagram</option>
                            <option>Google Search</option>
                            <option>Referral / Word of mouth</option>
                            <option>TikTok</option>
                            <option>LinkedIn</option>
                            <option>Previous client</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full rounded-xl bg-black text-white font-bold py-4 text-sm hover:opacity-90 transition disabled:opacity-60 mt-2"
                    >
                        {status === "loading" ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                                Sending your enquiry...
                            </span>
                        ) : (
                            "Send my enquiry — it&apos;s free →"
                        )}
                    </button>

                    <p className="text-center text-xs text-black/40">
                        No spam. No pressure. Just a friendly conversation about your event.
                    </p>
                </motion.form>
            )}
        </AnimatePresence>
    );
}

export default function ContactForm() {
    return (
        <Suspense fallback={<div className="rounded-3xl bg-white border border-black/5 p-8 animate-pulse h-96" />}>
            <ContactFormInner />
        </Suspense>
    );
}
