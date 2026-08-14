"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const plans = [
    {
        name: "Essentials",
        price: "From $1,500",
        tag: null,
        description: "Perfect for intimate gatherings and first-time clients testing the Aura touch.",
        color: "bg-white",
        headerColor: "bg-black/5",
        buttonClass: "bg-black text-white hover:opacity-90",
        features: [
            "Events up to 80 guests",
            "1 planning consultation",
            "Vendor recommendations",
            "Day-of coordination (6 hrs)",
            "Run-of-show document",
            "Post-event summary",
        ],
        notIncluded: ["Custom design/décor", "Full vendor management", "Dedicated producer"],
    },
    {
        name: "Signature",
        price: "From $4,500",
        tag: "Most Popular",
        description: "Our most loved package. Full-service planning with creative direction and hands-on execution.",
        color: "bg-black text-white",
        headerColor: "bg-white/10",
        buttonClass: "bg-gold text-white hover:bg-gold-dark",
        features: [
            "Events up to 300 guests",
            "Unlimited planning sessions",
            "Full vendor management",
            "Custom décor concept",
            "Full-day execution team",
            "Budget tracking & reporting",
            "Dedicated event manager",
            "Post-event media package",
        ],
        notIncluded: [],
    },
    {
        name: "Prestige",
        price: "Custom",
        tag: "White Glove",
        description: "For extraordinary events with no ceiling. Every detail perfected, every moment legendary.",
        color: "bg-white",
        headerColor: "bg-black/5",
        buttonClass: "bg-black text-white hover:opacity-90",
        features: [
            "Unlimited guest count",
            "Dedicated senior planner",
            "Bespoke design & production",
            "Multi-day events covered",
            "International vendor access",
            "VIP guest management",
            "Live streaming & media",
            "Post-event documentary",
            "24/7 dedicated support",
        ],
        notIncluded: [],
    },
];

export default function Pricing() {
    return (
        <section className="page-wrap section-y" id="pricing">
            <div className="text-center mb-14 md:mb-16">
                <p className="uppercase tracking-widest text-xs text-black/40 mb-2">Transparent pricing</p>
                <h2 className="text-3xl md:text-5xl font-extrabold">
                    Invest in memories <br className="hidden md:block" />
                    that last forever
                </h2>
                <p className="mt-4 text-black/60 max-w-lg mx-auto">
                    No hidden fees. No surprises. Just honest pricing for exceptional events. All packages include our signature Aura touch.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.name}
                        initial={{ y: 24, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className={`relative rounded-3xl overflow-hidden border border-black/10 ${plan.color} ${plan.tag === "Most Popular" ? "md:-mt-4 md:mb-4 shadow-2xl scale-[1.02]" : "shadow-sm"
                            }`}
                    >
                        {plan.tag && (
                            <div className="absolute top-4 right-4 rounded-full bg-gold text-white text-xs font-bold px-3 py-1">
                                {plan.tag}
                            </div>
                        )}

                        <div className={`px-7 py-9 ${plan.headerColor}`}>
                            <h3 className="text-2xl font-extrabold">{plan.name}</h3>
                            <div className="text-3xl font-extrabold mt-2">{plan.price}</div>
                            <p className={`text-sm mt-3 ${plan.color.includes("bg-black") ? "text-white/60" : "text-black/60"}`}>
                                {plan.description}
                            </p>
                        </div>

                        <div className="px-7 pb-9">
                            <ul className="mt-5 space-y-3.5">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-3 text-sm">
                                        <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                                        <span className={plan.color.includes("bg-black") ? "text-white/80" : "text-black/70"}>{f}</span>
                                    </li>
                                ))}
                                {plan.notIncluded.map((f) => (
                                    <li key={f} className="flex items-start gap-3 text-sm opacity-40">
                                        <span className="mt-0.5 flex-shrink-0">✕</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/contact?plan=essentials"
                                className={`mt-10 flex items-center justify-center w-full py-3 rounded-xl font-bold text-sm transition ${plan.buttonClass}`}
                            >
                                Get started →
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            <p className="text-center text-sm text-black/40 mt-12">
                All prices are starting points. Final quotes depend on guest count, location, and scope.{" "}
                <Link href="/contact" className="underline hover:text-black transition">
                    Let&apos;s talk →
                </Link>
            </p>
        </section>
    );
}
