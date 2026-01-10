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

  const CLOUD_NAME = "dkbpthpxg";
  const INTRO_ID = "The_view_of_1080p_202601091840_-_Trim_e74n78";
  const LOOP_ID = "Reshoot_stationary_1080p_202601101124_llct00";
  
  // ✅ FIX: 'q_90' forces high quality instead of aggressive compression
  const INTRO_URL = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_90/${INTRO_ID}.mp4`;
  const LOOP_URL = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_90/${LOOP_ID}.mp4`;

  const [introFinished, setIntroFinished] = useState(false);

  // Parallax / Blur Logic
  const bgBlur = useTransform(scrollYProgress, [0, 0.2], ["0px", "8px"]);
  const bgOverlay = useTransform(scrollYProgress, [0, 0.3], ["rgba(10, 35, 66, 0.2)", "rgba(10, 35, 66, 0.6)"]);
  const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };

  return (
    <div ref={containerRef} className="relative min-h-[250vh] bg-[#0A2342]">
      
      {/* --- VIDEO LAYER --- */}
      <motion.div className="fixed inset-0 w-full h-full z-0 overflow-hidden">
        
        {/* Overlay */}
        <motion.div 
            style={{ backdropFilter: `blur(${bgBlur})`, backgroundColor: bgOverlay }}
            className="absolute inset-0 z-10 pointer-events-none"
        />

        {/* 
            LAYER 1: The Loop (Bottom) 
        */}
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 scale-110 origin-center"
          src={LOOP_URL}
        />

        {/* 
            LAYER 2: The Intro (Top)
            ✅ FIX: Duration 1.5s for a smoother cross-dissolve
        */}
        <div 
          className={`absolute inset-0 w-full h-full z-1 transition-opacity duration-[1500ms] ease-in-out ${introFinished ? 'opacity-0' : 'opacity-100'}`}
        >
             <video
               autoPlay muted playsInline
               className="w-full h-full object-cover scale-110 origin-center"
               src={INTRO_URL}
               onEnded={() => setIntroFinished(true)}
             />
        </div>

      </motion.div>

      {/* --- CONTENT --- */}
      <div className="relative z-20 w-full flex flex-col items-center">

        {/* Hero Text */}
        <div className="h-screen w-full flex flex-col items-center justify-center px-6 text-center">
            <motion.div 
               initial="hidden" animate="visible" variants={fadeInUp}
               className="max-w-4xl"
            >
               <span className="inline-block py-1.5 px-4 border border-white/20 rounded-full text-white/80 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
                 Our Vision
               </span>
               <h1 className="text-5xl md:text-7xl font-montserrat font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                 Transparency.<br/>
                 <span className="text-[#D4AF37]">By Design.</span>
               </h1>
            </motion.div>
        </div>

        {/* Info Card */}
        <div className="w-full max-w-5xl px-6 mb-32">
           <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-16 shadow-2xl group"
           >
              <div className="absolute inset-0 z-0 pointer-events-none">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-150%] group-hover:animate-shine" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
                  <div className="md:w-1/3">
                      <div className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#0A2342] mb-6">
                        <Quote size={28} />
                      </div>
                      <h2 className="text-3xl font-montserrat font-bold text-white leading-tight">
                          Structured.<br/>Reliable.<br/>Results-Driven.
                      </h2>
                  </div>
                  <div className="md:w-2/3 text-white/80 leading-relaxed space-y-6 text-lg">
                      <p>
                        TMS ESTATES LTD is a professional real estate agency with over a decade of experience in real estate and financial services. 
                        Based in Cyprus, with headquarters in Limassol, we deliver high-level expertise supported by in-depth market knowledge.
                      </p>
                      <p>
                        As part of the <strong>TMS Group</strong>, an international organisation with worldwide activities, we benefit from a 
                        strong global network while maintaining a focused, disciplined local presence.
                      </p>
                  </div>
              </div>
           </motion.div>
        </div>

        {/* Mission & Values */}
        <div className="w-full max-w-6xl px-6 pb-40 grid grid-cols-1 md:grid-cols-2 gap-8">
           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
             className="rounded-3xl border border-white/10 bg-[#0A2342]/80 backdrop-blur-md p-10 shadow-xl"
           >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white mb-6">
                 <Target size={24} />
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-white mb-4">Our Mission</h3>
              <p className="text-white/70 leading-relaxed">
                 To establish a distinctive real estate identity founded on excellence in service, 
                 innovation, and ethical business practices.
              </p>
           </motion.div>

           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true, delay: 0.2 }} variants={fadeInUp}
             className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md p-10 shadow-xl"
           >
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#0A2342] mb-6">
                 <Gem size={24} />
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-white mb-4">Our Values</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                 Centered on professional excellence, integrity, and a client-focused approach. 
                 We operate with transparency and strong ethical standards.
              </p>
           </motion.div>
        </div>

      </div>
    </div>
  );
}
