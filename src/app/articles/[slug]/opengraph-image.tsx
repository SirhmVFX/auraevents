// src/app/articles/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import articles from "@/lib/articles";

export const runtime = "edge";
export const alt = "Aura Events Article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const a = articles.find((x) => x.slug === params.slug);
  const title = a?.title ?? "Aura Events";
  const subtitle = a?.keyword ?? "Event Planning";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background:
            "radial-gradient(900px 540px at 15% 10%, #ffffff, #ffe7d6 40%, #ffb77a 75%, #f97316)",
        }}
      >
        {/* Aura logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(180deg,#ff7a18,#ff571f)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 15px 50px rgba(249,115,22,0.45)",
            }}
          >
            {/* chain glyph */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="26"
              height="26"
            >
              <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11 4" />
              <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L13 20" />
            </svg>
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#111827" }}>
            Aura Events
          </span>
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#111827",
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 28,
            color: "#1f2937",
            fontWeight: 600,
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 20,
            display: "inline-flex",
            padding: "10px 16px",
            background: "#111827",
            color: "#fff",
            borderRadius: 999,
          }}
        >
          auraevents.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
