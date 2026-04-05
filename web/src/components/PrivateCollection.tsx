/* FULL REPLACEMENT: src/components/PrivateCollection.tsx */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowRight, Star, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function PrivateCollection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("submitting");
    // Simulate a secure backend process delay for a luxury feel
    setTimeout(() => {
       setStatus("success");
    }, 1500);
  };

  return (
    <div className="relative w-full mx-auto py-10 px-6 md:py-16 md:px-12 lg:py-20 overflow-hidden rounded-[2.5rem] md:rounded-[3rem] shadow-[0_20px_80px_rgba(0,0,0,0.7)] border border-white/5 flex items-center justify-center">
      
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

      <div className="relative z-10 w-full flex flex-col items-center text-center">
         
         <AnimatePresence mode="wait">
            {status !== "success" ? (
               <motion.div 
                 key="form-view"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                 transition={{ duration: 0.8 }}
                 className="flex flex-col items-center w-full"
               >
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.8 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                   className="w-14 h-14 rounded-full border border-[#D4AF37]/30 bg-[#0A2342]/50 backdrop-blur-md flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                 >
                    <Lock className="text-[#D4AF37]" size={20} />
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
                   className="text-white/80 text-base md:text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed mb-10"
                 >
                   Gain exclusive access to our highly sought-after off-market Signature Developments and VIP investment opportunities before they launch to the public.
                 </motion.p>

                 <motion.form 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
                   className="w-full max-w-xl flex flex-col sm:flex-row gap-4 px-4 isolate"
                   onSubmit={handleSubmit}
                 >
                   <div className="flex-1 relative group">
                     {/* Apple Glass Input */}
                     <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-full border border-white/20 transition-all duration-300 group-focus-within:bg-white/10 group-focus-within:border-[#D4AF37]/50" />
                     <input 
                       type="email" 
                       name="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="Enter your email address..." 
                       className="relative z-10 w-full bg-transparent text-white placeholder-white/40 px-8 py-4 md:py-5 rounded-full outline-none font-montserrat text-sm"
                       required
                       disabled={status === "submitting"}
                     />
                   </div>
                   
                   <button 
                     type="submit" 
                     disabled={status === "submitting"}
                     className={`bg-gradient-to-r from-[#D4AF37] to-[#e6cf80] text-[#0A2342] px-8 py-4 md:py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs transition-all flex items-center justify-center gap-2 relative overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.4)]
                        ${status === "submitting" ? "opacity-80 scale-95 pointer-events-none" : "hover:scale-105"}
                     `}
                   >
                     {status === "submitting" ? "Encrypting..." : "Unlock Access"}
                     {status !== "submitting" && <ArrowRight size={16} />}
                     <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity" />
                   </button>
                 </motion.form>

                 <motion.div
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
                   className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-bold mt-10 md:mt-12 flex items-center justify-center gap-3 w-full"
                 >
                   <div className="h-px w-8 bg-white/20" />
                   Curated for high-net-worth individuals
                   <div className="h-px w-8 bg-white/20" />
                 </motion.div>

               </motion.div>
            ) : (
               <motion.div 
                 key="success-view"
                 initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                 animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                 transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
                 className="flex flex-col items-center py-12"
               >
                  <motion.div 
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", bounce: 0.6, duration: 1 }}
                    className="w-20 h-20 rounded-full border border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/20 to-transparent flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(212,175,55,0.4)] backdrop-blur-md"
                  >
                     <Check className="text-[#D4AF37]" size={36} strokeWidth={1.5} />
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="font-playfair text-4xl md:text-5xl text-white mb-6 drop-shadow-xl"
                  >
                    Access <span className="italic font-light text-[#D4AF37]">Granted</span>
                  </motion.h3>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-white/80 font-light tracking-wide max-w-md mx-auto leading-relaxed text-lg"
                  >
                     Your secured invitation has been formalized. Our VIP advisory team will reach out to {email} shortly.
                  </motion.p>
               </motion.div>
            )}
         </AnimatePresence>

      </div>
    </div>
  );
}
