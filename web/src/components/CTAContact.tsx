/* Enhanced: ./components/CTAContact.tsx */
import { Mail, MessageCircle, Send } from 'lucide-react';

const contactBubbles = [
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/YOUR_NUMBER' },
    { icon: Mail, label: 'Email', href: 'mailto:info@tmsestates.com' },
    { icon: Send, label: 'Telegram', href: 'https://t.me/YOUR_USERNAME' },
];

export default function CTAContact() {
  return (
    <section id="contact" className="bg-navy text-text-on-dark">
      <div className="section text-center">
        <h3 className="text-4xl font-bold font-montserrat">Begin Your Property Journey</h3>
        <p className="text-white/80 mt-4 text-lg max-w-3xl mx-auto">
          Whether buying, selling, or exploring, our advisors are ready for a private consultation. Reach out directly through your preferred channel.
        </p>

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
        
        <p className="mt-16 text-white/60">Or contact us at <a href="mailto:info@tmsestates.com" className="font-semibold text-white/90 hover:text-gold transition-colors">info@tmsestates.com</a></p>
      </div>
    </section>
  );
}