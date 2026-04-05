/* FULL REPLACEMENT: src/components/Footer.tsx */
"use client";

import Image from "next/image";
import { Mail, MessageCircle, Send, Bot } from 'lucide-react'; 
import { Link } from "@/i18n/routing"; 

export default function Footer() {
  
  // Function to trigger the AI Widget from the footer
  const openAIChat = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-ai-chat"));
  };

  return (
    <footer id="page-footer" className="bg-gradient-to-t from-white/90 via-white/80 to-white/70 backdrop-blur-3xl border-t border-white shadow-[0_-20px_60px_rgba(0,0,0,0.05)] text-[#0A2342]/70 relative z-20 isolate">
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative z-10">
            
            {/* Top Row: Logo & Socials */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-[#0A2342]/10 pb-12">
                
                <Link href="/" className="shrink-0 group">
                    <Image 
                        src="/tms-logo.svg" 
                        alt="TMS Estates Logo" 
                        width={180} 
                        height={45} 
                        className="w-40 md:w-48 h-auto object-contain transition-transform duration-500 group-hover:scale-105 opacity-90" 
                    />
                </Link>

                <div className="flex justify-center items-center gap-6 flex-wrap">
                    {/* Standard Contacts */}
                    <a href="https://wa.me/99875500" target="_blank" rel="noreferrer" className="footer-bubble group">
                        <div className="icon-circle"><MessageCircle size={18} strokeWidth={1.5} /></div>
                        <span>WhatsApp</span>
                    </a>
                    
                    <a href="mailto:info@tmsestates.com" className="footer-bubble group">
                        <div className="icon-circle"><Mail size={18} strokeWidth={1.5} /></div>
                        <span>Email</span>
                    </a>

                    <a href="https://t.me/YOUR_USER" target="_blank" rel="noreferrer" className="footer-bubble group">
                        <div className="icon-circle"><Send size={18} strokeWidth={1.5} /></div>
                        <span>Telegram</span>
                    </a>

                    {/* ✅ NEW AI ASSISTANT BUTTON IN FOOTER */}
                    <button onClick={openAIChat} className="footer-bubble group shine-effect">
                        <div className="icon-circle ai-glow">
                            <Bot size={18} strokeWidth={1.5} className="current-text" />
                        </div>
                        <span className="text-[#D4AF37] group-hover:text-[#0A2342] transition-colors">AI Assistant</span>
                    </button>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-center pt-8">
                <p className="font-light tracking-wide">&copy; {new Date().getFullYear()} TMS ESTATES. All rights reserved.</p>
                <div className="flex gap-8">
                    <Link href="/privacy-policy" className="font-light hover:text-[#D4AF37] transition-colors duration-300">Privacy Policy</Link>
                    <Link href="/terms-of-use" className="font-light hover:text-[#D4AF37] transition-colors duration-300">Terms of Use</Link>
                </div>
            </div>
        </div>

        {/* Local Styles for Footer VIP Aesthetics */}
        <style jsx>{`
           .footer-bubble {
              display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
              font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em;
              font-weight: 600; cursor: pointer; color: rgba(10,35,66,0.6);
              transition: color 0.3s ease;
           }
           .footer-bubble:hover {
              color: rgba(10,35,66,1);
           }
           .icon-circle {
              background: rgba(10,35,66,0.05); padding: 1rem; border-radius: 9999px;
              color: rgba(10,35,66,0.8); border: 1px solid rgba(10,35,66,0.05);
              transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
           }
           .group:hover .icon-circle {
              background: #0A2342; color: #ffffff; transform: scale(1.15) translateY(-2px);
              box-shadow: 0 10px 30px rgba(10,35,66,0.2);
           }
           
           /* AI specific luxury overrides */
           .ai-glow {
              background: rgba(212, 175, 55, 0.1); border-color: rgba(212, 175, 55, 0.3); color: #D4AF37;
           }
           .shine-effect:hover .ai-glow {
              background: #D4AF37; color: #ffffff; 
              box-shadow: 0 0 40px rgba(212,175,55,0.6); border-color: transparent;
           }
        `}</style>
    </footer>
  );
}
