"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const team = [
  {
    name: "Rachael Iyiola",
    role: "Founder & Creative Director",
    bio: "The vision behind Aura. Rachael sets the creative north star — from first brief to the last light cue — so every event feels authored, not assembled.",
    avatar: "/assets/rachael-iyiola.png",
    cue: "CD-01",
    speciality: "Creative Direction",
    years: "Founder on the floor",
    signature: "Every Aura brief starts as a story, not a checklist",
    quote: "If it doesn't give you chills, we rebuild it.",
    asks: ["The first 10 minutes", "Guest emotion", "When to say no"],
  },
  {
    name: "Anne Iyiola",
    role: "Head of Operations",
    bio: "Anne keeps the machine invisible. Timelines, vendors, run-of-show, and the 48-hour checklist — so the night feels effortless from the inside out.",
    avatar: "/assets/anne-iyiola.jpeg",
    cue: "OP-02",
    speciality: "Operations",
    years: "Systems that don't slip",
    signature: "Show-day ops — vendors, cues, and zero surprises",
    quote: "Beautiful ideas need a ruthless timeline.",
    asks: ["Load-in windows", "Vendor SLAs", "The 48-hour list"],
  },
  {
    name: "Samuel Ganiu",
    role: "Media & Content Director",
    bio: "Motion, stills, and the story after the last toast. Samuel captures the night so it lives beyond the room — film, content, and visual identity in one brief.",
    avatar: "/assets/samuel-ganiu.jpeg",
    cue: "MD-03",
    speciality: "Media & Content",
    years: "Design + lens + edit",
    signature: "Highlight reels that feel like you were in the room",
    quote: "If it isn't felt on camera, it didn't happen.",
    asks: ["Shot lists", "Reel timing", "Brand films"],
  },
  {
    name: "Amara Diallo",
    role: "Lead Event Designer",
    bio: "Floral architecture, colour theory, and spatial storytelling — Amara transforms every venue into a work of art.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=900&auto=format&fit=crop",
    cue: "DS-04",
    speciality: "Décor & Florals",
    years: "Colour as choreography",
    signature: "Ikoyi garden shower — pastel picnic, custom photo wall",
    quote: "A room should feel like a plot twist.",
    asks: ["Palette rules", "Ceiling moments", "Scent & light"],
  },
  {
    name: "Yemi Balogun",
    role: "Client Experience Manager",
    bio: "Your single point of contact from first call to final debrief. Yemi ensures you're always informed and never stressed.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop",
    cue: "CX-05",
    speciality: "Client Relations",
    years: "One number. Always.",
    signature: "Heal Africa dinner — 40% over fundraising target",
    quote: "You should only feel the magic, never the machinery.",
    asks: ["Run-of-show", "Family politics", "The 48-hour list"],
  },
];

