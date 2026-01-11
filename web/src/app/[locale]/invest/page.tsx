/* FULL REPLACEMENT: src/app/[locale]/invest/page.tsx */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Landmark, Globe, TrendingUp, CheckCircle2, ShieldCheck, Plane, Users, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function InvestPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Scroll Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });


  const CLOUD_NAME = "dkbpthpxg"; 
  const VIDEO_ID = "12626268_3840_2160_25fps_xr0ota"; 
  const VIDEO_URL = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto/${VIDEO_ID}.mp4`;

  // Background Animations
  const bgBlur = useTransform(scrollYProgress, [0, 0.2], ["0px", "12px"]);
  const bgOverlay = useTransform(scrollYProgress, [0, 0.5], ["rgba(10, 35, 66, 0.4)", "rgba(10, 35, 66, 0.90)"]);

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
    <div ref={containerRef} className="relative min-h-[450vh] bg-[#0A2342] text-white selection:bg-[#D4AF37] selection:text-white">
      
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
          src={VIDEO_URL}
        />
      </motion.div>

      {/* 2. SCROLLABLE CONTENT */}
      <div className="relative z-10 flex flex-col items-center w-full">

        {/* --- SCENE 1: HERO (The Intro Text) --- */}
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 text-center pt-32 pb-20">
            <motion.div 
               initial="hidden" animate="visible" variants={fadeUp}
               className="max-w-4xl"
            >
               <span className="inline-block py-1.5 px-4 border border-[#D4AF37]/50 rounded-full text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
                 Investment Guide
               </span>
               <h1 className="text-4xl md:text-7xl font-montserrat font-extrabold mb-8 leading-tight drop-shadow-2xl">
                 Why Invest in <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D4AF37] to-white">
                   Real Estate in Cyprus
                 </span>
               </h1>
               
               <div className="text-white/80 max-w-3xl mx-auto leading-relaxed font-light space-y-6 text-lg text-left md:text-center bg-[#0A2342]/40 p-8 rounded-3xl backdrop-blur-md border border-white/5">
                 <p>
                    Cyprus has established itself as one of Europe’s most attractive real estate destinations, offering a powerful combination of lifestyle appeal, investment security, and long-term growth potential.
                 </p>
                 <p>
                    As a member of the European Union and a key hub in the Eastern Mediterranean, the island continues to attract international buyers, investors, and families seeking both financial returns and a high quality of life.
                 </p>
               </div>
            </motion.div>
        </div>

        {/* --- SCENE 2: STRATEGIC STRENGTHS (3 Columns) --- */}
        <div className="w-full max-w-7xl px-6 py-24">
           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
             variants={staggerContainer}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
           >
              {/* Location */}
              <FeatureCard 
                icon={Globe}
                title="Strategic Gateway"
                text="One of Cyprus’ greatest strengths is its strategic geographical position at the crossroads of Europe, Asia, and Africa. A natural investment gateway supported by modern infrastructure and two international airports."
              />
              {/* Stability */}
              <FeatureCard 
                icon={ShieldCheck}
                title="Safe & Stable"
                text="Known for its safe, welcoming environment with low crime rates. The multicultural population and widespread English language usage make relocation and property ownership straightforward for foreign investors."
              />
              {/* Growth */}
              <FeatureCard 
                icon={TrendingUp}
                title="Market Growth"
                text="Driven by tourism, residential demand, and limited supply in prime locations. These factors create attractive opportunities for capital appreciation and steady rental income."
              />
           </motion.div>
        </div>

        {/* --- SCENE 3: LEGAL ENVIRONMENT --- */}
        <div className="w-full max-w-5xl px-6 mb-32">
            <motion.div 
               initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
               className="apple-glass rounded-3xl p-10 md:p-14"
            >
               <div className="flex flex-col md:flex-row gap-10 items-center">
                  <div className="flex-1">
                      <h2 className="text-3xl font-montserrat font-bold mb-4">Strong Legal & Business Environment</h2>
                      <p className="text-white/70 mb-6 leading-relaxed">
                          Cyprus operates under a robust legal system based on <strong>English Common Law</strong>. This framework is widely recognised for transparency, investor protection, and reliability.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <CheckItem text="Secure property ownership" />
                          <CheckItem text="Transparent land registry" />
                          <CheckItem text="Reliable contract enforcement" />
                          <CheckItem text="Business-friendly policies" />
                      </div>
                  </div>
                  <div className="bg-white/10 p-6 rounded-full">
                      <Landmark size={64} className="text-[#D4AF37]" />
                  </div>
               </div>
            </motion.div>
        </div>

        {/* --- SCENE 4: TAX & FINANCIAL BENEFITS (Big Visuals) --- */}
        <div className="w-full bg-[#F9F9F9] text-[#0A2342] py-32 rounded-[4rem] relative overflow-hidden my-20">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-montserrat font-bold">Attractive Tax & Financial Benefits</h2>
                 <p className="text-[#0A2342]/60 mt-4 max-w-2xl mx-auto">
                    Cyprus offers one of the most competitive tax regimes in the European Union.
                 </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  
                  {/* Left: The Heavy Hitters */}
                  <div className="space-y-8">
                      <StatRow number="15%" label="Corporate Tax Rate (Among Lowest in EU)" />
                      <StatRow number="0%" label="Inheritance, Succession, or Gift Taxes" />
                      <StatRow number="0%" label="Immovable Property Tax" />
                      <StatRow number="0%" label="Tax on Dividends (Non-domiciled)" />
                  </div>

                  {/* Right: The Full List */}
                  <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                      <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                         <ShieldCheck className="text-[#D4AF37]" /> Key Advantages
                      </h3>
                      <ul className="space-y-4 text-sm text-gray-600">
                          <li className="flex gap-3"><CheckCircle2 className="text-[#D4AF37] shrink-0" size={18} /> Double taxation treaties with 75+ countries</li>
                          <li className="flex gap-3"><CheckCircle2 className="text-[#D4AF37] shrink-0" size={18} /> No withholding tax on dividends or interest abroad</li>
                          <li className="flex gap-3"><CheckCircle2 className="text-[#D4AF37] shrink-0" size={18} /> Capital gains on securities are tax exempt</li>
                          <li className="flex gap-3"><CheckCircle2 className="text-[#D4AF37] shrink-0" size={18} /> <strong>Reduced 5% VAT</strong> on first primary residence (Conditions apply)</li>
                      </ul>
                  </div>

              </div>
           </div>
        </div>

        {/* --- SCENE 5: PERMANENT RESIDENCY --- */}
        <div className="w-full max-w-7xl px-6 py-24">
            <div className="text-center mb-16">
               <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs">EU Access</span>
               <h2 className="text-4xl font-montserrat font-bold text-white mt-2">Permanent Residency Investment Options</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 
                 {/* Fast Track */}
                 <motion.div 
                    whileHover={{ y: -10 }}
                    className="bg-white/5 border border-[#D4AF37]/30 backdrop-blur-xl p-10 rounded-3xl relative overflow-hidden"
                 >
                    <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#0A2342] text-[10px] font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider">
                       Fast Track
                    </div>
                    <Plane className="w-12 h-12 text-[#D4AF37] mb-6" />
                    <h3 className="text-2xl font-bold font-montserrat text-white mb-2">Fast-Track Residency</h3>
                    <div className="text-3xl font-light text-[#D4AF37] mb-6">€300,000 <span className="text-sm text-white/50">+VAT</span></div>
                    
                    <ul className="space-y-4 text-sm text-white/80">
                       <li className="flex gap-3"><CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" /> Investment in new residential property</li>
                       <li className="flex gap-3"><CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" /> Properties under construction are eligible</li>
                       <li className="flex gap-3"><CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" /> Residency valid for life</li>
                       <li className="flex gap-3"><CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" /> Leads to citizenship eligibility (5 years)</li>
                    </ul>
                 </motion.div>

                 {/* Standard Track */}
                 <div className="bg-[#0A2342] border border-white/10 p-10 rounded-3xl">
                    <Users className="w-12 h-12 text-white/40 mb-6" />
                    <h3 className="text-2xl font-bold font-montserrat text-white mb-2">Category F</h3>
                    <div className="text-xl font-light text-white/60 mb-6">Permanent Residency</div>
                    
                    <ul className="space-y-4 text-sm text-white/60">
                       <li className="flex gap-3"><CheckCircle2 size={16} className="text-white/40 shrink-0" /> Lower investment requirements</li>
                       <li className="flex gap-3"><CheckCircle2 size={16} className="text-white/40 shrink-0" /> Suitable for retirees or non-working residents</li>
                       <li className="flex gap-3"><CheckCircle2 size={16} className="text-white/40 shrink-0" /> Must prove stable income from abroad</li>
                    </ul>
                 </div>

            </div>

            <div className="mt-12 text-center text-white/60 text-sm max-w-2xl mx-auto border-t border-white/10 pt-8">
               <p className="mb-4"><strong className="text-white">Income Requirements & Family Coverage:</strong> Applicants must demonstrate sufficient income from abroad (Pensions, Dividends, etc.).</p>
               <p>Residency covers: Spouse, Dependent Children, and in certain cases, Parents.</p>
            </div>
        </div>

        {/* --- SCENE 6: HOW TMS SUPPORTS YOU (Finale) --- */}
        <div className="w-full max-w-5xl px-6 pb-32">
           <div className="relative overflow-hidden rounded-[3rem] bg-[#F9F9F9] text-[#0A2342] p-12 md:p-20 text-center shadow-[0_0_100px_rgba(255,255,255,0.1)]">
              
              <Briefcase className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                 How TMS ESTATES LTD Supports You
              </h2>
              <p className="text-lg text-[#0A2342]/70 max-w-3xl mx-auto mb-10">
                 We offer far more than property listings. With an in-house legal and finance team, 
                 we provide complete investment and relocation solutions tailored to your objectives.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 text-left max-w-4xl mx-auto mb-12">
                 <SupportItem text="Property Selection & Analysis" />
                 <SupportItem text="Permanent Residency Guidance" />
                 <SupportItem text="Tax & Legal Coordination" />
                 <SupportItem text="Banking Setup (Cyprus/Dubai/HK)" />
                 <SupportItem text="Property Management" />
                 <SupportItem text="After-Sales Support" />
              </div>

              <h3 className="text-2xl font-bold font-montserrat mb-8">Invest with Confidence</h3>

              <Link 
                   href="/#contact"
                   className="inline-flex items-center gap-3 bg-[#0A2342] text-white px-10 py-5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#D4AF37] transition-all shadow-xl hover:-translate-y-1"
                 >
                    Contact TMS Estates Today
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
      <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
         <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37] mb-6">
            <Icon size={24} />
         </div>
         <h3 className="text-xl font-bold font-montserrat text-white mb-3">{title}</h3>
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
         <span className="text-5xl font-bold text-[#D4AF37] font-montserrat w-24">{number}</span>
         <span className="text-[#0A2342]/80 text-sm pb-2 font-bold uppercase tracking-wide">{label}</span>
      </div>
   );
}

function SupportItem({ text }: { text: string }) {
   return (
      <div className="flex items-center gap-3 p-2">
         <CheckCircle2 className="text-[#D4AF37] shrink-0" size={18} />
         <span className="text-[#0A2342]/80 text-sm font-semibold">{text}</span>
      </div>
   );
}