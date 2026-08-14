"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HomeIcon,
  InstagramIcon,
  LinkedInIcon,
  TiktokIcon,
  InfoIcon,
  CalendarIcon,
  BriefcaseIcon,
  MailIcon,
} from "./Icons";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";

function SparkleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v1m0 16v1M4.22 4.22l.7.7m13.16 13.16.7.7M3 12h1m16 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function Header() {
  // pastHero = true once the user has scrolled past the hero
  const [pastHero, setPastHero] = useState(false);
  const pathname = usePathname();

  // Only apply the transparent-white treatment on the homepage where the hero lives
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const threshold = isHome ? window.innerHeight * 0.72 : 10;
      setPastHero(window.scrollY >= threshold);
    };

    onScroll(); // run once on mount in case page is already scrolled
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // On homepage: transparent until hero ends; on other pages: always solid
  const isSolid = !isHome || pastHero;

  const Links = [
    { name: "Home", href: "/", icon: <HomeIcon /> },
    { name: "About", href: "/about", icon: <InfoIcon /> },
    { name: "Services", href: "/services", icon: <SparkleIcon /> },
    { name: "Events", href: "/events", icon: <CalendarIcon /> },
    { name: "Projects", href: "/projects", icon: <BriefcaseIcon /> },
    { name: "Contact", href: "/contact", icon: <MailIcon /> },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${isSolid
        ? "bg-white shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 md:py-4 flex gap-3 justify-between items-center">

        {/* Logo — white version on transparent header, black version when solid */}
        <div className="flex items-center gap-3">
          <Link href="/" className="w-[110px] md:w-[85px] inline-block">
            <Image
              src={isSolid ? "/assets/aurablack.png" : "/assets/aurawhite.png"}
              alt="Aura Events Logo"
              width={1000}
              height={1000}
              priority
            />
          </Link>
        </div>

        {/* Center nav (desktop) */}
        <nav className="hidden md:flex justify-center items-center">
          <ul className="flex gap-1 items-center">
            {Links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${isActive
                      ? isSolid
                        ? "bg-black text-white"
                        : "bg-white/20 text-white backdrop-blur-sm"
                      : isSolid
                        ? "text-black hover:bg-black/5"
                        : "text-white hover:bg-white/15"
                      }`}
                  >
                    {isActive && (
                      <span className="inline-flex">{link.icon}</span>
                    )}
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: socials + CTA (desktop) */}
        <div
          className={`hidden md:flex justify-end items-center gap-3 transition-colors duration-500 ${isSolid ? "text-black" : "text-white"
            }`}
        >
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:opacity-70 transition"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="hover:opacity-70 transition"
          >
            <TiktokIcon />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:opacity-70 transition"
          >
            <LinkedInIcon />
          </a>
          <Link
            href="/contact"
            className={`ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition ${isSolid
              ? "bg-black text-white hover:opacity-90"
              : "bg-white text-black hover:bg-white/90"
              }`}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <MobileNav isSolid={isSolid} />
        </div>
      </div>
    </header>
  );
}

export default Header;
