"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "Eko Hotels & Suites", category: "Venue", logo: "/partners/eko.png" },
  {
    name: "The Wheatbaker",
    category: "Venue",
    logo: "/partners/wheatbaker.png",
  },
  {
    name: "Landmark Africa",
    category: "Venue",
    logo: "/partners/landmark.png",
  },
  {
    name: "Radisson Blu",
    category: "Hospitality",
    logo: "/partners/radisson.png",
  },
  { name: "Marriott", category: "Hospitality", logo: "/partners/marriott.svg" },
  { name: "Hilton", category: "Hospitality", logo: "/partners/hilton.svg" },
  { name: "MTN Nigeria", category: "Brand", logo: "/partners/mtn.png" },
  { name: "GTBank", category: "Brand", logo: "/partners/gtbank.svg" },
  { name: "Access Bank", category: "Brand", logo: "/partners/access.svg" },
  { name: "Coca-Cola", category: "Brand", logo: "/partners/cocacola.svg" },
  { name: "Nestlé", category: "Brand", logo: "/partners/nestle.png" },
  { name: "Dangote", category: "Brand", logo: "/partners/dangote.png" },
  { name: "Flutterwave", category: "Brand", logo: "/partners/flutterwave.png" },
  { name: "Air Peace", category: "Brand", logo: "/partners/airpeace.png" },
  { name: "Nigerian Breweries", category: "Brand", logo: "/partners/nb.png" },
];

const row1 = [...partners.slice(0, 8), ...partners.slice(0, 8)];
const row2 = [...partners.slice(8), ...partners.slice(8)];

function PartnerCard({ p }: { p: (typeof partners)[0] }) {
  const isSvg = p.logo.endsWith(".svg");
  const logoClass = "h-[70%] w-[70%] object-contain";

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-black/5 bg-card px-5 py-4 shadow-sm shrink-0 min-w-[240px]">
      <div className="logo-tile relative w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center p-2.5 shrink-0">
        {isSvg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.logo} alt={`${p.name} logo`} className={logoClass} />
        ) : (
          <Image
            src={p.logo}
            alt={`${p.name} logo`}
            width={80}
            height={80}
            className={logoClass}
          />
        )}
      </div>
      <div>
        <p className="text-sm font-bold whitespace-nowrap">{p.name}</p>
        <p className="text-[10px] text-black/40">{p.category}</p>
      </div>
    </div>
  );
}

export default function VendorPartners() {
  return (
    <section className="section-y overflow-hidden">
      <div className="page-wrap mb-12 md:mb-14 text-center">
        <p className="uppercase tracking-widest text-xs text-black/40 mb-3">
          Trusted partners
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Connected to Lagos&apos;s finest
        </h2>
        <p className="mt-3 text-sm text-black/50 max-w-lg mx-auto">
          We&apos;ve spent 12+ years building relationships with the best
          venues, caterers, photographers, and specialists — so you get access
          to a curated network, not a random vendor list.
        </p>
      </div>

      <div className="relative mb-4 group/row">
        <div
          className="flex gap-3 animate-[scroll-left_40s_linear_infinite] group-hover/row:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {row1.map((p, i) => (
            <PartnerCard key={`r1-${i}`} p={p} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>

      <div className="relative group/row">
        <div
          className="flex gap-3 animate-[scroll-right_45s_linear_infinite] group-hover/row:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {row2.map((p, i) => (
            <PartnerCard key={`r2-${i}`} p={p} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center mt-12 md:mt-14"
      >
        <p className="text-sm text-black/40">
          Are you a vendor?{" "}
          <a
            href="mailto:partners@aura.com"
            className="underline text-black/70 hover:text-black transition"
          >
            Apply to join our network →
          </a>
        </p>
      </motion.div>
    </section>
  );
}
