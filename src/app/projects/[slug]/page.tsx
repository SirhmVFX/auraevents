"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProjectBySlug, getRelatedProjects } from "@/lib/projects";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectDetail({ params }: any) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();
  const related = getRelatedProjects(params.slug, 3);

  return (
    <section className="max-w-[1100px] mx-auto px-4 md:px-6 lg:px-8 py-12">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="uppercase tracking-widest text-sm text-black/50">
            Project
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            {project.title}
          </h1>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm hover:opacity-90 transition"
        >
          ← All projects
        </Link>
      </div>

      <div className="relative w-full h-[320px] md:h-[460px] rounded-2xl overflow-hidden ring-1 ring-black/5">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(min-width:1024px) 1100px, 100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <p className="text-black/70 leading-relaxed text-base">
            {project.description}
          </p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {project.gallery.map((img, i) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="relative h-28 md:h-36 rounded-xl overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${project.title} ${i + 1}`}
                    fill
                    sizes="(min-width:1024px) 33vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <aside className="md:col-span-1">
          <div className="rounded-2xl border border-black/5 bg-white p-4">
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-black/60">Client</dt>
                <dd className="font-medium">{project.client}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-black/60">Date</dt>
                <dd className="font-medium">{project.date}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-black/60">Location</dt>
                <dd className="font-medium">{project.location}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-black/60">Attendees</dt>
                <dd className="font-medium">{project.attendees}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-black/60">Budget</dt>
                <dd className="font-medium">{project.budgetRange}</dd>
              </div>
            </dl>

            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Services</h4>
              <div className="flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Projects */}
      {related.length > 0 && (
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">Related projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((r, i) => (
              <motion.div
                key={r.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="rounded-xl border border-black/5 bg-white overflow-hidden"
              >
                <Link href={`/projects/${r.slug}`} className="block">
                  <div className="relative h-32">
                    <Image
                      src={r.cover}
                      alt={r.title}
                      fill
                      sizes="(min-width:1024px) 33vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold line-clamp-1">{r.title}</h4>
                      <span className="text-xs text-black/50 ml-3 whitespace-nowrap">
                        {r.date}
                      </span>
                    </div>
                    <p className="text-xs text-black/60 mt-1 line-clamp-1">
                      {r.location}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
