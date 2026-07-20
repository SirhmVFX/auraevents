"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutHero() {
    return (
        <section className="relative overflow-hidden min-h-[60vh] flex items-center">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop"
                    alt="Aura Events team at work"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-24 text-white">
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="uppercase tracking-widest text-xs text-white/60 mb-4"
                >
                    Est. 2012 · Lagos, Nigeria
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.05 }}
                    className="text-4xl md:text-7xl font-extrabold leading-tight max-w-2xl"
                >
                    We make moments <br />
                    <span className="text-gold-light">unforgettable.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                    className="mt-6 max-w-lg text-white/70 text-base md:text-lg leading-relaxed"
                >
                    Aura Events is a full-service event planning and production company. From intimate celebrations to 10,000-person conferences — we craft experiences that move people.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.15 }}
                    className="mt-8 flex gap-3"
                >
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-gold text-white px-6 py-3 font-bold hover:bg-gold-dark transition"
                    >
                        Work with us →
                    </Link>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white px-6 py-3 font-semibold hover:bg-white/10 transition"
                    >
                        View our work
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
