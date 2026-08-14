"use client";

import { usePathname } from "next/navigation";

/**
 * On the homepage the hero slides under the fixed header intentionally,
 * so no top padding is needed. Every other page needs padding-top to
 * offset the fixed header height (~68px).
 */
export default function MainContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <main className={isHome ? "" : "pt-20"}>
            {children}
        </main>
    );
}
