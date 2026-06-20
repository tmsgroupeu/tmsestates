"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Lock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function PrivateCollection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section className="relative w-full overflow-hidden py-14 md:py-18 lg:py-20">
      <div className="absolute inset-0 -z-10 bg-[#05070B]/44" />

      <div className="home-container relative">
        <div className="private-collection-shell relative overflow-hidden bg-[#242124] px-6 py-12 text-center shadow-[0_34px_120px_rgba(5,7,11,0.48)] md:px-12 md:py-16 lg:px-16 lg:py-20">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/hero-poster.jpg"
              alt="TMS Estates private collection"
              fill
              className="object-cover opacity-28 grayscale-[20%]"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#242124] via-[#242124]/82 to-[#242124]/64" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(194,161,57,0.16),transparent_34%)]" />
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-[#C2A139]/12">
            <div className="private-gold-sweep h-full w-1/3 bg-gradient-to-r from-transparent via-[#C2A139] to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl">
            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.div
                  key="form-view"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                  transition={{ duration: 0.65 }}
                  className="flex w-full flex-col items-center"
                >
                  <div className="mb-7 grid h-14 w-14 place-items-center border border-[#C2A139]/36 bg-[#05070B]/32 text-[#C2A139] shadow-[0_0_34px_rgba(194,161,57,0.14)] backdrop-blur-md">
                    <Lock size={20} />
                  </div>

                  <h2 className="font-montserrat text-[clamp(2.05rem,4vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.055em] text-[#F5F0E8]">
                    <span className="block">The Private</span>
                    <span className="block text-[#C2A139]">Collection</span>
                  </h2>

                  <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#F5F0E8]/78 md:text-[1.04rem] md:leading-9">
                    Gain exclusive access to our highly sought-after off-market Signature Developments and VIP investment opportunities before they launch to the public.
                  </p>

                  <form
                    className="mt-9 flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="min-h-[3.5rem] flex-1 border border-[#F5F0E8]/14 bg-[#05070B]/42 px-5 text-sm text-[#F5F0E8] outline-none transition-all placeholder:text-[#F5F0E8]/38 focus:border-[#C2A139]/62 focus:bg-[#05070B]/58"
                      required
                      disabled={status === "submitting"}
                    />

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex min-h-[3.5rem] items-center justify-center gap-3 border border-[#C2A139]/52 bg-[#C2A139] px-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#242124] shadow-[0_18px_55px_rgba(194,161,57,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F5F0E8] disabled:pointer-events-none disabled:opacity-75"
                    >
                      {status === "submitting" ? "Encrypting..." : "Unlock Access"}
                      {status !== "submitting" && (
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      )}
                    </button>
                  </form>

                  <div className="mt-10 flex w-full items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-[#F5F0E8]/42">
                    <div className="h-px w-8 bg-[#C2A139]/32" />
                    Curated for high-net-worth individuals
                    <div className="h-px w-8 bg-[#C2A139]/32" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success-view"
                  initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.75 }}
                  className="flex flex-col items-center py-8"
                >
                  <div className="mb-7 grid h-20 w-20 place-items-center border border-[#C2A139]/64 bg-[#C2A139]/12 text-[#C2A139] shadow-[0_0_48px_rgba(194,161,57,0.2)]">
                    <Check size={34} strokeWidth={1.5} />
                  </div>

                  <h3 className="font-montserrat text-[clamp(2rem,3vw,3.4rem)] font-bold leading-tight tracking-[-0.05em] text-[#F5F0E8]">
                    Access <span className="text-[#C2A139]">Granted</span>
                  </h3>

                  <p className="mx-auto mt-5 max-w-md text-base leading-8 text-[#F5F0E8]/78">
                    Your secured invitation has been formalized. Our VIP advisory team will reach out to {email} shortly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx>{`
        .private-collection-shell {
          box-shadow:
            0 34px 120px rgba(5, 7, 11, 0.48),
            inset 0 1px 0 rgba(194, 161, 57, 0.1),
            inset 0 -1px 0 rgba(245, 240, 232, 0.06);
        }

        .private-gold-sweep {
          animation: privateGoldSweep 5.4s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          opacity: 0.9;
          filter: drop-shadow(0 0 8px rgba(194, 161, 57, 0.52));
        }

        @keyframes privateGoldSweep {
          0% {
            transform: translateX(-115%);
          }
          46%,
          100% {
            transform: translateX(320%);
          }
        }
      `}</style>
    </section>
  );
}
