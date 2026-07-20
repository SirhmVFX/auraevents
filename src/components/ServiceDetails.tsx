"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const services = [
    {
        id: "weddings",
        icon: "💍",
        title: "Weddings & Social Events",
        tagline: "Your love story, our masterpiece",
        description:
            "We believe every wedding should feel as unique as the couple at its centre. From intimate garden ceremonies to lavish 500-guest receptions, our wedding team handles every detail — from the first vendor call to the last dance — so you can be fully present on the most important day of your life.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
        offerings: ["Full wedding planning", "Day-of coordination", "Bridal showers & pre-wedding events", "Destination weddings", "Floral & décor design", "Rehearsal dinner planning"],
        stat: "120+ weddings",
    },
    {
        id: "corporate",
        icon: "🏢",
        title: "Corporate Events",
        tagline: "Where business meets brilliance",
        description:
            "Corporate events are your brand in action. We produce conferences, product launches, award galas, retreats, and town halls that reinforce your culture, engage your stakeholders, and generate real business results. Our production team handles AV, staging, and tech rehearsals so your speakers shine.",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
        offerings: ["Conferences & expos", "Product launches", "Award ceremonies & galas", "Corporate retreats", "Town halls & offsites", "Sponsorship activation"],
        stat: "200+ corporate events",
    },
    {
        id: "experiential",
        icon: "🎪",
        title: "Experiential & Brand Activations",
        tagline: "Turn audiences into advocates",
        description:
            "The best marketing is an experience people can't stop talking about. We design immersive brand activations, pop-ups, and experiential campaigns that create emotional connections between brands and their audiences. Measurable engagement, sharable moments, lasting impressions.",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop",
        offerings: ["Brand pop-ups", "Influencer events", "Consumer activations", "Roadshows", "Product sampling experiences", "Social media moments"],
        stat: "80+ activations",
    },
    {
        id: "hybrid",
        icon: "🌐",
        title: "Hybrid & Virtual Events",
        tagline: "No borders, no limits",
        description:
            "The world is connected — your events should be too. We design hybrid experiences where in-person energy and online engagement amplify each other. From professional live streams to interactive virtual platforms, we ensure every attendee feels like they have the best seat in the house.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
        offerings: ["Live streaming production", "Virtual platform setup", "Hybrid event design", "On-demand recording", "Online audience engagement", "Global attendee management"],
        stat: "50+ hybrid events",
    },
];

export default function ServiceDetails() {
    return (
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-10">
            <div className="flex flex-col gap-24">
                {services.map((service, i) => {
                    const isEven = i % 2 === 0;
                    return (
                        <motion.div
                            key={service.id}
                            id={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Image */}
                            <div className={`relative rounded-3xl overflow-hidden h-72 md:h-96 ${!isEven ? "lg:order-2" : ""}`}>
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width:1024px) 50vw, 100vw"
                                />
                                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 backdrop-blur px-4 py-2 text-xs font-bold text-black shadow">
                                    {service.stat}
                                </div>
                            </div>

                            {/* Content */}
                            <div className={!isEven ? "lg:order-1" : ""}>
                                <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1.5 text-xs font-semibold mb-4">
                                    <span className="text-xl">{service.icon}</span>
                                    {service.tagline}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{service.title}</h2>
                                <p className="text-black/60 leading-relaxed mb-6">{service.description}</p>

                                <div className="grid grid-cols-2 gap-2 mb-6">
                                    {service.offerings.map((o) => (
                                        <div key={o} className="flex items-center gap-2 text-sm text-black/70">
                                            <span className="text-orange-500">✓</span>
                                            {o}
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href={`/contact?service=${service.id}`}
                                    className="inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-2.5 text-sm font-bold hover:opacity-90 transition"
                                >
                                    Plan this event →
                                </Link>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
