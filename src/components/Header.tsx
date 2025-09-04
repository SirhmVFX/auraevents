import Image from "next/image";
import Link from "next/link";
import { HomeIcon, InstagramIcon, LinkedInIcon, TiktokIcon } from "./Icons";

function Header() {
  return (
    <header className="flex justify-between max-w-[1200px] mx-auto md:p-6 p-2">
      <h1 className="hidden md:block">RC: 8683441</h1>

      <div className="flex flex-col items-center gap-2 md:gap-4">
        <Link href="/" className=" w-[120px]">
          <Image
            src="/assets/aurablack.png"
            alt="Logo"
            width={1000}
            height={1000}
          />
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            href="/"
            className={`flex gap-1 items-center bg-black px-2 py-1  rounded-full text-white text-sm hover:bg-black/5 hover:text-black hover:scale-105 transition-all`}
          >
            {" "}
            <HomeIcon /> Home
          </Link>
          <Link
            href="/about"
            className={`text-black/50 text-sm hover:bg-black/5 bg-white px-2 py-1  rounded-full hover:text-black hover:scale-105 transition-all`}
          >
            About
          </Link>
          <Link
            href="/events"
            className={`text-black/50 text-sm hover:bg-black/5 bg-white px-2 py-1  rounded-full hover:text-black hover:scale-105 transition-all`}
          >
            Events
          </Link>
          <Link
            href="/events/new"
            className={`text-black/50 text-sm hover:bg-black/5 bg-white px-2 py-1  rounded-full hover:text-black hover:scale-105 transition-all`}
          >
            New Event
          </Link>
          <Link
            href="/events/new"
            className={`text-black/50 text-sm hover:bg-black/5 bg-white px-2 py-1  rounded-full hover:text-black hover:scale-105 transition-all`}
          >
            Projects
          </Link>
          <Link
            href="/events/new"
            className={`text-black/50 text-sm hover:bg-black/5 bg-white px-2 py-1  rounded-full hover:text-black hover:scale-105 transition-all`}
          >
            Contact
          </Link>
        </div>
      </div>
      <div className="hidden md:flex gap-4">
        <InstagramIcon />
        <TiktokIcon />
        <LinkedInIcon />
      </div>
    </header>
  );
}

export default Header;
