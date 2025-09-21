// src/app/articles/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import articles from "@/lib/articles";
import Views from "@/components/Views";

type Props = { params: { slug: string } };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aura.example";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const a = articles.find((x) => x.slug === params.slug);
  if (!a) return {};
  const url = `${SITE_URL}/articles/${a.slug}`;
  const og = `${url}/opengraph-image`;
  const tw = `${url}/twitter-image`;
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: a.metaTitle,
      description: a.metaDescription,
      url,
      siteName: "Aura Events",
      images: [{ url: og, width: 1200, height: 630, alt: a.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: a.metaTitle,
      description: a.metaDescription,
      images: [tw],
    },
  };
}

function JsonLd({ slug }: { slug: string }) {
  const a = articles.find((x) => x.slug === slug);
  if (!a) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    datePublished: a.date,
    wordcount: a.paragraphs.join(" ").split(/\s+/).length,
    keywords: a.keyword,
    mainEntityOfPage: `${SITE_URL}/articles/${a.slug}`,
    author: { "@type": "Organization", name: "Aura Events" },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: a.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: a.title,
    step: a.howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
      />
    </>
  );
}

export default function ArticlePage({ params }: Props) {
  const a = articles.find((x) => x.slug === params.slug);
  if (!a) return notFound();

  return (
    <main className="max-w-[900px] mx-auto px-4 md:px-6 lg:px-8 py-16">
      <JsonLd slug={a.slug} />

      <header className="mb-8">
        <p className="text-sm text-black/50">
          {new Date(a.date).toLocaleDateString()} • {a.readTime}
          <span className="mx-2">•</span>
          <Views slug={a.slug} />
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">
          {a.heroTitle}
        </h1>
        <p className="mt-2 text-black/70">{a.heroSubtitle}</p>
        <a
          href={a.ctaHref}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm hover:opacity-90 transition"
        >
          {a.ctaLabel} →
        </a>
      </header>

      <article className="prose prose-neutral max-w-none">
        {a.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <h2>How to guide</h2>
        <ol>
          {a.howToSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>

        <h2>Frequently asked questions</h2>
        {a.faq.map((f, i) => (
          <details key={i} className="mb-3">
            <summary className="font-semibold cursor-pointer">{f.q}</summary>
            <p className="mt-2">{f.a}</p>
          </details>
        ))}

        <h2>Helpful resources</h2>
        <ul>
          {a.backlinks.map((b, i) => (
            <li key={i}>
              <a href={b.href} target="_blank" rel="noopener noreferrer">
                {b.label}
              </a>
            </li>
          ))}
        </ul>
      </article>

      {a.related.length > 0 && (
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-3">Related articles</h3>
          <ul className="list-disc list-inside">
            {a.related.map((slug) => {
              const r = articles.find((x) => x.slug === slug);
              if (!r) return null;
              return (
                <li key={slug}>
                  <a className="hover:underline" href={`/articles/${r.slug}`}>
                    {r.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}
