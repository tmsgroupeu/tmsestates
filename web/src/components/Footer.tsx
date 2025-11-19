/* ✨ Enhanced: ./src/components/Footer.tsx */

import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, Send } from 'lucide-react';

const contactBubbles = [
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/YOUR_WHATSAPP_NUMBER' },
    { icon: Mail, label: 'Email', href: 'mailto:info@tmsestates.com' },
    { icon: Send, label: 'Telegram', href: 'https://t.me/YOUR_TELEGRAM_USERNAME' },
];

export default function Footer() {
  return (
    // ✅ FIX: Background color is on the root footer element for full width
    <footer id="page-footer" className="bg-navy text-white/70">
        {/* Inner container centers the content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            
            <div className="bg-background">
                <Link href="/" className="shrink-0">
                    <Image src="/tms-logo.svg" alt="TMS Estates Logo" width={180} height={45} />
                </Link>

                {/* ✨ ENHANCEMENT: Interactive contact bubbles */}
                <div className="flex justify-center items-center gap-6">
                    {contactBubbles.map((item) => (
                        <a 
                            key={item.label} 
                            href={item.href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group flex flex-col items-center gap-2 text-center text-xs uppercase tracking-wider"
                        >
                            <div className="bg-white/10 p-4 rounded-full transition-all duration-300 ease-out group-hover:bg-gold group-hover:text-navy group-hover:scale-110 transform-gpu hop-animation">
                                <item.icon size={24} />
                            </div>
                            <span>{item.label}</span>
                        </a>
                    ))}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-center pt-8">
                <p>&copy; {new Date().getFullYear()} TMS ESTATES. All rights reserved.</p>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
  );
}