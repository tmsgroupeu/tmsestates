/* FULL REPLACEMENT: src/app/[locale]/invest/page.tsx */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Landmark, Globe, TrendingUp, CheckCircle2, ShieldCheck, Plane, Users, Briefcase, ArrowRight, Percent } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function InvestPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Scroll Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // CLOUDINARY VIDEO CONFIG (Ensure these match your uploaded file)
  const CLOUD_NAME = "dkbpthpxg"; 
  const VIDEO_ID = "12626266_1920_1080_25fps_xzeheg";
  const VIDEO_SRC = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto/${VIDEO_ID}.mp4`;

  // Background Animations
  // We blur the video heavily as we scroll down to make text readable
  const bgBlur = useTransform(scrollYProgress, [0, 0.2], ["0px", "12px"]);
  const bgOverlay = useTransform(scrollYProgress, [0, 0.5], ["rgba(10, 35, 66, 0.3)", "rgba(10, 35, 66, 0.92)"]);

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    // We use a responsive min-height to ensure enough scroll track
    <div ref={containerRef} className="relative bg-[#0A2342] text-white overflow-hidden">
      
      {/* 1. FIXED BACKGROUND VIDEO */}
      <motion.div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <motion.div 
            style={{ backdropFilter: `blur(${bgBlur})`, backgroundColor: bgOverlay }}
            className="absolute inset-0 z-10"
        />
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover scale-110 origin-center"
          src={VIDEO_SRC}
        />
      </motion.div>

      {/* 2. CONTENT LAYER */}
      <div className="relative z-10 flex flex-col items-center w-full">

        {/* --- SCENE 1: HERO & INTRO (Spaced Out) --- */}
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-32 md:py-40">
            <motion.div 
               initial="hidden" animate="visible" variants={fadeUp}
               className="max-w-5xl text-center flex flex-col items-center"
            >
               {/* Label */}
               <span className="inline-block py-1.5 px-4 border border-[#D4AF37]/50 rounded-full text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
                 Investment Intelligence
               </span>

               {/* Title */}
               <h1 className="text-4xl md:text-7xl font-montserrat font-extrabold mb-12 leading-tight drop-shadow-2xl">
                 Why Invest in <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D4AF37] to-white">
                   Real Estate in Cyprus
                 </span>
               </h1>
               
               {/* Intro Text Box - ADDED MARGIN TOP */}
               <div className="mt-8 text-white/90 max-w-3xl leading-relaxed font-light space-y-6 text-lg bg-[#0A2342]/60 p-8 md:p-10 rounded-[2rem] backdrop-blur-md border border-white/10 shadow-2xl">
                 <p>
                    Cyprus has established itself as one of Europe’s most attractive real estate destinations, offering a powerful combination of lifestyle appeal, investment security, and long-term growth potential.
                 </p>
                 <p>
                    As a member of the European Union and a key hub in the Eastern Mediterranean, the island continues to attract international buyers, investors, and families seeking both financial returns and a high quality of life.
                 </p>
               </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
               className="mt-20 flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest text-white/50"
            >
               <span>Explore Key Drivers</span>
               <div className="h-12 w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent" />
            </motion.div>
        </div>

        {/* --- SCENE 2: STRATEGIC PILLARS --- */}
        <div className="w-full max-w-7xl px-6 py-24">
           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
             variants={staggerContainer}
             className="grid grid-cols-1 md:grid-cols-3 gap-6"
           >
              <FeatureCard 
                icon={Globe}
                title="Strategic Gateway"
                text="One of Cyprus’ greatest strengths is its strategic geographical position at the crossroads of Europe, Asia and Africa. This makes the island a natural investment gateway, supported by modern infrastructure and two international airports. Together with a warm Mediterranean climate, beautiful coastlines and a wide range of residential options, Cyprus offers a lifestyle that consistently sustains strong demand for property."
              />
              <FeatureCard 
                icon={ShieldCheck}
                title="Safe & Stable"
                text="Cyprus is also known for its safe, stable, and welcoming environment. The country benefits from a strong legal framework based on English Common Law principles, low crime rates, and a transparent property ownership system. English is widely spoken, and the multicultural population makes relocation and property ownership straightforward for foreign investors."
              />
              <FeatureCard 
                icon={TrendingUp}
                title="Market Growth"
                text="From an investment perspective, the Cyprus real estate market continues to grow, driven by tourism, residential demand, and limited supply in prime locations. These factors create attractive opportunities for both capital appreciation and steady rental income, whether through holiday rentals or long-term leasing."
              />
           </motion.div>
        </div>

        {/* --- SCENE 3: LEGAL & BUSINESS (Glass Panel) --- */}
        <div className="w-full max-w-5xl px-6 mb-32">
            <motion.div 
               initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
               className="apple-glass rounded-3xl p-10 md:p-14 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
               <div className="flex flex-col md:flex-row gap-10 items-center">
                  <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4 text-[#D4AF37]">
                          <Landmark size={24} />
                          <span className="text-xs font-bold uppercase tracking-widest">Strong Legal & Business Environment</span>
                      </div>
                      <h2 className="text-3xl font-montserrat font-bold mb-4 text-white">English Common Law System</h2>
                      <p className="text-white/70 mb-8 leading-relaxed">
                          Cyprus operates under a robust and well-established legal and regulatory system based on English Common Law. This framework is widely recognised for its transparency, investor protection, and reliability, making Cyprus one of the safest jurisdictions in Europe for real estate investment.
<br/> <br/>The regulatory environment ensures:

                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                          <CheckItem text="Secure and clearly defined property ownership" />
                          <CheckItem text="Transparent registry procedures" />
                          <CheckItem text="Reliable contract enforcement" />
                          <CheckItem text="Business-friendly policies for foreign investors" />
                      </div>
                  </div>
                  {/* Decorative Icon */}
                  <div className="hidden md:flex bg-white/5 p-8 rounded-full border border-white/10">
                      <ShieldCheck size={64} className="text-[#D4AF37] opacity-80" />
                  </div>
               </div>
            </motion.div>
        </div>

        {/* --- SCENE 4: TAX ADVANTAGE (White Section) --- */}
        <div className="w-full bg-[#F9F9F9] text-[#0A2342] py-32 rounded-[3rem] relative overflow-hidden my-10">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-montserrat font-bold">Attractive Tax & Financial Benefits</h2>
                 <p className="text-[#0A2342]/60 mt-4 max-w-2xl mx-auto">
                    One of the most competitive tax regimes in the European Union.
                 </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  
                  {/* Big Stats */}
                  <div className="space-y-8 pt-4">
                      <StatRow number="15%" label="Corporate Tax Rate (Lowest in EU)" />
                      <StatRow number="0%" label="Inheritance & Gift Tax" />
                      <StatRow number="0%" label="Immovable Property Tax" />
                      <StatRow number="0%" label="Capital Gains on Securities" />
                  </div>

                  {/* Detailed Card */}
                  <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative">
                      <div className="absolute top-0 right-0 p-6 opacity-10">
                          <Percent size={120} className="text-[#0A2342]" />
                      </div>
                      <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-[#D4AF37]">
                         Key Advantages
                      </h3>
                      <ul className="space-y-5 text-sm text-gray-600 relative z-10">
                          <li className="flex gap-4"><CheckCircle2 className="text-[#D4AF37] shrink-0 mt-0.5" size={18} /> <span>Double taxation treaties with 75+ countries</span></li>
                          <li className="flex gap-4"><CheckCircle2 className="text-[#D4AF37] shrink-0 mt-0.5" size={18} /> <span>No withholding tax on dividends or interest abroad</span></li>
                          <li className="flex gap-4"><CheckCircle2 className="text-[#D4AF37] shrink-0 mt-0.5" size={18} /> <span>Dividend tax exemption for Non-domiciled residents</span></li>
                          <li className="flex gap-4"><CheckCircle2 className="text-[#D4AF37] shrink-0 mt-0.5" size={18} /> <span><strong>Reduced 5% VAT</strong> on first primary residence (Conditions apply)</span></li>
                      </ul>
                  </div>

              </div>
           </div>
        </div>

        {/* --- SCENE 5: RESIDENCY OPTIONS --- */}
        <div className="w-full max-w-7xl px-6 py-24">
            <div className="text-center mb-16">
               <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs">EU Access</span>
               <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-white mt-2">Permanent Residency</h2>
              <p className="text-[#0A2342]/60 mt-4 max-w-2xl mx-auto">
                    Cyprus offers different permanent residency categories to accommodate various investor profiles:
                 </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 
                 {/* Option A: Fast Track */}
                 <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-[#0A2342] to-[#0A2342]/80 border border-[#D4AF37]/40 p-10 rounded-3xl relative overflow-hidden shadow-2xl"
                 >
                    <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#0A2342] text-[10px] font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider">
                       Most Popular
                    </div>
                    <Plane className="w-12 h-12 text-[#D4AF37] mb-6" />
                    <h3 className="text-2xl font-bold font-montserrat text-white mb-2">Fast-Track Residency</h3>
                    <div className="text-3xl font-light text-[#D4AF37] mb-6">€300,000 <span className="text-sm text-white/50">+VAT</span></div>
                    
                    <ul className="space-y-4 text-sm text-white/80">
                       <li className="flex gap-3"><ShieldCheck size={18} className="text-[#D4AF37]" /> Investment in new residential property</li>
                       <li className="flex gap-3"><ShieldCheck size={18} className="text-[#D4AF37]" /> Residency valid for life</li>
                       <li className="flex gap-3"><ShieldCheck size={18} className="text-[#D4AF37]" /> Path to Citizenship (5 Years)</li>
                    </ul>
                 </motion.div>

                 {/* Option B: Standard */}
                 <div className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors">
                    <Users className="w-12 h-12 text-white/40 mb-6" />
                    <h3 className="text-2xl font-bold font-montserrat text-white mb-2">Category F</h3>
                    <div className="text-xl font-light text-white/60 mb-6">Standard Residency</div>
                    
                    <ul className="space-y-4 text-sm text-white/60">
                       <li className="flex gap-3"><CheckCircle2 size={18} className="text-white/40 shrink-0" /> Lower investment requirements</li>
                       <li className="flex gap-3"><CheckCircle2 size={18} className="text-white/40 shrink-0" /> Suitable for retirees</li>
                       <li className="flex gap-3"><CheckCircle2 size={18} className="text-white/40 shrink-0" /> Requires stable overseas income</li>
                    </ul>
                 </div>
            </div>
            
            <div className="mt-12 text-center text-white/50 text-xs max-w-2xl mx-auto border-t border-white/10 pt-8">
               <p>Residency covers: Spouse, Dependent Children, and in certain cases, Parents.</p>
            </div>
        </div>

        {/* --- SCENE 6: THE FINALE (Support Card) --- */}
        {/* Adjusted padding bottom (pb-32) to sit nicely above footer */}
        <div className="w-full max-w-5xl px-6 pb-40">
           <div className="relative overflow-hidden rounded-[3rem] bg-white text-[#0A2342] p-12 md:p-20 text-center shadow-[0_0_100px_rgba(255,255,255,0.15)]">
              
              <Briefcase className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                 Expert Guidance. Every Step.
              </h2>
              <p className="text-lg text-[#0A2342]/70 max-w-3xl mx-auto mb-10">
                 With our in-house legal and finance team, TMS ESTATES LTD provides end-to-end relocation solutions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 text-left max-w-4xl mx-auto mb-12">
                 <SupportItem text="Property Analysis" />
                 <SupportItem text="Residency Application" />
                 <SupportItem text="Legal Coordination" />
                 <SupportItem text="Banking Setup" />
                 <SupportItem text="Property Management" />
                 <SupportItem text="After-Sales Care" />
              </div>

              <Link 
                   href="/#contact"
                   className="inline-flex items-center gap-3 bg-[#0A2342] text-white px-10 py-5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#D4AF37] transition-all shadow-xl hover:-translate-y-1"
                 >
                    Contact Us Today
                    <ArrowRight size={16} />
              </Link>
           </div>
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function FeatureCard({ icon: Icon, title, text }: { icon: any, title: string, text: string }) {
   return (
      <div className="group bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors backdrop-blur-sm">
         <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform">
            <Icon size={24} />
         </div>
         <h3 className="text-lg font-bold font-montserrat text-white mb-3">{title}</h3>
         <p className="text-white/60 text-sm leading-relaxed">{text}</p>
      </div>
   );
}

function CheckItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-white/80 text-sm">{text}</span>
        </div>
    )
}

function StatRow({ number, label }: { number: string, label: string }) {
   return (
      <div className="flex items-end gap-4 border-b border-[#0A2342]/10 pb-4">
         <span className="text-4xl md:text-5xl font-bold text-[#D4AF37] font-montserrat w-24 tabular-nums">{number}</span>
         <span className="text-[#0A2342]/80 text-sm pb-2 font-bold uppercase tracking-wide leading-tight">{label}</span>
      </div>
   );
}

function SupportItem({ text }: { text: string }) {
   return (
      <div className="flex items-center gap-3 p-2 border border-gray-100 rounded-lg bg-gray-50/50">
         <CheckCircle2 className="text-[#D4AF37] shrink-0" size={16} />
         <span className="text-[#0A2342]/80 text-xs font-bold uppercase tracking-wide">{text}</span>
      </div>
   );
}
