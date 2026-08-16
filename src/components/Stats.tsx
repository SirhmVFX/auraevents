"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    { value: 500, suffix: "+", label: "Events Executed", icon: "🎉" },
    { value: 98, suffix: "%", label: "Client Satisfaction", icon: "⭐" },
    { value: 12, suffix: "yrs", label: "Industry Experience", icon: "🏆" },
    { value: 50000, suffix: "+", label: "Happy Guests", icon: "🎊" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    useEffect(() => {
        if (!inView) return;
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            setCount(Math.floor(current));
            if (current >= target) clearInterval(timer);
        }, duration / steps);
        return () => clearInterval(timer);
    }, [inView, target]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

export default function Stats() {
    return (
        <section className="page-wrap section-y">
            <div className="rounded-3xl px-4 md:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <p className="uppercase tracking-widest text-xs text-black/40 mb-3">By the numbers</p>
                    <h2 className="text-3xl md:text-5xl font-extrabold">Results that speak for themselves</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ y: 24, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.45, delay: i * 0.08 }}
                            className="text-center"
                        >
                            <div className="text-3xl mb-4">{s.icon}</div>
                            <div className="text-4xl md:text-5xl font-extrabold text-foreground">
                                <AnimatedNumber target={s.value} suffix={s.suffix} />
                            </div>
                            <p className="mt-3 text-sm text-black/50">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
