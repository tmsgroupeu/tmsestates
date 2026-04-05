"use client";

import { motion } from "framer-motion";
import { Lock, ArrowRight, Star } from "lucide-react";
import Image from "next/image";

export default function PrivateCollection() {
  return (
    <div className="relative w-full mx-auto p-8 md:p-16 lg:p-24 overflow-hidden rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/5">
      
      {/* BACKGROUND IMAGE WITH BLUR */}
      <div className="absolute inset-0 z-0 bg-[#0A2342]">
        <Image 
          src="https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg" 
          alt="Luxury Interior" 
          fill 
          className="object-cover scale-105 opacity-60 mix-blend-overlay grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342] via-[#0A2342]/70 to-[#0A2342]/40 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
         
         <motion.div 
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
           className="w-16 h-16 rounded-full border border-[#D4AF37]/30 bg-[#0A2342]/50 backdrop-blur-md flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(212,175,55,0.2)]"
         >
            <Lock className="text-[#D4AF37]" size={24} />
         </motion.div>

         <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
           className="font-playfair text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-2xl"
         >
           The <span className="italic font-light text-[#D4AF37]">Private</span> Collection
         </motion.h2>

         <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
           className="text-white/80 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed mb-12"
         >
           Gain exclusive access to our highly sought-after off-market Signature Developments and VIP investment opportunities before they launch to the public.
         </motion.p>

         <motion.form 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
           className="w-full max-w-xl flex flex-col sm:flex-row gap-4 px-4 isolate"
           onSubmit={(e) => e.preventDefault()}
         >
           <div className="flex-1 relative relative group">
             {/* Apple Glass Input */}
             <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-full border border-white/20 transition-all duration-300 group-focus-within:bg-white/10 group-focus-within:border-[#D4AF37]/50" />
             <input 
               type="email" 
               name="email"
               placeholder="Enter your email address..." 
               className="relative z-10 w-full bg-transparent text-white placeholder-white/40 px-8 py-4 md:py-5 rounded-full outline-none font-montserrat text-sm"
               required
             />
           </div>
           
           <button 
             type="submit" 
             className="bg-gradient-to-r from-[#D4AF37] to-[#e6cf80] text-[#0A2342] px-8 py-4 md:py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] relative overflow-hidden"
           >
             Unlock Access <ArrowRight size={16} />
             <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity" />
           </button>
         </motion.form>

         <motion.p
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
           className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-bold mt-10 md:mt-12 flex items-center justify-center gap-3"
         >
           <div className="h-px w-8 bg-white/20" />
           Curated for high-net-worth individuals
           <div className="h-px w-8 bg-white/20" />
         </motion.p>

      </div>
    </div>
  );
}
