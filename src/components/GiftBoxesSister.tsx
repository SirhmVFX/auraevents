import Link from "next/link";

const GIFTBOXES_URL =
  process.env.NEXT_PUBLIC_GIFTBOXES_URL || "https://auragiftboxes.vercel.app";

export default function GiftBoxesSister() {
  return (
    <section className="page-wrap pb-16">
      <div className="rounded-3xl bg-black text-white p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Sister studio</p>
          <h2 className="font-display text-3xl md:text-5xl mt-2">
            Book an event. Add gift bags automatically.
          </h2>
          <p className="mt-3 text-white/70 max-w-xl text-sm">
            Aura Gift Boxes coordinates guest totes with your Aura Events plan —
            same team, same ribbon language, no extra vendor hunt.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href={`${GIFTBOXES_URL}/consult?from=events`}
            className="rounded-full bg-white text-black px-5 py-2.5 text-sm font-bold text-center"
          >
            Add gift bags
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold text-center"
          >
            Book an event
          </Link>
        </div>
      </div>
    </section>
  );
}
