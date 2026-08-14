"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SubmitEventForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const [form, setForm] = useState({
        name: "",
        org: "",
        email: "",
        phone: "",
        eventTitle: "",
        eventType: "",
        eventDate: "",
        guestCount: "",
        venue: "",
        budget: "",
        description: "",
        services: [] as string[],
    });

    const serviceOptions = [
        "Full planning & coordination",
        "Venue sourcing",
        "Stage & AV production",
        "Décor & floral design",
        "Catering coordination",
        "Marketing & promotion",
        "Photography & videography",
        "Ticketing & registration",
    ];

    const set = (field: string, value: string) =>
        setForm((p) => ({ ...p, [field]: value }));

    const toggleService = (s: string) => {
        setForm((p) => ({
            ...p,
            services: p.services.includes(s)
                ? p.services.filter((x) => x !== s)
                : [...p.services, s],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
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
                    <div className="text-6xl mb-4">🚀</div>
                    <h2 className="text-2xl font-extrabold mb-3">Event submitted!</h2>
                    <p className="text-black/60 max-w-sm mx-auto mb-4">
                        Amazing! We&apos;ve received your event brief for <strong>{form.eventTitle}</strong>. Our team will review and respond within 24 hours.
                    </p>
                    <p className="text-sm text-black/40">
                        We&apos;ll be in touch at <strong>{form.email}</strong>
                    </p>
                </motion.div>
            ) : (
                <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="rounded-3xl bg-white border border-black/5 shadow-sm p-7 md:p-10 flex flex-col gap-6"
                >
                    {/* Contact info */}
                    <div>
                        <h2 className="text-lg font-extrabold mb-4">Your contact details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Full Name *" required>
                                <input
                                    required
                                    type="text"
                                    placeholder="Your name"
                                    value={form.name}
                                    onChange={(e) => set("name", e.target.value)}
                                    className="input-base"
                                />
                            </Field>
                            <Field label="Organisation / Company">
                                <input
                                    type="text"
                                    placeholder="Company or individual"
                                    value={form.org}
                                    onChange={(e) => set("org", e.target.value)}
                                    className="input-base"
                                />
                            </Field>
                            <Field label="Email *" required>
                                <input
                                    required
                                    type="email"
                                    placeholder="you@company.com"
                                    value={form.email}
                                    onChange={(e) => set("email", e.target.value)}
                                    className="input-base"
                                />
                            </Field>
                            <Field label="Phone / WhatsApp">
                                <input
                                    type="tel"
                                    placeholder="+234 801 000 0000"
                                    value={form.phone}
                                    onChange={(e) => set("phone", e.target.value)}
                                    className="input-base"
                                />
                            </Field>
                        </div>
                    </div>

                    {/* Event info */}
                    <div className="border-t border-black/5 pt-6">
                        <h2 className="text-lg font-extrabold mb-4">Event details</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Field label="Event Title *" required>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Adaeze's 40th Birthday Soirée"
                                    value={form.eventTitle}
                                    onChange={(e) => set("eventTitle", e.target.value)}
                                    className="input-base"
                                />
                            </Field>
                            <Field label="Event Type *" required>
                                <select
                                    required
                                    value={form.eventType}
                                    onChange={(e) => set("eventType", e.target.value)}
                                    className="input-base bg-white"
                                >
                                    <option value="" disabled>Select type</option>
                                    <option>Wedding / Social</option>
                                    <option>Corporate Event</option>
                                    <option>Brand Activation</option>
                                    <option>Award Gala</option>
                                    <option>Conference / Expo</option>
                                    <option>Hybrid / Virtual</option>
                                    <option>Private Celebration</option>
                                    <option>Other</option>
                                </select>
                            </Field>
                            <Field label="Event Date">
                                <input
                                    type="date"
                                    value={form.eventDate}
                                    onChange={(e) => set("eventDate", e.target.value)}
                                    className="input-base"
                                />
                            </Field>
                            <Field label="Expected Guest Count">
                                <input
                                    type="number"
                                    placeholder="e.g. 200"
                                    value={form.guestCount}
                                    onChange={(e) => set("guestCount", e.target.value)}
                                    min="1"
                                    className="input-base"
                                />
                            </Field>
                            <Field label="Preferred Venue / Location">
                                <input
                                    type="text"
                                    placeholder="Eko Hotel, Lagos / TBD"
                                    value={form.venue}
                                    onChange={(e) => set("venue", e.target.value)}
                                    className="input-base"
                                />
                            </Field>
                            <Field label="Budget Range">
                                <select
                                    value={form.budget}
                                    onChange={(e) => set("budget", e.target.value)}
                                    className="input-base bg-white"
                                >
                                    <option value="">Not sure yet</option>
                                    <option>Under ₦500k</option>
                                    <option>₦500k – ₦2M</option>
                                    <option>₦2M – ₦5M</option>
                                    <option>₦5M – ₦15M</option>
                                    <option>₦15M+</option>
                                </select>
                            </Field>
                        </div>
                    </div>

                    {/* Services needed */}
                    <div className="border-t border-black/5 pt-6">
                        <h2 className="text-lg font-extrabold mb-2">Services needed</h2>
                        <p className="text-xs text-black/50 mb-4">Select all that apply</p>
                        <div className="flex flex-wrap gap-2">
                            {serviceOptions.map((s) => {
                                const active = form.services.includes(s);
                                return (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => toggleService(s)}
                                        className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition ${active
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-black/70 border-black/10 hover:border-black/30"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="border-t border-black/5 pt-6">
                        <Field label="Describe your vision *" required>
                            <textarea
                                required
                                rows={5}
                                placeholder="Paint us a picture — theme, mood, must-have moments, guest experience, any inspiration you have..."
                                value={form.description}
                                onChange={(e) => set("description", e.target.value)}
                                className="input-base resize-none"
                            />
                        </Field>
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
                                Submitting your event...
                            </span>
                        ) : (
                            "Submit my event →"
                        )}
                    </button>

                    <p className="text-center text-xs text-black/40">
                        Our team will respond within 24 hours. No commitment required.
                    </p>
                </motion.form>
            )}
        </AnimatePresence>
    );
}

function Field({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-black/60">
                {label}
                {required && <span className="text-gold ml-0.5">*</span>}
            </label>
            {children}
        </div>
    );
}
