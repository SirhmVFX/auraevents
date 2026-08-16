import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import Cta from "@/components/Cta";
import ServicesPageHero from "@/components/ServicesPageHero";
import ServiceDetails from "@/components/ServiceDetails";
import Process from "@/components/Process";
import MoodboardBuilder from "@/components/MoodboardBuilder";
import PackageComparison from "@/components/PackageComparison";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aura.example";

export const metadata: Metadata = {
    title: "Event Planning Services | Aura Events",
    description:
        "Full-service event planning: weddings, corporate events, galas, hybrid events, activations, and private celebrations. Transparent pricing packages included.",
    alternates: { canonical: `${SITE_URL}/services` },
    openGraph: {
        title: "Event Planning Services | Aura Events",
        description:
            "Full-service event planning from weddings to corporate conferences. See our packages and process.",
        url: `${SITE_URL}/services`,
        siteName: "Aura Events",
        type: "website",
    },
};

export default function ServicesPage() {
    return (
        <main>
            <ServicesPageHero />
            <ServiceDetails />
            <MoodboardBuilder />
            <Process />
            <Pricing />
            <PackageComparison />
            <Cta />
        </main>
    );
}
