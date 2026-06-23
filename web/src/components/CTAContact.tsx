"use client";

import { ArrowRight, Mail, MessageCircle, Send } from "lucide-react";

const contactBubbles = [
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/99875500" },
  { icon: Mail, label: "Email", href: "mailto:info@tmsestates.com" },
  { icon: Send, label: "Email Us", href: "mailto:info@tmsestates.com" },
];

export default function CTAContact() {
  return (
    <section className="relative z-10 w-full p-3 md:p-5">
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
        <div>
          <p className="lux-eyebrow mb-6">Contact Section</p>
          <h2 className="font-montserrat text-4xl md:text-6xl font-bold leading-[1.02] tracking-[-0.04em] text-[var(--ivory)] max-w-4xl">
            Looking for Your Next <span className="text-[var(--gold)]">Property Opportunity?</span>
          </h2>
          <p className="lux-copy mt-7 max-w-2xl">
            Whether you are searching for a new home, an investment opportunity or information about our developments, our team would be pleased to assist.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-[rgba(245,240,232,0.10)] bg-[rgba(5,7,11,0.30)] p-6 md:p-8">
          <a href="mailto:info@tmsestates.com" className="lux-btn group w-full mb-7">
            Contact Us
            <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <div className="grid grid-cols-3 gap-3">
            {contactBubbles.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-[rgba(245,240,232,0.10)] bg-[rgba(245,240,232,0.06)] px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(194,161,57,0.45)] hover:bg-[rgba(194,161,57,0.08)]"
              >
                <item.icon className="h-5 w-5 text-[var(--gold)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--ivory)]/75 group-hover:text-[var(--ivory)]">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
