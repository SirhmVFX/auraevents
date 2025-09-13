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
    <div className="p-4">
      <footer className="bg-black text-white/90 mt-16 rounded-lg">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Top: nav + email */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-white/15">
            <nav className="text-sm">
              <ul className="flex flex-wrap items-center gap-4 text-white/80">
                <li>
                  <Link className="hover:text-white transition" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition"
                    href="/about#why"
                  >
                    Why Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="hover:text-white transition"
                    href="/projects"
                  >
                    Platform
                  </Link>
                </li>
                <li>
                  <span className="opacity-60 cursor-not-allowed">Pricing</span>
                </li>
                <li>
                  <Link className="hover:text-white transition" href="/contact">
                    Contacts
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
                className={`absolute -bottom-6 left-0 text-xs rounded px-2 py-1 bg-white text-black transition-opacity ${
                  copied ? "opacity-100" : "opacity-0"
                }`}
              >
                Copied!
              </span>
            </button>
          </div>

          {/* Middle: addresses + socials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-8 border-b border-white/15">
            <div>
              <h3 className="font-semibold mb-2">Raleigh</h3>
              <address className="not-italic text-sm text-white/70 leading-relaxed">
                125 N Harrington Street, Raleigh
                <br /> NC 27603
                <br /> +1 (919) 803-8413
              </address>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Charlotte</h3>
              <address className="not-italic text-sm text-white/70 leading-relaxed">
                220 East Peterson Drive, Charlotte
                <br /> NC 28277
                <br /> +1 (704) 333-7272
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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 gap-6">
            <div className="flex items-center gap-2">
              <span className="text-5xl md:text-6xl font-semibold tracking-wide">
                Aura
              </span>
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
