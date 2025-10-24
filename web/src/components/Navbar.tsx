"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll(); window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`sticky top-0 z-50 ${scrolled ? "shadow-lg" : ""}`}>
      <div className="section h-16 flex items-center justify-between rounded-b-[18px] glass"
           style={{ boxShadow: scrolled ? "var(--shadow)" : "none" }}>
        <Link href="/" className="flex items-center gap-3">
          <Image src="/tms-logo.svg" alt="TMS Estates" width={34} height={34} />
          <span className="font-bold tracking-wide text-[var(--gold)]">TMSESTATES</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-white">
          <Link className="hover:text-[var(--gold)]" href="/properties">Browse</Link>
          <a className="btn btn-outline" href="#contact">Contact</a>
        </nav>
      </div>
    </div>
  );
}
