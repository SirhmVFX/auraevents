"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
    {
        step: "01",
        title: "Discovery Call",
        description:
            "We start by listening. A 30-minute deep-dive into your vision, budget, guest count, and dream vibe. No judgement, all ideas welcome.",
        icon: "☕",
        color: "bg-gold-pale text-[#7a6520]",
    },
    {
        step: "02",
        title: "Concept & Proposal",
        description:
            "We craft a mood board, event concept deck, and detailed proposal with timelines, vendor shortlists, and budget breakdown — within 72 hours.",
        icon: "✏️",
        color: "bg-blue-100 text-blue-600",
    },
    {
        step: "03",
        title: "Planning & Vendor Magic",
        description:
            "With your green light, we activate our vetted vendor network, manage every contract, and build the run-of-show to the minute.",
        icon: "🔧",
        color: "bg-purple-100 text-purple-600",
    },
    {
        step: "04",
        title: "Rehearsal & Prep",
        description:
            "Site walkthroughs, tech rehearsals, briefing sessions, and a final 48-hour checklist. We leave zero room for surprises.",
        icon: "🎯",
        color: "bg-green-100 text-green-600",
    },
    {
        step: "05",
        title: "Show Day Execution",
        description:
            "Our on-ground team takes the wheel so you can be fully present. Real-time coordination, contingency plans armed, memories made.",
        icon: "🚀",
        color: "bg-amber-100 text-amber-600",
    },
    {
        step: "06",
        title: "Post-Event Debrief",
        description:
            "A full impact report: guest feedback, media coverage, budget reconciliation, and learnings — delivered within 7 days.",
        icon: "📊",
        color: "bg-pink-100 text-pink-600",
    },
];

export default function Process() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section className="page-wrap section-y">
            <div className="text-center mb-16 md:mb-20">
                    <p className="uppercase tracking-widest text-xs text-black/40 mb-3">How it works</p>
                <h2 className="text-3xl md:text-5xl font-extrabold">
                    From idea to iconic — <br className="hidden md:block" />
                    our 6-step process
                </h2>
                <p className="mt-4 text-black/60 max-w-lg mx-auto leading-relaxed">
                    A tried-and-tested framework that turns your vision into a flawlessly executed event, every single time.
                </p>
            </div>

            <div ref={ref} className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-black/5 -translate-x-px hidden sm:block" />
                <motion.div
                    style={{ scaleY, transformOrigin: "top" }}
                    className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gold -translate-x-px hidden sm:block"
                />

                <div className="flex flex-col gap-14 md:gap-16">
                    {steps.map((s, i) => {
                        const isEven = i % 2 === 0;
                        return (
                            <motion.div
                                key={s.step}
                                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.5, delay: 0.05 }}
                                className={`relative flex items-start gap-6 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Card */}
                                <div className={`flex-1 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                                    <div
                                        className={`inline-block rounded-3xl border border-black/5 bg-white shadow-sm p-6 md:p-8 max-w-md ${isEven ? "md:ml-auto" : ""
                                            }`}
                                    >
                                        <div className={`inline-flex w-12 h-12 rounded-2xl items-center justify-center text-2xl mb-4 ${s.color}`}>
                                            {s.icon}
                                        </div>
                                        <div className="text-xs font-bold text-black/30 mb-1">Step {s.step}</div>
                                        <h3 className="text-xl font-extrabold mb-2">{s.title}</h3>
                                        <p className="text-sm text-black/60 leading-relaxed">{s.description}</p>
                                    </div>
                                </div>

                                {/* Center dot */}
                                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gold ring-4 ring-white shadow z-10 top-6" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
