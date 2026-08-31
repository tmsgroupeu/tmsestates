"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { Link } from "@/i18n/routing";

const contactEmail = "info@tmsestates.com";
const whatsappNumber = "35799875500";
const telephoneNumber = "70070085";

const inquiryTypes = [
  "Property availability",
  "Investment guidance",
  "Project information",
  "Private appointment",
  "General enquiry",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formMessage, setFormMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const contactCards = useMemo(
    () => [
      {
        icon: Mail,
        label: "Email",
        value: contactEmail,
        href: `mailto:${contactEmail}`,
      },
      {
        icon: Phone,
        label: "Telephone",
        value: `+357 ${telephoneNumber}`,
        href: `tel: +357 ${telephoneNumber}`,
      },
      {
        icon: MessageCircle,
        label: "WhatsApp",
        value: "+357 99 875500",
        href: `https://wa.me/${whatsappNumber}`,
      },
      {
        icon: MapPin,
        label: "Office",
        value: "Onisilou 4, LORDOS KANTARA BLD, Block A, Agios Tychonas, 4532",
        href: "https://maps.app.goo.gl/zMEyDKpLkzyuZd249",
      },
    ],
    [],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const inquiry = String(form.get("inquiry") || "");
    const message = String(form.get("message") || "");

    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please add a valid email address.";
    }
    if (!message.trim()) errors.message = "Please add a short message.";

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setFormStatus("error");
      setFormMessage("Please complete the highlighted fields.");
      return;
    }

    setFieldErrors({});
    setFormStatus("submitting");
    setFormMessage("Sending your enquiry...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          inquiry,
          message,
          source: "Contact page enquiry form",
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        if (result.field) {
          setFieldErrors({ [result.field]: result.error });
        }

        setFormStatus("error");
        setFormMessage(result.error || "We could not send the message. Please try again.");
        return;
      }

      setFormStatus("success");
      setFormMessage("Thank you. Your enquiry has been sent to our team.");
      formElement.reset();
    } catch {
      setFormStatus("error");
      setFormMessage("Connection issue. Please try again in a moment.");
    }
  };

  return (
    <main className="min-h-screen bg-[#05070B] text-[#F5F0E8]">
      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(194,161,57,0.16),transparent_30%),radial-gradient(circle_at_84%_8%,rgba(245,240,232,0.07),transparent_28%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-[#242124] via-[#05070B]/86 to-transparent" />

        <div className="home-container relative">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="section-eyebrow">Contact TMS Estates</p>

              <h1 className="mt-5 max-w-3xl font-montserrat text-[clamp(2.7rem,6vw,6.8rem)] font-bold leading-[0.94] tracking-[-0.07em] text-[#F5F0E8]">
                Let’s Discuss
                <span className="block text-[#C2A139]">Your Next Move.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl lg:justify-self-end"
            >
              <p className="text-base leading-8 text-[#F5F0E8]/78 md:text-lg md:leading-9">
                Whether you are exploring a new home, investment opportunity or
                one of our developments, our team will guide you with clear
                information and a considered next step.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-3 border border-[#F5F0E8]/14 bg-[#242124]/72 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/82 transition-colors hover:border-[#C2A139]/60 hover:text-[#C2A139]"
                >
                  <Mail className="h-4 w-4 text-[#C2A139]" />
                  Email Us
                </a>

                <a
                  href={`tel:+357${telephoneNumber}`}
                  className="inline-flex items-center gap-3 border border-[#F5F0E8]/14 bg-[#242124]/72 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/82 transition-colors hover:border-[#C2A139]/60 hover:text-[#C2A139]"
                >
                  <Phone className="h-4 w-4 text-[#C2A139]" />
                  Call Us
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 border border-[#F5F0E8]/14 bg-[#242124]/72 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/82 transition-colors hover:border-[#C2A139]/60 hover:text-[#C2A139]"
                >
                  <MessageCircle className="h-4 w-4 text-[#C2A139]" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
            <motion.aside
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden bg-[#242124] p-6 shadow-[0_28px_95px_rgba(0,0,0,0.32)] md:p-8"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(194,161,57,0.15),transparent_34%),linear-gradient(135deg,rgba(245,240,232,0.055),transparent_42%)]" />
              <div className="contact-gold-line pointer-events-none absolute inset-x-0 top-0 h-px" />

              <div className="relative z-10">
                <h2 className="font-montserrat text-2xl font-semibold tracking-[-0.045em] text-[#F5F0E8]">
                  Direct Channels
                </h2>

                <div className="mt-7 grid gap-3">
                  {contactCards.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="group flex items-center gap-4 border border-[#F5F0E8]/10 bg-[#05070B]/18 p-4 transition-all duration-300 hover:border-[#C2A139]/50 hover:bg-[#05070B]/28"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center border border-[#C2A139]/35 text-[#C2A139] transition-all duration-300 group-hover:bg-[#C2A139] group-hover:text-[#242124]">
                        <item.icon className="h-5 w-5" />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-[#C2A139]/82">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-sm font-semibold leading-5 text-[#F5F0E8]/82">
                          {item.value}
                        </span>
                      </span>

                      <ArrowRight className="ml-auto h-4 w-4 text-[#F5F0E8]/30 transition-transform group-hover:translate-x-1 group-hover:text-[#C2A139]" />
                    </a>
                  ))}
                </div>

                <div className="mt-7 border-t border-[#F5F0E8]/10 pt-6">
                  <div className="flex items-start gap-4">
                    <Clock className="mt-1 h-5 w-5 shrink-0 text-[#C2A139]" />
                    <p className="text-sm leading-7 text-[#F5F0E8]/68">
                      We aim to respond promptly during business hours. For
                      property viewings or investment enquiries, include your
                      preferred timing and project of interest.
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>

            <motion.section
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden border border-[#F5F0E8]/12 bg-[#F5F0E8] p-6 text-[#242124] shadow-[0_28px_95px_rgba(0,0,0,0.26)] md:p-8 lg:p-10"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(194,161,57,0.14),transparent_36%,rgba(36,33,36,0.045))]" />

              <div className="relative z-10">
                <div className="flex flex-col gap-4 border-b border-[#242124]/10 pb-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C2A139]">
                      Enquiry Form
                    </p>
                    <h2 className="mt-3 font-montserrat text-3xl font-bold leading-none tracking-[-0.055em] text-[#242124] md:text-4xl">
                      Tell us what you are looking for.
                    </h2>
                  </div>

                  <AnimatePresence mode="wait">
                    {formStatus === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="inline-flex items-center gap-2 border border-[#C2A139]/45 bg-[#C2A139]/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#242124]"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#C2A139]" />
                        Sent Successfully
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <form onSubmit={handleSubmit} className="mt-7 grid gap-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="contact-field" data-error={Boolean(fieldErrors.name)}>
                      <span>Full Name</span>
                      <input name="name" type="text" required placeholder="Your name" />
                      {fieldErrors.name ? <em>{fieldErrors.name}</em> : null}
                    </label>

                    <label className="contact-field" data-error={Boolean(fieldErrors.email)}>
                      <span>Email Address</span>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                      />
                      {fieldErrors.email ? <em>{fieldErrors.email}</em> : null}
                    </label>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="contact-field">
                      <span>Phone Number</span>
                      <input name="phone" type="tel" placeholder="+357 ..." />
                    </label>

                    <label className="contact-field">
                      <span>Inquiry Type</span>
                      <select name="inquiry" defaultValue="Property availability">
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="contact-field" data-error={Boolean(fieldErrors.message)}>
                    <span>Message</span>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us about the property, project or investment opportunity you would like to discuss."
                    />
                    {fieldErrors.message ? <em>{fieldErrors.message}</em> : null}
                  </label>

                  <div className="flex flex-col gap-4 border-t border-[#242124]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <AnimatePresence mode="wait">
                      {formStatus !== "idle" ? (
                        <motion.p
                          key={formStatus}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className={`max-w-md border px-4 py-3 text-xs font-semibold leading-6 ${
                            formStatus === "error"
                              ? "border-red-200 bg-red-50 text-red-700"
                              : "border-[#C2A139]/35 bg-[#C2A139]/10 text-[#242124]/70"
                          }`}
                        >
                          {formMessage}
                        </motion.p>
                      ) : (
                        <p className="max-w-md text-xs leading-6 text-[#242124]/54">
                          Your message will be sent directly to the TMS Estates team.
                        </p>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="group relative inline-flex min-h-[54px] w-fit items-center justify-center overflow-hidden border border-[#C2A139]/70 bg-[#242124] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5F0E8] shadow-[0_20px_58px_rgba(0,0,0,0.22)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#242124] hover:shadow-[0_26px_78px_rgba(194,161,57,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A139]/70"
                    >
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5F0E8] to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
                      <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-[#C2A139] transition-all duration-500 group-hover:w-full" />
                      <span className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/28 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />

                      <span className="relative z-10 flex items-center gap-4">
                        {formStatus === "submitting" ? "Sending" : "Send Enquiry"}
                        <span className="flex h-8 w-8 items-center justify-center border border-[#C2A139]/55 bg-[#05070B]/28 text-[#C2A139] transition-all duration-500 group-hover:border-[#242124]/40 group-hover:bg-[#242124] group-hover:text-[#F5F0E8]">
                          <Send className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                        </span>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.section>
          </div>

          <section className="mt-5 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Building2,
                title: "Project Enquiries",
                text: "Request project details, timelines, available units and development information.",
              },
              {
                icon: Phone,
                title: "Viewing Requests",
                text: "Arrange a call or appointment with the team for suitable available properties.",
              },
              {
                icon: MapPin,
                title: "Investment Guidance",
                text: "Discuss Cyprus real estate opportunities and the next steps for your profile.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden border border-[#F5F0E8]/10 bg-[#242124]/70 p-6 shadow-[0_18px_65px_rgba(0,0,0,0.22)] backdrop-blur-[5px] transition-colors hover:border-[#C2A139]/45"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C2A139]/0 to-transparent transition-all duration-500 group-hover:via-[#C2A139]/80" />

                <item.icon className="h-6 w-6 text-[#C2A139]" />
                <h3 className="mt-5 font-montserrat text-xl font-semibold tracking-[-0.04em] text-[#F5F0E8]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#F5F0E8]/64">
                  {item.text}
                </p>
              </article>
            ))}
          </section>
        </div>
      </section>

      <style jsx>{`
        .contact-gold-line {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(194, 161, 57, 0.28),
            rgba(194, 161, 57, 0.95),
            rgba(245, 240, 232, 0.56),
            rgba(194, 161, 57, 0.28),
            transparent
          );
          background-size: 240% 100%;
          animation: contactGoldSweep 6.5s ease-in-out infinite;
        }

        @keyframes contactGoldSweep {
          0% {
            background-position: 120% 0;
            opacity: 0.36;
          }
          45% {
            opacity: 1;
          }
          100% {
            background-position: -120% 0;
            opacity: 0.36;
          }
        }

        .contact-field {
          display: grid;
          gap: 0.55rem;
        }

        .contact-field span {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(36, 33, 36, 0.64);
        }

        .contact-field em {
          font-style: normal;
          font-size: 0.76rem;
          font-weight: 700;
          color: #b42318;
        }

        .contact-field input,
        .contact-field select,
        .contact-field textarea {
          width: 100%;
          border: 1px solid rgba(36, 33, 36, 0.12);
          background: rgba(255, 255, 255, 0.48);
          padding: 1rem;
          font-size: 0.95rem;
          color: #242124;
          outline: none;
          transition:
            border-color 220ms ease,
            box-shadow 220ms ease,
            background 220ms ease;
        }

        .contact-field textarea {
          resize: vertical;
          min-height: 150px;
        }

        .contact-field input:focus,
        .contact-field select:focus,
        .contact-field textarea:focus {
          border-color: rgba(194, 161, 57, 0.78);
          background: rgba(255, 255, 255, 0.78);
          box-shadow: 0 0 0 3px rgba(194, 161, 57, 0.14);
        }

        .contact-field[data-error="true"] input,
        .contact-field[data-error="true"] textarea {
          border-color: rgba(180, 35, 24, 0.52);
          background: rgba(255, 247, 246, 0.82);
          box-shadow: 0 0 0 3px rgba(180, 35, 24, 0.08);
        }
      `}</style>
    </main>
  );
}
