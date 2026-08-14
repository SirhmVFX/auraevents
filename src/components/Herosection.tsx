"use client";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { projects } from "@/lib/projects";

function Herosection() {
  const slidesData = useMemo(() => {
    const last4 = projects.slice(-4).reverse();
    return last4.map((p) => ({
      cover: p.cover,
      title: p.title,
      location: p.location,
      date: p.date,
      description: p.description,
    }));
  }, []);

  const [active, setActive] = useState(0);
  const current = slidesData[active];

  return (
    <section className="relative w-full h-screen min-h-[640px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={current.cover}
            alt={current.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/80" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full max-w-[1200px] mx-auto px-5 md:px-8 lg:px-10 flex flex-col justify-center pt-16 pb-36 md:pb-44">
        <div className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 w-fit mb-6">
          <div className="bg-white/20 py-0.5 px-2 rounded-full">
            <p className="text-[11px] text-white">Featured</p>
          </div>
          <p className="text-white/90 text-[11px] pr-1">{current.title}</p>
        </div>

        <h1 className="text-4xl md:text-6xl xl:text-7xl leading-[1.1] font-bold text-white max-w-4xl min-h-[2.4em]">
          <TypeAnimation
            sequence={[
              "Your No. 1 Event Planner and Host",
              1400,
              "Creating Unforgettable Moments",
              1400,
              "Perfect Events, Seamlessly Planned",
              1400,
            ]}
            wrapper="span"
            speed={50}
            style={{ display: "inline-block" }}
            repeat={Infinity}
          />
        </h1>

        <p className="mt-5 max-w-xl text-white/75 text-sm md:text-base leading-relaxed line-clamp-2">
          {current.description}
        </p>
        <p className="mt-3 text-white/55 text-sm">
          {current.location}
          <span className="mx-2 opacity-40">·</span>
          {current.date}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/contact"
            className="bg-white text-black px-6 py-3 rounded-full font-semibold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition"
          >
            Book Now
          </a>
          <a
            href="/contact#enquiry"
            className="border border-white/70 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/10 transition"
          >
            Make Enquiries
          </a>
        </div>
      </div>

      <div className="absolute left-0 right-0 bottom-8 z-30 px-5 md:px-8 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-4 gap-2.5 md:gap-4">
            {slidesData.map((s, i) => (
              <button
                key={`thumb-${s.title}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${s.title}`}
                className={`relative h-14 md:h-24 rounded-xl overflow-hidden transition ring-2 ${
                  i === active
                    ? "ring-white scale-[1.02]"
                    : "ring-white/10 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={s.cover}
                  alt={s.title}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Herosection;
