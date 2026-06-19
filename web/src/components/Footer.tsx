"use client";

import Image from "next/image";
import { Bot, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const openAIChat = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-ai-chat"));
  };

  return (
    <footer id="page-footer" className="relative z-20 border-t border-white/10 bg-[#05070B] text-[#F5F0E8]">
      <div className="home-container py-14 md:py-20">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <Link href="/" className="inline-flex">
              <Image
                src="/tms-logo-white.svg"
                alt="TMS Estates Logo"
                width={190}
                height={48}
                className="h-auto w-40 md:w-48"
                unoptimized
              />
            </Link>
            <p className="mt-7 max-w-xl text-sm leading-7 text-[#F5F0E8]/58 md:text-base md:leading-8">
              TMS Estates creates contemporary residential and mixed-use developments in carefully selected locations across Cyprus.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <a href="mailto:info@tmsestates.com" className="footer-action group">
              <Mail className="h-5 w-5" />
              <span>Email</span>
              <ArrowUpRight className="ml-auto h-4 w-4 opacity-40 transition group-hover:opacity-100" />
            </a>
            <a href="https://wa.me/99875500" target="_blank" rel="noreferrer" className="footer-action group">
              <MessageCircle className="h-5 w-5" />
              <span>WhatsApp</span>
              <ArrowUpRight className="ml-auto h-4 w-4 opacity-40 transition group-hover:opacity-100" />
            </a>
            <button onClick={openAIChat} className="footer-action group text-left">
              <Bot className="h-5 w-5" />
              <span>AI Assistant</span>
              <ArrowUpRight className="ml-auto h-4 w-4 opacity-40 transition group-hover:opacity-100" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-8 text-sm text-[#F5F0E8]/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} TMS ESTATES. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy-policy" className="transition hover:text-[#C2A139]">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="transition hover:text-[#C2A139]">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-action {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          min-height: 4.2rem;
          border: 1px solid rgba(245, 240, 232, 0.1);
          background: rgba(13, 27, 46, 0.28);
          padding: 1rem 1.1rem;
          color: rgba(245, 240, 232, 0.78);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          transition: all 0.25s ease;
        }
        .footer-action:hover {
          border-color: rgba(194, 161, 57, 0.42);
          color: #c2a139;
          background: rgba(194, 161, 57, 0.075);
        }
      `}</style>
    </footer>
  );
}
