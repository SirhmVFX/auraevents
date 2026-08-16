"use client";

import Link from "next/link";
import { useState } from "react";
import { InstagramIcon, LinkedInIcon } from "./Icons";
// If you added FacebookIcon earlier, keep this import. Otherwise, see note below.
import { FacebookIcon } from "./Icons";

function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "hello@aura.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div className="px-4 md:px-6 pb-6">
      <footer className="bg-black text-white/90 mt-8 md:mt-12 rounded-2xl">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12 md:py-16">
          {/* Top: nav + email */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-8 border-b border-white/15">
            <nav className="text-sm">
              <ul className="flex flex-wrap items-center gap-4 text-white/80">
                <li>
                  <Link className="hover:text-white transition" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" href="/services">
                    Services
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" href="/events">
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition"
                    href="/projects"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" href="/services#pricing">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" href="/#estimator">
                    Budget estimator
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" href="/articles">
                    Articles
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white transition" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <button
              onClick={handleCopy}
              className="group self-start md:self-auto text-2xl md:text-4xl font-semibold tracking-wide text-white hover:text-white/90 transition relative"
              title="Click to copy"
            >
              {email}
              <span
                className={`absolute -bottom-6 left-0 text-xs rounded px-2 py-1 bg-white text-black transition-opacity ${copied ? "opacity-100" : "opacity-0"
                  }`}
              >
                Copied!
              </span>
            </button>
          </div>

          {/* Middle: addresses + socials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 py-10 border-b border-white/15">
            <div>
              <h3 className="font-semibold mb-2">Lagos HQ</h3>
              <address className="not-italic text-sm text-white/70 leading-relaxed">
                14 Akin Adesola Street
                <br /> Victoria Island, Lagos
                <br /> +234 801 234 5678
              </address>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Abuja Office</h3>
              <address className="not-italic text-sm text-white/70 leading-relaxed">
                Plot 1234, Aminu Kano Crescent
                <br /> Wuse 2, Abuja
                <br /> +234 802 345 6789
              </address>
            </div>

            <div className="md:justify-self-end">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="https://www.linkedin.com"
                    target="_blank"
                    className="flex items-center gap-2 hover:text-white transition"
                  >
                    <LinkedInIcon /> Linkedin
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com"
                    target="_blank"
                    className="flex items-center gap-2 hover:text-white transition"
                  >
                    <InstagramIcon /> Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.facebook.com"
                    target="_blank"
                    className="flex items-center gap-2 hover:text-white transition"
                  >
                    <FacebookIcon /> Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom: brand + policies */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-10 gap-6">
            <div className="flex items-center gap-2">
              <h1 className="text-5xl md:text-6xl font-semibold tracking-wide">
                Aura
              </h1>
              <span className="text-white/60">®</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/70">
              <Link href="#" className="hover:text-white transition">
                Privacy policy
              </Link>
              <Link href="#" className="hover:text-white transition">
                License agreement
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
