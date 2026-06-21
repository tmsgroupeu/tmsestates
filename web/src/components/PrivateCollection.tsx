"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Lock } from "lucide-react";
import { useState } from "react";

export default function PrivateCollection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;

    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  return (
    <section className="relative w-full overflow-hidden py-14 md:py-16 lg:py-20">
      <div className="home-container relative">
        <div className="private-collection-card relative mx-auto max-w-5xl overflow-hidden border border-[#F5F0E8]/12 bg-[#242124]/56 px-6 py-11 shadow-[0_30px_95px_rgba(0,0,0,0.32)] backdrop-blur-[8px] md:px-10 md:py-12 lg:px-14 lg:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(245,240,232,0.08),rgba(36,33,36,0.32)_42%,rgba(5,7,11,0.18)),radial-gradient(circle_at_50%_0%,rgba(194,161,57,0.16),transparent_36%)]" />
          <div className="private-collection-line pointer-events-none absolute inset-x-0 top-0 h-px" />
          <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[#F5F0E8]/18 to-transparent" />

          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.div
                key="form-view"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(194,161,57,0)",
                      "0 0 34px rgba(194,161,57,0.2)",
                      "0 0 0 rgba(194,161,57,0)",
                    ],
                  }}
                  transition={{
                    duration: 3.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-6 grid h-11 w-11 place-items-center border border-[#C2A139]/55 bg-[#05070B]/28 text-[#C2A139]"
                >
                  <Lock className="h-5 w-5" strokeWidth={1.7} />
                </motion.div>

                <h2 className="font-montserrat text-[clamp(2rem,4.3vw,4.6rem)] font-bold leading-[0.96] tracking-[-0.06em] text-[#F5F0E8]">
                  The Private
                  <span className="block text-[#C2A139]">Collection</span>
                </h2>

                <p className="mt-6 max-w-2xl text-[0.96rem] leading-8 text-[#F5F0E8]/84 md:text-[1.02rem] md:leading-9">
                  Gain exclusive access to our highly sought-after off-market
                  Signature Developments and VIP investment opportunities before
                  they launch to the public.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-9 grid w-full max-w-3xl gap-3 sm:grid-cols-[1fr_auto]"
                >
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email address..."
                    className="h-[58px] w-full border border-[#F5F0E8]/18 bg-[#F5F0E8]/94 px-5 text-sm font-medium text-[#242124] outline-none transition-all duration-300 placeholder:text-[#242124]/42 focus:border-[#C2A139] focus:bg-[#F5F0E8] focus:shadow-[0_0_0_3px_rgba(194,161,57,0.16)] md:px-6"
                    required
                    disabled={status === "submitting"}
                  />

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group relative inline-flex min-h-[58px] items-center justify-center overflow-hidden border border-[#C2A139]/70 bg-[#242124]/72 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5F0E8] shadow-[0_22px_64px_rgba(0,0,0,0.32)] transition-all duration-500 hover:-translate-y-0.5 hover:border-[#C2A139] hover:bg-[#C2A139] hover:text-[#242124] hover:shadow-[0_28px_84px_rgba(194,161,57,0.24)] disabled:pointer-events-none disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A139]/70 md:px-8"
                  >
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5F0E8] to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
                    <span className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-[#C2A139] transition-all duration-500 group-hover:w-full" />
                    <span className="pointer-events-none absolute inset-0 translate-x-[-130%] bg-gradient-to-r from-transparent via-white/28 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />

                    <span className="relative z-10 flex items-center gap-4">
                      {status === "submitting" ? "Submitting" : "Unlock Access"}
                      <span className="flex h-8 w-8 items-center justify-center border border-[#C2A139]/55 bg-[#05070B]/28 text-[#C2A139] transition-all duration-500 group-hover:border-[#242124]/40 group-hover:bg-[#242124] group-hover:text-[#F5F0E8]">
                        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </button>
                </form>

                <div className="mt-8 flex w-full items-center justify-center gap-4 text-center text-[9px] font-bold uppercase tracking-[0.3em] text-[#F5F0E8]/46">
                  <span className="h-px w-8 bg-[#C2A139]/34" />
                  Curated for high-net-worth individuals
                  <span className="h-px w-8 bg-[#C2A139]/34" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success-view"
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 mx-auto flex max-w-2xl flex-col items-center py-8 text-center"
              >
                <div className="mb-7 grid h-16 w-16 place-items-center border border-[#C2A139]/70 bg-[#05070B]/24 text-[#C2A139] shadow-[0_0_44px_rgba(194,161,57,0.18)]">
                  <Check className="h-8 w-8" strokeWidth={1.6} />
                </div>

                <h3 className="font-montserrat text-[clamp(2rem,4vw,4rem)] font-bold leading-none tracking-[-0.055em] text-[#F5F0E8]">
                  Access
                  <span className="block text-[#C2A139]">Granted</span>
                </h3>

                <p className="mt-6 text-base leading-8 text-[#F5F0E8]/84">
                  Your secured invitation has been formalized. Our VIP advisory
                  team will reach out to {email} shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .private-collection-card {
          transform: translateZ(0);
        }

        .private-collection-line {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(194, 161, 57, 0.2),
            rgba(194, 161, 57, 0.9),
            rgba(245, 240, 232, 0.44),
            rgba(194, 161, 57, 0.2),
            transparent
          );
          background-size: 220% 100%;
          animation: privateCollectionGoldSweep 7s ease-in-out infinite;
        }

        @keyframes privateCollectionGoldSweep {
          0% {
            background-position: 120% 0;
            opacity: 0.34;
          }
          45% {
            opacity: 0.82;
          }
          100% {
            background-position: -120% 0;
            opacity: 0.34;
          }
        }
      `}</style>
    </section>
  );
}
