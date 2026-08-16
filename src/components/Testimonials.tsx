"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
    {
        id: 1,
        name: "Chioma Okafor",
        role: "CEO, Vivid Brands",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        text: "Aura turned our product launch into a cultural moment. The attention to detail was breathtaking — every single element told our brand story. We received more press coverage in one night than the entire previous year.",
        event: "Product Launch, Eko Hotel",
    },
    {
        id: 2,
        name: "Emeka & Adaeze Nwachukwu",
        role: "Newlyweds",
        avatar: "https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        text: "Our wedding was an absolute fairytale. Aura not only understood our vision, they elevated it beyond what we could have imagined. Our guests are still talking about it six months later. Worth every penny.",
        event: "Luxury Wedding, Lagoon Front",
    },
    {
        id: 3,
        name: "Bayo Adeleke",
        role: "VP Operations, Nimbus Group",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        text: "Managing a 3-day leadership retreat for 80 executives across workshops, dining, and activities is no small feat. Aura executed flawlessly. Zero hiccups. Our leadership team came back energized and aligned.",
        event: "Corporate Retreat, Abeokuta Hills",
    },
    {
        id: 4,
        name: "Titi Fashola",
        role: "Executive Director, Heal Africa",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        text: "Our fundraiser dinner exceeded its target by 40%. The way Aura integrated our mission into every design element — from centrepieces to the pledge moments — moved donors to give more than they planned.",
        event: "NGO Fundraiser Dinner, VI",
    },
    {
        id: 5,
        name: "Damilare Osei",
        role: "Marketing Director, Dev Nexus",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        rating: 5,
        text: "2,300 attendees, 50+ exhibitors, two stages running simultaneously — and it all felt effortless from the outside. Aura's coordination was military-precise. We've already re-booked for next year.",
        event: "Innovators Conference & Expo",
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const go = useCallback(
        (index: number) => {
            setDirection(index > current ? 1 : -1);
            setCurrent(index);
        },
        [current]
    );

    const next = useCallback(() => {
        go((current + 1) % testimonials.length);
    }, [current, go]);

    useEffect(() => {
        const id = setInterval(next, 5500);
        return () => clearInterval(id);
    }, [next]);

    const t = testimonials[current];

    return (
        <section className="page-wrap section-y">
            <div className="text-center mb-12 md:mb-16">
                <p className="uppercase tracking-widest text-xs text-black/40 mb-3">Testimonials</p>
                <h2 className="text-3xl md:text-5xl font-extrabold">
                    Clients who trusted us with their biggest moments
                </h2>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold-pale to-[#f5e8b0] dark:to-[#3a3218] border border-gold/20 p-8 md:p-16 min-h-[320px]">
                {/* Quote mark */}
                <div className="absolute top-8 left-8 text-gold/20 text-9xl font-serif leading-none select-none pointer-events-none">
                    &ldquo;
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={t.id}
                        custom={direction}
                        variants={{
                            enter: (d: number) => ({ x: d * 60, opacity: 0 }),
                            center: { x: 0, opacity: 1 },
                            exit: (d: number) => ({ x: d * -60, opacity: 0 }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="relative z-10"
                    >
                        {/* Stars */}
                        <div className="flex gap-1 mb-6">
                            {Array.from({ length: t.rating }).map((_, i) => (
                                <span key={i} className="text-gold text-xl">★</span>
                            ))}
                        </div>

                        <blockquote className="text-lg md:text-2xl font-medium leading-relaxed text-black/80 max-w-[780px]">
                            {t.text}
                        </blockquote>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold/40">
                                <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="48px" />
                            </div>
                            <div>
                                <p className="font-bold text-black">{t.name}</p>
                                <p className="text-sm text-black/50">{t.role}</p>
                                <p className="text-xs text-gold font-medium mt-0.5">{t.event}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dots navigation */}
            <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => go(i)}
                        aria-label={`Testimonial ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${i === current ? "w-8 h-2 bg-gold" : "w-2 h-2 bg-black/20 hover:bg-black/40"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
