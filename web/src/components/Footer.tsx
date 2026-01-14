/* FULL REPLACEMENT: src/components/Footer.tsx */
"use client";

import Image from "next/image";
import { Mail, MessageCircle, Send, Bot } from 'lucide-react'; // Added Bot icon
import { Link } from "@/i18n/routing"; 

export default function Footer() {
  
  // Function to trigger the AI Widget from the footer
  const openAIChat = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-ai-chat"));
  };

  return (
    <footer id="page-footer" className="bg-[#0A2342] text-white/70 relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Top Row: Logo & Socials */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-8">
                
                <Link href="/" className="shrink-0">
                    <Image 
                        src="/tms-logo-white.svg" 
                        alt="TMS Estates Logo" 
                        width={180} 
                        height={45} 
                        className="w-40 md:w-48 h-auto object-contain" 
                    />
                </Link>

                <div className="flex justify-center items-center gap-4 flex-wrap">
                    {/* Standard Contacts */}
                    <a href="https://wa.me/99875500" target="_blank" rel="noreferrer" className="footer-bubble group">
                        <div className="icon-circle"><MessageCircle size={20} /></div>
                        <span>WhatsApp</span>
                    </a>
                    
                    <a href="mailto:info@tmsestates.com" className="footer-bubble group">
                        <div className="icon-circle"><Mail size={20} /></div>
                        <span>Email</span>
                    </a>

                    <a href="https://t.me/YOUR_USER" target="_blank" rel="noreferrer" className="footer-bubble group">
                        <div className="icon-circle"><Send size={20} /></div>
                        <span>Telegram</span>
                    </a>

                    {/* ✅ NEW AI ASSISTANT BUTTON IN FOOTER */}
                    <button onClick={openAIChat} className="footer-bubble group">
                        <div className="icon-circle bg-[#D4AF37] text-[#0A2342] group-hover:bg-white">
                            <Bot size={20} />
                        </div>
                        <span className="text-[#D4AF37] group-hover:text-white transition-colors">AI Assistant</span>
                    </button>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-center pt-8">
                <p>&copy; {new Date().getFullYear()} TMS ESTATES. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
                    <Link href="/terms-of-use" className="hover:text-[#D4AF37] transition-colors">Terms of Use</Link>
                </div>
            </div>
        </div>

        {/* Local Styles for Footer Bubbles */}
        <style jsx>{`
           .footer-bubble {
              display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
              font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em;
              cursor: pointer;
           }
           .icon-circle {
              background: rgba(255,255,255,0.1); padding: 0.75rem; border-radius: 9999px;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
           }
           .group:hover .icon-circle {
              background: #D4AF37; color: #0A2342; transform: scale(1.1);
           }
        `}</style>
    </footer>
  );
}
