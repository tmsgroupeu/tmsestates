"use client";

import { motion } from "framer-motion";

export default function WhoWeAre() {
  return (
    <section className="relative z-10 w-full bg-black/20 backdrop-blur-sm border-t border-b border-[#D4AF37]/30 mt-10 md:mt-20">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-[#D4AF37]/30"
        >
          {/* Left Column */}
          <div className="w-full md:w-1/2 py-16 md:py-24 px-8 lg:px-16 flex items-center justify-center md:justify-start">
            <h2 className="font-montserrat text-4xl lg:text-5xl xl:text-6xl tracking-wide text-white leading-[1.2]">
              Developing Properties <br />
              with <span className="text-[#D4AF37]">Purpose</span>
            </h2>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 py-16 md:py-24 px-8 lg:px-16 flex items-center justify-center md:justify-start">
            <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-lg">
              Every project begins with careful evaluation, ensuring the right location, demand and long-term potential before development begins.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
