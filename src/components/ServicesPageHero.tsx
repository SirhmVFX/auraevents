"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ServicesPageHero() {
    return (
        <section className="page-wrap pt-20 md:pt-28 pb-12 md:pb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <div className="inline-flex items-center gap-2 rounded-full bg-gold-pale text-gold px-4 py-2 text-xs font-bold mb-6">
                    <span>✨</span> End-to-end event services
                </div>
                <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-8">
                    Every event type, <br />
                    <span className="bg-gradient-to-r from-[#7a6520] to-[#d4a853] bg-clip-text text-transparent">
                        one expert team
                    </span>
                </h1>
                <p className="text-black/60 max-w-xl mx-auto text-base md:text-lg mb-10 leading-relaxed">
                    We handle every type of event — from intimate celebrations to large-scale productions — with the same passion, precision, and creative flair.
                </p>
                <div className="flex items-center justify-center gap-3">
                    <Link
                        href="/contact"
                        className="rounded-full bg-black text-white px-6 py-3 font-bold text-sm hover:opacity-90 transition"
                    >
                        Get a free quote →
                    </Link>
                    <Link
                        href="#pricing"
                        className="rounded-full border border-black/10 text-black px-6 py-3 font-semibold text-sm hover:bg-black/5 transition"
                    >
                        See pricing
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
