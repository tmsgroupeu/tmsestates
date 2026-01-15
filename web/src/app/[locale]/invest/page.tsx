/* FULL REPLACEMENT: src/app/[locale]/invest/page.tsx */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Landmark, Globe, TrendingUp, CheckCircle2, ShieldCheck, Plane, Users, Briefcase, ArrowRight, Percent, FileText } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function InvestPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Scroll Hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // CLOUDINARY VIDEO CONFIG
  const CLOUD_NAME = "dkbpthpxg"; 
  const VIDEO_ID = "12626266_1920_1080_25fps_xzeheg";
  const VIDEO_SRC = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto/${VIDEO_ID}.mp4`;

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
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    // Min-height ensures enough scrolling space for the content
    <div ref={containerRef} className="relative bg-[#0A2342] text-white selection:bg-[#D4AF37] selection:text-white pb-20">
      
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

      {/* 2. SCROLLABLE CONTENT */}
      <div className="relative z-10 flex flex-col items-center w-full">

        {/* --- SCENE 1: HERO & INTRO TEXT --- */}
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 pt-40 pb-20">
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
               
               {/* Intro Text Box (Glass) */}
               <div className="mt-8 text-white/90 max-w-4xl text-left md:text-center leading-relaxed font-light space-y-6 text-lg bg-[#0A2342]/60 p-8 md:p-12 rounded-[2rem] backdrop-blur-md border border-white/10 shadow-2xl">
                 <p>
                    Cyprus has established itself as one of Europe’s most attractive real estate destinations, offering a powerful combination of lifestyle appeal, investment security, and long-term growth potential. As a member of the European Union and a key hub in the Eastern Mediterranean, the island continues to attract international buyers, investors, and families seeking both financial returns and a high quality of life.
                 </p>
                 <p>
                    In addition, Cyprus offers an appealing Permanent Residency by Investment programme. Non-EU nationals who invest in qualifying real estate with a minimum value of €300,000 may apply for permanent residency for themselves and their family through a fast-track process.
                 </p>
               </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
               className="mt-16 flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest text-white/50"
            >
               <span>Explore Key Drivers</span>
               <div className="h-12 w-[1px] bg-gradient-to-b from-[#D4AF37] to-transparent" />
            </motion.div>
        </div>

        {/* --- SCENE 2: KEY STRENGTHS (3 Columns) --- */}
        <div className="w-full max-w-7xl px-6 py-24">
           <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
             variants={staggerContainer}
             className="grid grid-cols-1 md:grid-cols-3 gap-6"
           >
              {/* Strategic Position */}
              <FeatureCard 
                icon={Globe}
                title="Strategic Gateway"
                text="One of Cyprus’ greatest strengths is its strategic geographical position at the crossroads of Europe, Asia and Africa. This makes the island a natural investment gateway, supported by modern infrastructure and two international airports. Together with a warm Mediterranean climate, beautiful coastlines and a wide range of residential options, Cyprus offers a lifestyle that consistently sustains strong demand for property."
              />
              {/* Safety */}
              <FeatureCard 
                icon={ShieldCheck}
                title="Safe & Stable"
                text="Cyprus is also known for its safe, stable, and welcoming environment. The country benefits from a strong legal framework based on English Common Law principles, low crime rates, and a transparent property ownership system. English is widely spoken, and the multicultural population makes relocation and property ownership straightforward for foreign investors."
              />
              {/* Growth */}
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
                          <span className="text-xs font-bold uppercase tracking-widest">Legal Framework</span>
                      </div>
                      <h2 className="text-3xl font-montserrat font-bold mb-4 text-white">Strong Legal & Business Environment</h2>
                      <p className="text-white/80 mb-6 leading-relaxed">
                          Cyprus operates under a robust and well-established legal and regulatory system based on English Common Law. This framework is widely recognised for its transparency, investor protection, and reliability, making Cyprus one of the safest jurisdictions in Europe for real estate investment.
                      </p>
                      <p className="text-white/60 text-sm mb-4">The regulatory environment ensures:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                          <CheckItem text="Secure and clearly defined property ownership" />
                          <CheckItem text="Transparent land registry procedures" />
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

        {/* --- SCENE 4: TAX & FINANCIAL BENEFITS (White Section) --- */}
        <div className="w-full bg-[#F9F9F9] text-[#0A2342] py-32 rounded-[4rem] relative overflow-hidden my-10">
           <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-montserrat font-bold">Attractive Tax & Financial Benefits</h2>
                 <p className="text-[#0A2342]/70 mt-4 max-w-3xl mx-auto text-lg">
                    Cyprus offers one of the most competitive tax regimes in the European Union, significantly enhancing the overall return on real estate and business investments.
                 </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  
                  {/* Big Stats */}
                  <div className="space-y-8 pt-4">
                      <StatRow number="15%" label="Corporate Tax Rate (Among Lowest in EU)" />
                      <div className="border-b border-[#0A2342]/10 pb-4">
                          <span className="text-2xl font-bold text-[#D4AF37] font-montserrat block mb-1">0% / 5%</span>
                          <span className="text-[#0A2342]/80 text-sm font-bold uppercase tracking-wide">Dividend Tax (Non-Dom vs Domiciled)</span>
                      </div>
                      <StatRow number="0%" label="Inheritance, Succession, or Gift Taxes" />
                      <StatRow number="0%" label="Immovable Property Tax" />
                  </div>

                  {/* Detailed Card */}
                  <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative">
                      <div className="absolute top-0 right-0 p-8 opacity-5">
                          <Percent size={140} className="text-[#0A2342]" />
                      </div>
                      <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-[#D4AF37]">
                         Key Benefits Include:
                      </h3>
                      <ul className="space-y-5 text-sm text-gray-600 relative z-10">
                          <li className="flex gap-4"><CheckCircle2 className="text-[#D4AF37] shrink-0 mt-0.5" size={18} /> <span>Extensive double taxation treaty network with over 75 countries</span></li>
                          <li className="flex gap-4"><CheckCircle2 className="text-[#D4AF37] shrink-0 mt-0.5" size={18} /> <span>No withholding tax on dividends, interest, or royalty payments abroad</span></li>
                          <li className="flex gap-4"><CheckCircle2 className="text-[#D4AF37] shrink-0 mt-0.5" size={18} /> <span>Capital gains from the sale of securities are tax exempt</span></li>
                          <li className="flex gap-4"><CheckCircle2 className="text-[#D4AF37] shrink-0 mt-0.5" size={18} /> <span><strong>Reduced VAT on First Residence</strong> - Buyers acquiring a new property as their primary residence in Cyprus may qualify for a reduced VAT rate of 5%.</span></li>
                      </ul>
                  </div>

              </div>
           </div>
        </div>

        {/* --- SCENE 5: PERMANENT RESIDENCY --- */}
        <div className="w-full max-w-7xl px-6 py-24">
            <div className="text-center mb-16">
               <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-xs">EU Access</span>
               <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-white mt-2">Permanent Residency Options</h2>
               <p className="text-white/60 mt-4 max-w-2xl mx-auto">
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
                    <h3 className="text-2xl font-bold font-montserrat text-white mb-2">Fast-Track Permanent Residency</h3>
                    <div className="text-3xl font-light text-[#D4AF37] mb-6">€300,000 <span className="text-sm text-white/50">+VAT</span></div>
                    
                    <ul className="space-y-4 text-sm text-white/80">
                       <li className="flex gap-3"><ShieldCheck size={18} className="text-[#D4AF37] shrink-0" /> Investment in new residential property</li>
                       <li className="flex gap-3"><ShieldCheck size={18} className="text-[#D4AF37] shrink-0" /> Properties under construction are eligible</li>
                       <li className="flex gap-3"><ShieldCheck size={18} className="text-[#D4AF37] shrink-0" /> Residency valid for life</li>
                       <li className="flex gap-3"><ShieldCheck size={18} className="text-[#D4AF37] shrink-0" /> Leads to eligibility for citizenship (5 Years)</li>
                    </ul>
                 </motion.div>

                 {/* Option B: Standard */}
                 <div className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors">
                    <Users className="w-12 h-12 text-white/40 mb-6" />
                    <h3 className="text-2xl font-bold font-montserrat text-white mb-2">Permanent Residency</h3>
                    <div className="text-xl font-light text-white/60 mb-6">Standard Category</div>
                    
                    <ul className="space-y-4 text-sm text-white/60">
                       <li className="flex gap-3"><CheckCircle2 size={18} className="text-white/40 shrink-0" /> Lower investment requirements</li>
                       <li className="flex gap-3"><CheckCircle2 size={18} className="text-white/40 shrink-0" /> Suitable for individuals with stable income from abroad</li>
                       <li className="flex gap-3"><CheckCircle2 size={18} className="text-white/40 shrink-0" /> Ideal for retirees or non-working residents</li>
                    </ul>
                 </div>
            </div>
            
            <div className="mt-12 bg-white/5 p-8 rounded-2xl border border-white/10 text-center text-sm text-white/80 max-w-4xl mx-auto">
               <h4 className="text-[#D4AF37] font-bold mb-2 uppercase text-xs tracking-wider">Income Requirements & Family Coverage</h4>
               <p className="mb-2">Applicants must demonstrate sufficient income from abroad (salaries, pensions, dividends, etc.).</p>
               <p>Permanent residency may cover: <strong>Spouse</strong>, <strong>Dependent children</strong>, and in certain cases, <strong>parents or parents-in-law</strong>.</p>
            </div>
        </div>

        {/* --- SCENE 6: HOW TMS SUPPORTS YOU (Finale) --- */}
        <div className="w-full max-w-5xl px-6 pb-40">
           <div className="relative overflow-hidden rounded-[3rem] bg-white text-[#0A2342] p-12 md:p-20 text-center shadow-[0_0_100px_rgba(255,255,255,0.15)]">
              
              <Briefcase className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
                 How TMS ESTATES LTD Supports You
              </h2>
              <p className="text-lg text-[#0A2342]/70 max-w-3xl mx-auto mb-10 leading-relaxed">
                 At TMS ESTATES LTD, we offer far more than property listings. With an in-house legal and finance team, we provide complete investment and relocation solutions tailored to each client’s objectives.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-left max-w-4xl mx-auto mb-16">
                 <SupportItem text="Property selection and investment analysis" />
                 <SupportItem text="Guidance on permanent residency requirements" />
                 <SupportItem text="Coordination with legal, tax, and compliance professionals" />
                 <SupportItem text="Assistance with banking setup (Cyprus, Dubai, HK)" />
                 <SupportItem text="Property management and maintenance" />
                 <SupportItem text="Ongoing after-sales and investor support" />
              </div>

              <div className="flex flex-col items-center gap-6">
                 <h3 className="text-2xl font-bold font-montserrat">Invest with Confidence</h3>
                 <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-4">
                    Whether your goal is lifestyle relocation, rental income, or long-term capital growth, Cyprus offers a secure and rewarding real estate environment.
                 </p>

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
    </div>
  );
}

// --- SUB-COMPONENTS ---
function FeatureCard({ icon: Icon, title, text }: { icon: any, title: string, text: string }) {
   return (
      <div className="group bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors backdrop-blur-sm h-full">
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
        <div className="flex items-start gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
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
      <div className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg bg-gray-50/50">
         <FileText className="text-[#D4AF37] shrink-0 mt-0.5" size={16} />
         <span className="text-[#0A2342]/80 text-xs font-semibold leading-relaxed">{text}</span>
      </div>
   );
}
