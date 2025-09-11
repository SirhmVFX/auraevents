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
  PlusCircleIcon,
  BriefcaseIcon,
  MailIcon,
} from "./Icons";
import { usePathname } from "next/navigation";

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
    {
      name: "Home",
      href: "/",
      icon: <HomeIcon />,
    },
    {
      name: "About",
      href: "/about",
      icon: <InfoIcon />,
    },
    {
      name: "Events",
      href: "/events",
      icon: <CalendarIcon />,
    },
    {
      name: "New Event",
      href: "/events/new",
      icon: <PlusCircleIcon />,
    },
    {
      name: "Projects",
      href: "/projects",
      icon: <BriefcaseIcon />,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: <MailIcon />,
    },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "backdrop-blur-sm bg-white/60 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto p-2 md:p-4 flex gap-3 justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="w-[110px] md:w-[85px] inline-block">
            <Image
              src="/assets/aurablack.png"
              alt="Logo"
              width={1000}
              height={1000}
            />
          </Link>
        </div>

        {/* Center: Nav */}
        <nav className="hidden md:flex justify-center items-center ">
          <ul className="flex gap-3 items-center">
            {Links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold transition-all hover:bg-black/5 hover:scale-105 ${
                      isActive ? "bg-black text-white" : "text-black"
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

        {/* Right: Socials */}
        <div className="hidden md:flex justify-end items-center gap-4 text-black">
          <InstagramIcon />
          <TiktokIcon />
          <LinkedInIcon />
          <h1 className="hidden md:block text-xs text-black/70">RC: 8683441</h1>
        </div>

        {/* Mobile: compact right-aligned icon */}
        <div className="md:hidden col-span-2 col-start-3 flex justify-end items-center">
          <InstagramIcon />
        </div>
      </div>
    </header>
  );
}

export default Header;
