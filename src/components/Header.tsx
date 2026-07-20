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

// A simple sparkle/star icon for services
function SparkleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v1m0 16v1M4.22 4.22l.7.7m13.16 13.16.7.7M3 12h1m16 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "backdrop-blur-sm bg-white/60 shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="max-w-[1200px] mx-auto p-2 md:p-4 flex gap-3 justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="w-[110px] md:w-[85px] inline-block">
            <Image
              src="/assets/aurablack.png"
              alt="Aura Events Logo"
              width={1000}
              height={1000}
            />
          </Link>
        </div>

        {/* Center: Nav (desktop) */}
        <nav className="hidden md:flex justify-center items-center">
          <ul className="flex gap-1 items-center">
            {Links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all hover:bg-black/5 hover:scale-105 ${isActive ? "bg-black text-white" : "text-black"
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

        {/* Right: Socials + CTA (desktop) */}
        <div className="hidden md:flex justify-end items-center gap-3 text-black">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-70 transition">
            <InstagramIcon />
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:opacity-70 transition">
            <TiktokIcon />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-70 transition">
            <LinkedInIcon />
          </a>
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white text-xs font-bold hover:opacity-90 transition"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile: hamburger */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
