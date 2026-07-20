import type { Metadata } from "next";
import SubmitEventForm from "@/components/SubmitEventForm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aura.example";

export const metadata: Metadata = {
    title: "Submit Your Event | Aura Events",
    description:
        "Partner with Aura Events to produce and promote your next event. Submit your event details and our team will reach out within 24 hours.",
    alternates: { canonical: `${SITE_URL}/events/new` },
};

export default function NewEventPage() {
    return (
        <main className="max-w-[900px] mx-auto px-4 md:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 rounded-full bg-gold-pale text-gold px-4 py-2 text-xs font-bold mb-4">
                    🎉 Partner with us
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                    Host your event with Aura
                </h1>
                <p className="text-black/60 max-w-lg mx-auto">
                    From concept to execution, we co-create and produce events that captivate. Tell us about your idea and let&apos;s make it extraordinary.
                </p>
            </div>

            {/* Benefits row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                    { icon: "🎯", label: "Expert planning" },
                    { icon: "📣", label: "Free promotion" },
                    { icon: "🎪", label: "Venue sourcing" },
                    { icon: "📊", label: "Post-event report" },
                ].map((b) => (
                    <div
                        key={b.label}
                        className="rounded-2xl border border-black/5 bg-white p-4 text-center shadow-sm"
                    >
                        <div className="text-2xl mb-2">{b.icon}</div>
                        <p className="text-xs font-bold">{b.label}</p>
                    </div>
                ))}
            </div>

            <SubmitEventForm />
        </main>
    );
}