export default function Team() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const member = team[active];

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.4);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const tiltX = useTransform(sy, [0, 1], [6, -6]);
  const tiltY = useTransform(sx, [0, 1], [-8, 8]);
  const spotBg = useTransform([sx, sy], ([x, y]) => {
    const px = typeof x === "number" ? x : 0.5;
    const py = typeof y === "number" ? y : 0.42;
    return `radial-gradient(420px 420px at ${px * 100}% ${py * 100}%, rgba(212,168,83,0.45), transparent 62%)`;
  });

  const go = useCallback((i: number) => {
    setActive((i + team.length) % team.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(active + 1), 5600);
    return () => window.clearInterval(id);
  }, [active, paused, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!sectionRef.current?.contains(document.activeElement) &&
          document.activeElement !== document.body) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(active + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(active - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  const onStageMove = (e: { clientX: number; clientY: number }) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={sectionRef}
      className="page-wrap section-y"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-labelledby="team-heading"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
        <div>
          <p className="uppercase tracking-[0.22em] text-xs text-black/40 mb-3">
            Tonight&apos;s call sheet
          </p>
          <h2 id="team-heading" className="text-3xl md:text-5xl font-extrabold">
            The people behind{" "}
            <span className="text-gold">the show</span>
          </h2>
          <p className="mt-4 text-black/60 max-w-md leading-relaxed">
            Click a pass. Hover the stage. Arrow keys work too — this is the
            crew who will be in your ear on the night.
          </p>
        </div>
        <p className="text-[11px] uppercase tracking-widest text-black/35">
          {paused ? "Paused · your cue" : "Live reel · auto-advancing"}
          <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle" style={{ animation: paused ? "none" : "team-cue-pulse 1.4s ease-in-out infinite" }} />
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.85fr)] gap-4 md:gap-5">
        {/* Stage */}
        <motion.div
          ref={stageRef}
          onMouseMove={onStageMove}
          onMouseLeave={() => {
            mx.set(0.5);
            my.set(0.42);
          }}
          style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
          className="relative min-h-[560px] md:min-h-[680px] overflow-hidden rounded-[2rem] bg-black text-white"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={member.avatar}
                alt={member.name}
                fill
                sizes="(min-width:1024px) 60vw, 100vw"
                className="object-cover"
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/20" />
          <motion.div
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{ background: spotBg }}
          />

          <div className="absolute top-5 left-5 right-5 flex items-start justify-between gap-4">
            <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">
              Cue {member.cue}
            </span>
            <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
              {member.speciality}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={member.name + "-copy"}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-display text-2xl md:text-4xl leading-snug text-gold-light mb-4">
                  “{member.quote}”
                </p>
                <p className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  {member.name}
                </p>
                <p className="mt-1 text-sm text-white/70">{member.role}</p>
                <p className="mt-4 max-w-lg text-sm text-white/65 leading-relaxed">
                  {member.bio}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/80">
                    {member.years}
                  </span>
                  {member.asks.map((ask) => (
                    <span
                      key={ask}
                      className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/80"
                    >
                      Ask: {ask}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-widest text-gold-muted">
                  Signature · {member.signature}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Call sheet */}
        <div className="flex flex-col gap-3">
          <p className="hidden lg:block text-[10px] uppercase tracking-[0.22em] text-black/35 px-1">
            Cast — select a pass
          </p>
          {team.map((person, i) => {
            const on = i === active;
            return (
              <motion.button
                key={person.cue}
                type="button"
                onClick={() => go(i)}
                onFocus={() => setPaused(true)}
                aria-pressed={on}
                aria-label={`Spotlight ${person.name}`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative flex items-center gap-3 rounded-2xl border p-2.5 text-left transition ${
                  on
                    ? "border-gold bg-gold-pale shadow-[0_0_0_1px_var(--gold)]"
                    : "border-black/8 bg-white hover:border-black/20"
                }`}
              >
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={person.avatar}
                    alt=""
                    fill
                    sizes="64px"
                    className={`object-cover transition duration-500 ${on ? "grayscale-0" : "grayscale group-hover:grayscale-0"}`}
                  />
                  <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[9px] text-white">
                    {person.cue}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-widest text-gold font-semibold">
                    {person.role}
                  </p>
                  <p className="font-extrabold truncate">{person.name}</p>
                  <p className="mt-1 text-xs text-black/50 line-clamp-2">
                    {person.quote}
                  </p>
                </div>
                <span
                  className={`mr-1 h-8 w-8 shrink-0 rounded-full border text-center text-xs leading-8 ${
                    on
                      ? "border-gold bg-gold text-black"
                      : "border-black/10 text-black/30"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.button>
            );
          })}

          <div className="mt-auto flex items-center justify-between gap-3 pt-2 px-1">
            <div className="flex gap-1.5" aria-hidden>
              {team.map((p, i) => (
                <span
                  key={p.cue}
                  className={`h-1 rounded-full transition-all ${
                    i === active ? "w-8 bg-gold" : "w-2 bg-black/15"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(active - 1)}
                className="h-9 w-9 rounded-full border border-black/10 text-sm hover:border-gold hover:text-gold transition"
                aria-label="Previous crew member"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => go(active + 1)}
                className="h-9 w-9 rounded-full border border-black/10 text-sm hover:border-gold hover:text-gold transition"
                aria-label="Next crew member"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
