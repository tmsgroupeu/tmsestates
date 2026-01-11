/* FULL REPLACEMENT: src/app/[locale]/invest/page.tsx */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Landmark, Plane, ShieldCheck, TrendingUp, Percent, FileCheck, Users, Briefcase, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function InvestPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Scroll Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background Animations
  const bgBlur = useTransform(scrollYProgress, [0, 0.2], ["0px", "12px"]);
  const bgOverlay = useTransform(scrollYProgress, [0, 0.5], ["rgba(10, 35, 66, 0.4)", "rgba(10, 35, 66, 0.85)"]);

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-[400vh] bg-[#0A2342] text-white selection:bg-[#D4AF37] selection:text-white">
      
      {/* 1. FIXED BACKGROUND VIDEO */}
      <motion.div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <motion.div 
            style={{ backdropFilter: `blur(${bgBlur})`, backgroundColor: bgOverlay }}
            className="absolute inset-0 z-10"
        />
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover scale-110"
          // Placeholder: Modern City/Architecture Video
          src="https://videos.pexels.com/video-files/3121459/3121459-uhd_2560_1440_24fps.mp4"
        />
      </motion.div>

      {/* 2. SCROLLABLE CONTENT */}
      <div className="relative z-10 flex flex-col items-center w-full">

        {/* --- SCENE 1: HERO (The Why) --- */}
        <div className="h-screen w-full flex flex-col items-center justify-center px-6 text-center">
            <motion.div 
               initial="hidden" animate="visible" variants={fadeUp}
               className="max-w-5xl"
            >
               <span className="inline-block py-1.5 px-4 border border-[#D4AF37]/50 rounded-full text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
                 Investment Intelligence
               </span>
               <h1 className="text-5xl md:text-8xl font-montserrat font-extrabold mb-8 leading-tight drop-shadow-2xl">
                 Strategic.<br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D4AF37] to-white">
                   Secure. Profitable.
                 </span>
               </h1>
               <p className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                 Cyprus: The Eastern Mediterranean's premier investment gateway. 
                 Combining lifestyle appeal with EU security and high-growth potential.
               </p>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
               className="absolute bottom-10"
            >
               <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest text-white/50">
                  <span>Explore the Data</span>
                  <div className="h-10 w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent" />
               </div>
            </motion.div>
        </div>

        {/* --- SCENE 2: THE PILLARS (Grid) --- */}
        <div className="w-full max-w-7xl px-6 py-24">
           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
             variants={staggerContainer}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
           >
              {/* Card 1: Location */}
              <FeatureCard 
                icon={Globe}
                title="Strategic Hub"
                text="At the crossroads of Europe, Asia, and Africa. A natural investment gateway supported by modern infrastructure and two international airports."
              />
              {/* Card 2: Legal */}
              <FeatureCard 
                icon={Landmark}
                title="English Common Law"
                text="A robust legal framework ensuring transparent property ownership, reliable contract enforcement, and business-friendly policies."
              />
              {/* Card 3: Growth */}
              <FeatureCard 
                icon={TrendingUp}
                title="Market Growth"
                text="Driven by tourism, residential demand, and limited supply. High potential for capital appreciation and steady rental yields."
              />
           </motion.div>
        </div>

        {/* --- SCENE 3: TAX & FINANCIAL BENEFITS (The Highlights) --- */}
        <div className="w-full max-w-6xl px-6 py-24 mb-20">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Financial Advantage</h2>
              <p className="text-white/60">One of the most competitive tax regimes in the EU.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              {/* Left: The Big Numbers */}
              <motion.div 
                 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                 className="space-y-6"
              >
                  <StatRow number="15%" label="Corporate Tax Rate (Lowest in EU)" />
                  <StatRow number="0%" label="Inheritance & Gift Tax" />
                  <StatRow number="0%" label="Immovable Property Tax" />
                  <StatRow number="0%" label="Capital Gains on Securities" />
              </motion.div>

              {/* Right: Detailed List */}
              <motion.div 
                 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                 className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl"
              >
                 <h3 className="text-xl font-bold font-montserrat text-[#D4AF37] mb-6 flex items-center gap-3">
                    <Percent size={24} /> Key Benefits
                 </h3>
                 <ul className="space-y-4 text-sm text-white/80">
                    <li className="flex gap-3"><CheckCircle2 size={16} className="text-[#D4AF37] shrink-0 mt-1" /><span>Dividend tax exemption for Non-domiciled residents</span></li>
                    <li className="flex gap-3"><CheckCircle2 size={16} className="text-[#D4AF37] shrink-0 mt-1" /><span>Double taxation treaties with 75+ countries</span></li>
                    <li className="flex gap-3"><CheckCircle2 size={16} className="text-[#D4AF37] shrink-0 mt-1" /><span>No withholding tax on dividends abroad</span></li>
                    <li className="flex gap-3"><CheckCircle2 size={16} className="text-[#D4AF37] shrink-0 mt-1" /><span><strong>Reduced 5% VAT</strong> on first primary residence</span></li>
                 </ul>
              </motion.div>
           </div>
        </div>

        {/* --- SCENE 4: RESIDENCY (Comparison) --- */}
        <div className="w-full bg-[#F9F9F9] text-[#0A2342] py-32 rounded-t-[4rem] relative overflow-hidden">
           {/* Top Accent */}
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0A2342] via-[#D4AF37] to-[#0A2342]" />

           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                 <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs">EU Access</span>
                 <h2 className="text-4xl md:text-5xl font-montserrat font-bold mt-2">Permanent Residency</h2>
                 <p className="text-[#0A2342]/70 mt-4 max-w-2xl mx-auto">
                    Secure your future with a fast-track program valid for life, extending to your family.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 
                 {/* Fast Track */}
                 <motion.div 
                    whileHover={{ y: -10 }}
                    className="bg-[#0A2342] text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden group"
                 >
                    <div className="absolute top-0 right-0 p-4 bg-[#D4AF37] rounded-bl-2xl text-[10px] font-bold uppercase tracking-wider text-[#0A2342]">
                       Fast Track
                    </div>
                    <Plane className="w-12 h-12 text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold font-montserrat mb-2">Investment Route</h3>
                    <div className="text-3xl font-light text-[#D4AF37] mb-6">€300,000 <span className="text-sm text-white/50">+VAT</span></div>
                    
                    <ul className="space-y-4 text-sm text-white/80 mb-8">
                       <li className="flex gap-3"><ShieldCheck size={18} className="text-[#D4AF37]" /> Investment in new residential property</li>
                       <li className="flex gap-3"><ShieldCheck size={18} className="text-[#D4AF37]" /> Covers spouse & dependent children</li>
                       <li className="flex gap-3"><ShieldCheck size={18} className="text-[#D4AF37]" /> Visit Cyprus once every 2 years</li>
                       <li className="flex gap-3"><ShieldCheck size={18} className="text-[#D4AF37]" /> Citizenship eligibility after 5 years</li>
                    </ul>
                 </motion.div>

                 {/* Standard Track */}
                 <div className="bg-white border border-gray-200 p-10 rounded-3xl shadow-lg relative">
                    <Users className="w-12 h-12 text-[#0A2342] mb-6" />
                    <h3 className="text-2xl font-bold font-montserrat mb-2">Category F</h3>
                    <div className="text-xl font-light text-[#0A2342]/60 mb-6">Stable Income Route</div>
                    
                    <ul className="space-y-4 text-sm text-gray-600 mb-8">
                       <li className="flex gap-3"><CheckCircle2 size={18} className="text-gray-400" /> Lower investment threshold</li>
                       <li className="flex gap-3"><CheckCircle2 size={18} className="text-gray-400" /> Requires proof of stable overseas income</li>
                       <li className="flex gap-3"><CheckCircle2 size={18} className="text-gray-400" /> Ideal for retirees & non-working residents</li>
                       <li className="flex gap-3"><CheckCircle2 size={18} className="text-gray-400" /> Annual income criteria applies</li>
                    </ul>
                 </div>

              </div>
           </div>
        </div>

        {/* --- SCENE 5: HOW WE SUPPORT (Glass Footer) --- */}
        <div className="w-full max-w-5xl px-6 py-32">
           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
             className="relative overflow-hidden rounded-3xl bg-[#0A2342]/90 border border-white/10 backdrop-blur-2xl p-10 md:p-16 text-center"
           >
              {/* Shine Background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 to-transparent pointer-events-none" />

              <Briefcase className="w-16 h-16 text-[#D4AF37] mx-auto mb-8" />
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-6">
                 Complete Investment Support
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
                 At TMS ESTATES LTD, we offer more than property listings. With our in-house legal and finance team, 
                 we provide end-to-end relocation solutions tailored to your objectives.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left mb-12">
                 <SupportItem text="Property selection & Analysis" />
                 <SupportItem text="Permanent Residency Handling" />
                 <SupportItem text="Tax & Legal Coordination" />
                 <SupportItem text="Banking Setup (Cyprus/Dubai)" />
                 <SupportItem text="Property Management" />
                 <SupportItem text="After-Sales Support" />
              </div>

              <div className="inline-block">
                 <Link 
                   href="/#contact"
                   className="flex items-center gap-3 bg-white text-[#0A2342] px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                 >
                    Book Consultation
                    <ArrowRight size={16} />
                 </Link>
              </div>

           </motion.div>
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS for Clean Code ---

function FeatureCard({ icon: Icon, title, text }: { icon: any, title: string, text: string }) {
   return (
      <div className="group bg-white/5 hover:bg-white/10 border border-white/10 p-8 rounded-2xl transition-all duration-300">
         <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform">
            <Icon size={24} />
         </div>
         <h3 className="text-xl font-bold font-montserrat text-white mb-3">{title}</h3>
         <p className="text-white/60 text-sm leading-relaxed">{text}</p>
      </div>
   );
}

function StatRow({ number, label }: { number: string, label: string }) {
   return (
      <div className="flex items-end gap-4 border-b border-white/10 pb-4">
         <span className="text-5xl font-bold text-[#D4AF37] font-montserrat">{number}</span>
         <span className="text-white/80 text-sm pb-2 font-medium">{label}</span>
      </div>
   );
}

function SupportItem({ text }: { text: string }) {
   return (
      <div className="flex items-center gap-3 bg-[#0A2342]/50 p-3 rounded-lg border border-white/5">
         <FileCheck className="text-[#D4AF37] shrink-0" size={16} />
         <span className="text-white/80 text-xs font-medium">{text}</span>
      </div>
   );
}
