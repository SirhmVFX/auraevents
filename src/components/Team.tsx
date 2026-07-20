"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const team = [
    {
        name: "Nnenna Obi",
        role: "Founder & Creative Director",
        bio: "15+ years turning blank spaces into immersive worlds. Former event director at Marriott International.",
        avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop",
        emoji: "✨",
        speciality: "Luxury Weddings",
    },
    {
        name: "Kofi Mensah",
        role: "Head of Production",
        bio: "AV wizard and logistics master. Kofi has produced stages for audiences from 50 to 10,000.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
        emoji: "🎛️",
        speciality: "Corporate & Tech Events",
    },
    {
        name: "Amara Diallo",
        role: "Lead Event Designer",
        bio: "Floral architecture, colour theory, and spatial storytelling — Amara transforms every venue into a work of art.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
        emoji: "🌸",
        speciality: "Décor & Florals",
    },
    {
        name: "Yemi Balogun",
        role: "Client Experience Manager",
        bio: "Your single point of contact from first call to final debrief. Yemi ensures you're always informed and never stressed.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
        emoji: "🤝",
        speciality: "Client Relations",
    },
];

export default function Team() {
    return (
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-20">
            <div className="text-center mb-12">
                <p className="uppercase tracking-widest text-xs text-black/40 mb-2">Meet the team</p>
                <h2 className="text-3xl md:text-5xl font-extrabold">
                    The people behind <br className="hidden md:block" />
                    your perfect event
                </h2>
                <p className="mt-4 text-black/60 max-w-lg mx-auto">
                    Passionate, detail-obsessed, and genuinely excited about every single event we touch.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member, i) => (
                    <motion.div
                        key={member.name}
                        initial={{ y: 24, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                        className="group text-center rounded-3xl bg-white border border-black/5 shadow-sm overflow-hidden"
                    >
                        <div className="relative h-60 w-full overflow-hidden bg-gradient-to-b from-gold-pale to-[#f5e8b0]">
                            <Image
                                src={member.avatar}
                                alt={member.name}
                                fill
                                sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-lg shadow">
                                {member.emoji}
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-extrabold text-lg">{member.name}</h3>
                            <p className="text-xs text-gold font-semibold mb-2">{member.role}</p>
                            <p className="text-xs text-black/60 leading-relaxed">{member.bio}</p>
                            <div className="mt-3 inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/60">
                                {member.speciality}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
