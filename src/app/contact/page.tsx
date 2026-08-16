import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aura.example";

export const metadata: Metadata = {
    title: "Contact Aura Events | Book a Free Consultation",
    description:
        "Ready to plan your dream event? Contact Aura Events for a free consultation. Weddings, corporate events, galas, activations — we handle it all.",
    alternates: { canonical: `${SITE_URL}/contact` },
    openGraph: {
        title: "Contact Aura Events | Book a Free Consultation",
        description:
            "Get in touch with the Aura Events team. Free consultations available for weddings, corporate events, and more.",
        url: `${SITE_URL}/contact`,
        siteName: "Aura Events",
        type: "website",
    },
};

export default function ContactPage() {
    return (
        <main>
        <div className="page-wrap page-y">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                {/* Left: info */}
                <div className="lg:col-span-2">
                    <p className="uppercase tracking-widest text-xs text-black/40 mb-4">Get in touch</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                        Let&apos;s create something <span className="text-gold">extraordinary</span>
                    </h1>
                    <p className="text-black/60 leading-relaxed mb-5">
                        Tell us about your event. Whether you have a fully formed vision or just a feeling, our team will help shape it into something unforgettable.
                    </p>
                    <a
                        href="#availability"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark transition mb-10"
                    >
                        Or check available dates ↓
                    </a>

                    <div className="flex flex-col gap-8">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gold-pale flex items-center justify-center text-lg flex-shrink-0">
                                📍
                            </div>
                            <div>
                                <h3 className="font-bold mb-1">Office — Lagos</h3>
                                <p className="text-sm text-black/60">
                                    14 Akin Adesola Street,<br />
                                    Victoria Island, Lagos
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-lg flex-shrink-0">
                                📧
                            </div>
                            <div>
                                <h3 className="font-bold mb-1">Email</h3>
                                <a href="mailto:hello@aura.com" className="text-sm text-black/60 hover:text-black transition">
                                    hello@aura.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-lg flex-shrink-0">
                                📞
                            </div>
                            <div>
                                <h3 className="font-bold mb-1">Phone / WhatsApp</h3>
                                <a href="tel:+2348012345678" className="text-sm text-black/60 hover:text-black transition">
                                    +234 801 234 5678
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-lg flex-shrink-0">
                                ⏱️
                            </div>
                            <div>
                                <h3 className="font-bold mb-1">Response time</h3>
                                <p className="text-sm text-black/60">
                                    We reply within 24 hours on business days.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Guarantee badge */}
                    <div className="mt-12 rounded-2xl bg-black text-white p-6">
                        <div className="text-2xl mb-2">🛡️</div>
                        <h3 className="font-extrabold mb-1">Our Promise</h3>
                        <p className="text-sm text-white/70 leading-relaxed">
                            Free consultation, no pressure. We&apos;ll listen to your vision, share honest advice, and only move forward if the fit is right — for both of us.
                        </p>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="lg:col-span-3">
                    <ContactForm />
                </div>
            </div>
        </div>
        <AvailabilityCalendar />
        </main>
    );
}
