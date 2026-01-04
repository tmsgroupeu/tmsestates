/* UPDATED: src/components/Footer.tsx */
import Image from "next/image";
import { Mail, MessageCircle, Send } from 'lucide-react';
import { Link } from "@/i18n/routing"; // ✅ Use the localized Link

const contactBubbles = [
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/YOUR_NUMBER' },
    { icon: Mail, label: 'Email', href: 'mailto:info@tmsestates.com' },
    { icon: Send, label: 'Telegram', href: 'https://t.me/YOUR_USER' },
];

export default function Footer() {
  return (
    <footer id="page-footer" className="bg-[#0A2342] text-white/70 relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Top Row: Logo & Socials */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-8">
                <Link href="/" className="shrink-0">
                    <Image src="/tms-logo-white.svg" alt="TMS Estates Logo" width={180} height={45} className="w-auto h-auto" />
                </Link>

                <div className="flex justify-center items-center gap-6">
                    {contactBubbles.map((item) => (
                        <a 
                            key={item.label} 
                            href={item.href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group flex flex-col items-center gap-2 text-center text-xs uppercase tracking-wider"
                        >
                            <div className="bg-white/10 p-3 rounded-full transition-all duration-300 ease-out group-hover:bg-[#D4AF37] group-hover:text-[#0A2342] group-hover:scale-110 transform-gpu">
                                <item.icon size={20} />
                            </div>
                            <span>{item.label}</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Bottom Row: Copyright & Legal Links */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-center pt-8">
                <p>&copy; {new Date().getFullYear()} TMS ESTATES. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link href="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/terms-of-use" className="hover:text-[#D4AF37] transition-colors">
                        Terms of Use
                    </Link>
                </div>
            </div>
        </div>
    </footer>
  );
}