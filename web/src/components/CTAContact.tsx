/* Enhanced: ./components/CTAContact.tsx */

import { Mail, MessageCircle, Send } from 'lucide-react';
import Section from './Section';

const contactBubbles = [
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/YOUR_WHATSAPP_NUMBER' },
    { icon: Mail, label: 'Email', href: 'mailto:info@tmsestates.com' },
    { icon: Send, label: 'Telegram', href: 'https://t.me/YOUR_TELEGRAM_USERNAME' },
];

export default function CTAContact() {
  return (
    <Section 
        id="contact" 
        className="bg-navy"
        variant="dark"
        title="Begin Your Property Journey"
        subtitle="Whether buying, selling, or exploring, our advisors are ready for a private consultation. Reach out directly through your preferred channel."
    >
        <div className="flex justify-center items-center gap-8 sm:gap-12 flex-wrap mt-14">
          {contactBubbles.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4 text-center">
              <div className="bg-gold/95 text-navy p-6 rounded-full shadow-lg transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-xl transform-gpu">
                <item.icon size={36} />
              </div>
              <span className="font-semibold text-white/90">{item.label}</span>
            </a>
          ))}
        </div>
    </Section>
  );
}