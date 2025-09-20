"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function Cta() {
  return (
    <section className="max-w-[900px] mx-auto px-4 md:px-6 lg:px-8 py-20 text-center">
      {/* Icon badge */}
      <motion.div
        initial={{ y: 8, opacity: 0, scale: 0.95 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4 }}
        className="mx-auto mb-6 h-14 w-14 rounded-2xl bg-gradient-to-b from-orange-400 to-orange-500 shadow-[0_10px_30px_-10px_rgba(234,88,12,0.7)] flex items-center justify-center"
        aria-hidden
      >
        {/* chain/link icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11 4" />
          <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L13 20" />
        </svg>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ y: 8, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="text-4xl md:text-6xl font-extrabold tracking-tight"
      >
        We are ready to create an amazing experience for you
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ y: 8, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mt-3 text-base md:text-lg text-black/60 max-w-[620px] mx-auto"
      >
        Tell us your vision and we&apos;d make it our canvas{" "}
        <span className="font-semibold text-black">Aura</span> today. Sign up
        for a free trial.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ y: 8, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="mt-7 flex items-center justify-center gap-3"
      >
        <Link
          href="/contact?type=demo"
          className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-black bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] hover:shadow-md hover:bg-white/90 transition"
        >
          Request a demo
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-b from-orange-500 to-orange-600 shadow-[0_10px_30px_-10px_rgba(234,88,12,0.8)] hover:opacity-95 active:scale-[0.99] transition"
        >
          Start for free
        </Link>
      </motion.div>
    </section>
  );
}

export default Cta;
