"use client";

import { useEffect, useState } from "react";

export default function Views({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let aborted = false;

    const fetchViews = async () => {
      try {
        const res = await fetch(`/api/views/${slug}`, { cache: "no-store" });
        const data = await res.json();
        if (!aborted) setViews(Number(data?.views ?? 0));
      } catch {
        if (!aborted) setViews(null);
      }
    };

    const incr = async () => {
      try {
        const res = await fetch(`/api/views/${slug}`, { method: "POST" });
        const data = await res.json();
        if (!aborted) setViews(Number(data?.views ?? 0));
      } catch {
        // ignore
      }
    };

    fetchViews();
    incr();

    return () => {
      aborted = true;
    };
  }, [slug]);

  if (views === null) return null;
  return (
    <span className="text-xs text-black/50">
      {views.toLocaleString()} views
    </span>
  );
}
