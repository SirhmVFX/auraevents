"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    HomeIcon,
    InfoIcon,
    CalendarIcon,
    BriefcaseIcon,
    MailIcon,
} from "./Icons";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

const Links = [
    { name: "Home", href: "/", icon: <HomeIcon /> },
    { name: "About", href: "/about", icon: <InfoIcon /> },
    { name: "Services", href: "/services", icon: <BriefcaseIcon /> },
    { name: "Events", href: "/events", icon: <CalendarIcon /> },
    { name: "Projects", href: "/projects", icon: <BriefcaseIcon /> },
    { name: "Contact", href: "/contact", icon: <MailIcon /> },
];

export default function MobileNav({ isSolid = true }: { isSolid?: boolean }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Close on route change
    useEffect(() => { setOpen(false); }, [pathname]);

    // Prevent body scroll when open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    // Hamburger bar colour: white on transparent hero, follows theme once header is solid
    const barColor = isSolid
        ? isDark
            ? "bg-white"
            : "bg-black"
        : "bg-white";

    return (
        <>
            {/* Hamburger */}
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-white/10 transition"
            >
                <motion.span
                    animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    className={`block w-5 h-0.5 rounded origin-center transition-colors duration-300 ${barColor}`}
                    transition={{ duration: 0.25 }}
                />
                <motion.span
                    animate={open ? { opacity: 0 } : { opacity: 1 }}
                    className={`block w-5 h-0.5 rounded transition-colors duration-300 ${barColor}`}
                    transition={{ duration: 0.15 }}
                />
                <motion.span
                    animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    className={`block w-5 h-0.5 rounded origin-center transition-colors duration-300 ${barColor}`}
                    transition={{ duration: 0.25 }}
                />
            </button>

            {/* Overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Drawer */}
            <AnimatePresence>
                {open && (
                    <motion.nav
                        key="drawer"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 320, damping: 32 }}
                        className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-card text-foreground shadow-2xl flex flex-col md:hidden"
                    >
                        {/* Drawer header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-foreground/10">
                            <span className="text-2xl font-extrabold tracking-tight">Aura</span>
                            <div className="flex items-center gap-1">
                                <ThemeToggle />
                                <button
                                    onClick={() => setOpen(false)}
                                    aria-label="Close menu"
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-foreground/5 transition text-foreground"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Links */}
                        <ul className="flex flex-col gap-1 p-4 flex-1">
                            {Links.map((link, i) => {
                                const isActive = pathname === link.href;
                                return (
                                    <motion.li
                                        key={link.name}
                                        initial={{ x: 24, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.05, duration: 0.25 }}
                                    >
                                        <Link
                                            href={link.href}
                                            aria-current={isActive ? "page" : undefined}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${isActive
                                                    ? "bg-foreground text-background"
                                                    : "text-foreground hover:bg-foreground/5"
                                                }`}
                                        >
                                            <span className="opacity-70">{link.icon}</span>
                                            {link.name}
                                        </Link>
                                    </motion.li>
                                );
                            })}
                        </ul>

                        {/* CTA */}
                        <div className="p-4 border-t border-foreground/10">
                            <Link
                                href="/contact"
                                className="flex items-center justify-center w-full py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition"
                            >
                                Book a Free Consultation
                            </Link>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    );
}
