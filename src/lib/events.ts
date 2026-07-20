export type EventItem = {
    id: number;
    slug: string;
    title: string;
    category: "Wedding" | "Corporate" | "Gala" | "Activation" | "Private" | "Hybrid";
    date: string; // ISO
    displayDate: string;
    time: string;
    location: string;
    venue: string;
    cover: string;
    description: string;
    capacity: number;
    spotsLeft: number;
    price: string;
    tags: string[];
    featured?: boolean;
    status: "upcoming" | "sold-out" | "past";
};

export const events: EventItem[] = [
    {
        id: 1,
        slug: "aura-wedding-masterclass-2026",
        title: "Aura Wedding Masterclass 2026",
        category: "Wedding",
        date: "2026-08-15",
        displayDate: "Aug 15, 2026",
        time: "10:00 AM – 4:00 PM",
        location: "Victoria Island, Lagos",
        venue: "Eko Hotel & Suites",
        cover: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
        description:
            "An exclusive one-day masterclass for brides-to-be and event professionals. Featuring live décor demonstrations, vendor speed-dating, and keynotes from top planners.",
        capacity: 80,
        spotsLeft: 14,
        price: "₦45,000",
        tags: ["Weddings", "Education", "Networking"],
        featured: true,
        status: "upcoming",
    },
    {
        id: 2,
        slug: "corporate-event-bootcamp",
        title: "Corporate Event Planning Bootcamp",
        category: "Corporate",
        date: "2026-09-20",
        displayDate: "Sep 20, 2026",
        time: "9:00 AM – 5:00 PM",
        location: "Lagos Island",
        venue: "Civic Centre, VI",
        cover: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
        description:
            "A hands-on full-day bootcamp covering corporate event logistics, AV production, sponsorship activation, and run-of-show management. CPD certified.",
        capacity: 60,
        spotsLeft: 22,
        price: "₦65,000",
        tags: ["Corporate", "Education", "CPD"],
        status: "upcoming",
    },
    {
        id: 3,
        slug: "aura-gala-2026",
        title: "Aura Annual Gala Night 2026",
        category: "Gala",
        date: "2026-12-05",
        displayDate: "Dec 5, 2026",
        time: "7:00 PM – 12:00 AM",
        location: "Ikoyi, Lagos",
        venue: "The Wheatbaker Hotel",
        cover: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
        description:
            "Our flagship annual celebration. A black-tie gala honouring excellence in Nigerian events. Red carpet, live entertainment, awards, and exquisite dining.",
        capacity: 350,
        spotsLeft: 76,
        price: "₦120,000",
        tags: ["Gala", "Awards", "Networking", "Black Tie"],
        featured: true,
        status: "upcoming",
    },
    {
        id: 4,
        slug: "brand-activation-summit",
        title: "Brand Activation Summit Lagos",
        category: "Activation",
        date: "2026-10-10",
        displayDate: "Oct 10, 2026",
        time: "10:00 AM – 6:00 PM",
        location: "Lekki, Lagos",
        venue: "The Landmark Event Centre",
        cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
        description:
            "A day of inspiration for brand managers, agencies, and event creatives. Keynotes, workshops, and a live activation showcase featuring Nigeria's boldest campaigns.",
        capacity: 200,
        spotsLeft: 0,
        price: "₦55,000",
        tags: ["Branding", "Activation", "Marketing"],
        status: "sold-out",
    },
    {
        id: 5,
        slug: "hybrid-events-workshop",
        title: "Mastering Hybrid Events Workshop",
        category: "Hybrid",
        date: "2026-08-28",
        displayDate: "Aug 28, 2026",
        time: "2:00 PM – 5:00 PM",
        location: "Online + Lagos Hub",
        venue: "Co-Creation Hub (CcHUB)",
        cover: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
        description:
            "A 3-hour deep dive into producing hybrid events that delight both in-room and virtual audiences. Tech stack, streaming, and engagement tools covered.",
        capacity: 120,
        spotsLeft: 41,
        price: "₦25,000",
        tags: ["Hybrid", "Tech", "Education"],
        status: "upcoming",
    },
    {
        id: 6,
        slug: "private-dining-experience",
        title: "Aura Private Dining Experience",
        category: "Private",
        date: "2026-09-06",
        displayDate: "Sep 6, 2026",
        time: "7:30 PM – 11:00 PM",
        location: "Ikoyi, Lagos",
        venue: "Private Residence (Address on booking)",
        cover: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1200&auto=format&fit=crop",
        description:
            "An intimate 20-person curated dining experience — bespoke menu, ambient décor, live acoustics, and a sneak peek at our new event concepts. Invitation only.",
        capacity: 20,
        spotsLeft: 5,
        price: "₦85,000",
        tags: ["Private", "Dining", "Exclusive"],
        featured: true,
        status: "upcoming",
    },
];

export const getEventBySlug = (slug: string) =>
    events.find((e) => e.slug === slug);
