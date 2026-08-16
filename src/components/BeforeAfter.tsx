"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";

const transformations = projects
    .filter((p) => p.beforeAfter && p.beforeAfter.length > 0)
    .map((p) => ({
        title: p.title,
        eventType: p.eventType,
        slug: p.slug,
        items: p.beforeAfter!,
    }));

function Slider({ before, after, caption }: { before: string; after: string; caption: string }) {
    const [pos, setPos] = useState(50);
    const isDragging = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const updatePos = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
        setPos(pct);
    }, []);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging.current) return;
        updatePos(e.clientX);
    }, [updatePos]);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        updatePos(e.touches[0].clientX);
    }, [updatePos]);

    return (
        <div className="flex flex-col gap-3">
            <div
                ref={containerRef}
                className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden cursor-ew-resize select-none"
                onMouseMove={onMouseMove}
                onMouseDown={() => { isDragging.current = true; }}
                onMouseUp={() => { isDragging.current = false; }}
                onMouseLeave={() => { isDragging.current = false; }}
                onTouchMove={onTouchMove}
                role="img"
                aria-label={caption}
            >
                {/* After image (base) */}
                <Image src={after} alt="After" fill className="object-cover" sizes="(min-width:768px) 50vw, 100vw" />

                {/* Before image (clipped) */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                >
                    <Image src={before} alt="Before" fill className="object-cover" sizes="(min-width:768px) 50vw, 100vw" />
                    {/* Before label */}
                    <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                        Before
                    </div>
                </div>

                {/* After label */}
                <div className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                    After
                </div>

                {/* Divider line */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    style={{ left: `${pos}%` }}
                >
                    {/* Handle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-xl flex items-center justify-center">
                        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                            <path d="M5 1L1 6L5 11" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13 1L17 6L13 11" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
            <p className="text-xs text-black/50 text-center">{caption}</p>
        </div>
    );
}

export default function BeforeAfter() {
    if (transformations.length === 0) return null;

    return (
        <section className="page-wrap section-y">
            <div className="text-center mb-12">
                <p className="uppercase tracking-widest text-xs text-black/40 mb-2">Transformations</p>
                <h2 className="text-3xl md:text-5xl font-extrabold">
                    Blank space to breathtaking — <br className="hidden md:block" />
                    drag to reveal
                </h2>
                <p className="mt-4 text-black/50 max-w-md mx-auto text-sm">
                    Drag the slider to see exactly how we transform raw venues into unforgettable event spaces.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {transformations.flatMap((t) =>
                    t.items.map((item, j) => (
                        <motion.div
                            key={`${t.slug}-${j}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-bold uppercase tracking-widest text-black/40">{t.eventType}</span>
                                <span className="text-black/20">·</span>
                                <span className="text-xs text-black/40">{t.title}</span>
                            </div>
                            <Slider before={item.before} after={item.after} caption={item.caption} />
                        </motion.div>
                    ))
                )}
            </div>
        </section>
    );
}
