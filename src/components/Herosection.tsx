"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useMemo, useRef } from "react";
import { projects } from "@/lib/projects";

function Herosection() {
  // Pick last 4 (most recent) projects
  const slidesData = useMemo(() => {
    // assuming projects are in chronological order; take last 4 and reverse so newest first
    const last4 = projects.slice(-4).reverse();
    return last4.map((p) => ({
      cover: p.cover,
      title: p.title,
      location: p.location,
      date: p.date,
      description: p.description,
      services: p.services,
    }));
  }, []);

  // Container ref to drive scroll-based animations
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // One full-screen slide per page
  const total = slidesData.length; // 4
  const steps = Math.max(total - 1, 1); // 3 transitions
  const extraTail = 1; // hold last slide for a full extra viewport before unpin
  const denom = steps + extraTail; // 4

  // Pages input mapping (0, 1/denom, 2/denom, 3/denom, then 1)
  const pageInputs = Array.from({ length: steps + 1 }, (_, i) => i / denom);
  const inputRange = [...pageInputs, 1];
  const outputRange = [
    ...Array.from({ length: steps + 1 }, (_, i) => `-${i * 100}%`),
    `-${steps * 100}%`,
  ];

  // Horizontal translate per page
  const x = useTransform(scrollYProgress, inputRange, outputRange);
  const xSpring = useSpring(x, { stiffness: 120, damping: 30, mass: 0.6 });

  // Progress for bottom bar (0 -> 1 across section)
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${(steps + extraTail) * 100}vh` }}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        {/* Slides track */}
        <motion.div
          style={{ x: xSpring }}
          className="absolute inset-0 flex flex-nowrap will-change-transform"
        >
          {slidesData.map((s, idx) => (
            <div
              key={`${s.title}-${idx}`}
              className="relative w-screen h-screen shrink-0"
            >
              {/* Background cover */}
              <Image
                src={s.cover}
                alt={s.title}
                fill
                sizes="100vw"
                priority={idx === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70" />

              {/* Content overlay (left like Netflix) */}
              <div className="absolute inset-0 z-20 px-6 md:px-12 lg:px-20 py-10 flex flex-col justify-center max-w-[1200px]">
                <div className="bg-white/20 p-2 rounded-full flex items-center gap-2 w-fit mb-4">
                  <div className="bg-white/20 py-1 px-2 rounded-full">
                    <p className="text-xs text-white">🎉 New</p>
                  </div>
                  <p className="text-white text-xs">Featured project</p>
                </div>

                {/* Headline with typewriter retained */}
                <div className="relative w-full min-h-[110px] md:min-h-[160px] xl:min-h-[200px] transition-[min-height] duration-500 ease-out">
                  <motion.h1
                    layout
                    className="text-4xl md:text-6xl xl:text-[110px] leading-tight md:leading-[80px] xl:leading-[110px] font-bold text-white break-words max-w-[90vw] transition-all duration-500 ease-out"
                  >
                    <TypeAnimation
                      sequence={[
                        "Your No. 1 Event Planner and Host",
                        1000,
                        "Creating Unforgettable Moments",
                        1000,
                        "Perfect Events, Seamlessly Planned",
                        1000,
                      ]}
                      wrapper="span"
                      speed={50}
                      style={{ display: "inline-block" }}
                      repeat={Infinity}
                    />
                  </motion.h1>
                </div>

                {/* Project details */}
                <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-white">
                  {s.title}
                </h2>
                <p className="mt-2 max-w-2xl text-white/80 text-sm md:text-base line-clamp-3">
                  {s.description}
                </p>
                <div className="mt-3 flex items-center gap-3 text-white/80 text-sm">
                  <span>{s.location}</span>
                  <span className="opacity-50">•</span>
                  <span>{s.date}</span>
                </div>

                <div className="mt-5 flex gap-3">
                  <button className="bg-white text-black px-5 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition">
                    Book Now
                  </button>
                  <button className="border border-white text-white px-5 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition">
                    Make Enquiries
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom thumbnails like Netflix row */}
        <div className="absolute left-0 right-0 bottom-4 z-30 px-6 md:px-12 lg:px-20">
          <div className="relative">
            <div className="grid grid-cols-4 gap-3">
              {slidesData.map((s, i) => (
                <div
                  key={`thumb-${s.title}-${i}`}
                  className="relative h-16 md:h-32 rounded-sm overflow-hidden ring-1 ring-white/10"
                >
                  <Image
                    src={s.cover}
                    alt={s.title}
                    fill
                    sizes="(min-width:1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-20 transition-opacity" />
                </div>
              ))}
            </div>
            {/* Progress bar indicating scroll across slides */}
            <div className="mt-2 h-1 w-full bg-white/20 rounded">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-white rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Herosection;
