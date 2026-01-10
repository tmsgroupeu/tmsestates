/* FULL REPLACEMENT: src/app/[locale]/about/page.tsx */
"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Target, Gem, Quote } from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- CONFIG ---
  const CLOUD_NAME = "dkbpthpxg";
  const INTRO_ID = "The_view_of_202601101217_dr2mr_-_Trim_cbwcvm";
  const LOOP_ID = "Reshoot_stationary_202601101139_egs3f_sfxo0c";
  
  const INTRO_URL = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_90/${INTRO_ID}.mp4`;
  const LOOP_URL = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_90/${LOOP_ID}.mp4`;

  const [introFinished, setIntroFinished] = useState(false);

  // --- SCROLL DYNAMICS ---
  // The video stays clear for the initial content, then blurs as you scroll to Mission/Values
  const bgBlur = useTransform(scrollYProgress, [0, 0.4], ["0px", "8px"]);
  const bgOverlay = useTransform(scrollYProgress, [0, 0.4], ["rgba(10, 35, 66, 0.2)", "rgba(10, 35, 66, 0.7)"]);

  // --- ANIMATION VARIANTS ---
  const fadeInUpLoad = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const fadeInUpScroll = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } }
  };

  return (
    <div ref={containerRef} className="relative bg-[#0A2342] overflow-x-hidden">
      
      {/* --- 1. VIDEO BACKDROP LAYER --- */}
      <motion.div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {/* Dynamic Tint/Blur Overlay */}
        <motion.div 
            style={{ backdropFilter: `blur(${bgBlur})`, backgroundColor: bgOverlay }}
            className="absolute inset-0 z-10"
        />

        {/* The Loop (Bottom) */}
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 scale-110 origin-center"
          src={LOOP_URL}
        />

        {/* The Intro (Top - Fades out) */}
        <div className={`absolute inset-0 w-full h-full z-1 transition-opacity duration-[1500ms] ease-in-out ${introFinished ? 'opacity-0' : 'opacity-100'}`}>
             <video
               autoPlay muted playsInline
               className="w-full h-full object-cover scale-110 origin-center"
               src={INTRO_URL}
               onEnded={() => setIntroFinished(true)}
             />
        </div>
      </motion.div>


      {/* --- 2. CONTENT LAYER --- */}
      {/* Z-20 ensures this sits above the fixed background */}
      <div className="relative z-20 w-full flex flex-col items-center pt-32 md:pt-40 pb-40">

        {/* -- SECTION 1: HERO TITLE & ABOUT CARD (On Load) -- */}
        <div className="w-full max-w-5xl px-6 flex flex-col items-center">
            
            {/* Title Block */}
            <motion.div 
               initial="hidden" animate="visible" 
               variants={{
                 hidden: { opacity: 0, y: 20 },
                 visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
               }}
               className="text-center w-full mb-10"
            >
               <span className="inline-block py-1.5 px-4 border border-white/20 rounded-full text-white/80 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 backdrop-blur-md bg-white/5">
                 About Us
               </span>
               {/* 
                  TYPOGRAPHY UPDATE: "Who We Are"
                  First & Last White, Middle Golden 
               */}
               <h1 className="text-5xl sm:text-6xl md:text-8xl font-montserrat font-extrabold text-white leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                 Who <span className="text-[#D4AF37]">We</span> Are
               </h1>
            </motion.div>

            {/* The First Card (Appears Immediately) */}
            <motion.div 
              initial="hidden" animate="visible" 
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } }
              }}
              className="relative overflow-hidden w-full rounded-[2rem] border border-white/10 bg-[#0A2342]/60 backdrop-blur-2xl p-10 md:p-14 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] group"
           >
              {/* Subtle glass reflection effect */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-150%] group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start">
                  <div className="lg:w-1/3">
                      <div className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#0A2342] mb-6 shadow-lg shadow-[#D4AF37]/30">
                        <Quote size={28} />
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-montserrat font-bold text-white leading-snug">
                          Structured.<br/>Reliable.<br/>Results-Driven.
                      </h2>
                  </div>
                  <div className="lg:w-2/3 text-white/80 leading-relaxed space-y-6 text-lg font-light">
                      <p className="tracking-wide">
                        <strong className="text-white font-medium">TMS ESTATES LTD</strong> is a professional real estate agency with over a decade of experience in real estate and financial services. 
                        Based in Cyprus, with headquarters in Limassol, we deliver high-level expertise supported by in-depth market knowledge.
                      </p>
                      <p className="tracking-wide">
                        As part of the <strong className="text-[#D4AF37] font-medium">TMS Group</strong>, an international organisation with worldwide activities, we benefit from a 
                        strong global network while maintaining a focused, disciplined local presence. Our boutique operating model allows us 
                        to remain selective in our property portfolio, ensuring consistent quality.
                      </p>
                  </div>
              </div>
           </motion.div>

        </div>

        {/* -- SCROLL CUE (Mouse Icon) -- */}
        <div className="h-[30vh] w-full flex items-center justify-center pointer-events-none">
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
               className="flex flex-col items-center gap-2 text-white/50"
            >
               <span className="text-[10px] uppercase tracking-widest">Our Principles</span>
               <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent" />
            </motion.div>
        </div>


        {/* -- SECTION 2: MISSION & VALUES (On Scroll) -- */}
        <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
           
           {/* Mission Card */}
           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUpScroll}
             className="relative rounded-3xl border border-white/10 bg-[#0A2342]/80 backdrop-blur-xl p-10 md:p-12 shadow-2xl hover:border-[#D4AF37]/50 transition-colors duration-500 overflow-hidden"
           >
              <div className="absolute top-0 right-0 -mr-6 -mt-6 opacity-5">
                 <Target size={180} />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white mb-6 backdrop-blur-md border border-white/10">
                   <Target size={24} />
                </div>
                <h3 className="text-3xl font-montserrat font-bold text-white mb-4">Our Mission</h3>
                <p className="text-white/70 leading-relaxed font-light text-lg">
                   To establish a distinctive real estate identity founded on excellence in service, 
                   innovation, and ethical business practices. We deliver long-term value, 
                   transparency, and trust to our clients.
                </p>
              </div>
           </motion.div>

           {/* Values Card */}
           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUpScroll}
             className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-12 shadow-2xl hover:border-[#D4AF37]/50 transition-colors duration-500 overflow-hidden"
           >
              <div className="absolute top-0 right-0 -mr-6 -mt-6 text-[#D4AF37] opacity-5">
                 <Gem size={180} />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#0A2342] mb-6 shadow-md shadow-[#D4AF37]/30">
                   <Gem size={24} />
                </div>
                <h3 className="text-3xl font-montserrat font-bold text-white mb-4">Our Values</h3>
                <p className="text-white/80 leading-relaxed mb-6 font-light text-lg">
                   Centered on professional excellence, integrity, and a client-focused approach. 
                   We operate with accountability and strong ethical standards, combining market expertise with financial insight.
                </p>
                <div className="flex flex-wrap gap-4 mt-auto">
                   <span className="text-[10px] uppercase tracking-widest font-bold text-[#0A2342] bg-[#D4AF37] px-4 py-1.5 rounded-full shadow-lg">Integrity</span>
                   <span className="text-[10px] uppercase tracking-widest font-bold text-white bg-white/10 border border-white/20 px-4 py-1.5 rounded-full">Excellence</span>
                </div>
              </div>
           </motion.div>
        </div>

      </div>
    </div>
  );
}
