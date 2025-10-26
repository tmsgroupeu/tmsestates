/* Fully Updated: ./components/ValueGrid.tsx */

import { ShieldCheck, Sparkles, ScrollText, Landmark } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Trusted Advice", desc: "Seasoned agents who protect your interests at every step." },
  { icon: Sparkles,    title: "Presentation That Sells", desc: "Editorial imagery and compelling copy that elevates your listing." },
  { icon: Landmark,    title: "A Prime Network", desc: "Discreet access to off-market opportunities and qualified buyers." },
  { icon: ScrollText,  title: "Flawless Process", desc: "Negotiation, legalities, and closing are managed end-to-end for you." },
];

export default function ValueGrid() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {features.map(({ icon: Icon, title, desc }) => (
        // UPDATE: Replaced the old classes with `glass-dark` for the desired transparency effect.
        <div key={title} className="glass-dark p-6 h-full">
          <div className="flex items-center gap-4 mb-4">
            {/* UPDATE: Adjusted the icon's background and text color for a dark, transparent theme. */}
            <span className="bg-white/10 rounded-lg p-3">
                <Icon className="w-6 h-6 text-gold" />
            </span>
            <h3 className="font-semibold text-lg text-white">{title}</h3>
          </div>
          <p className="text-white/70">{desc}</p>
        </div>
      ))}
    </div>
  );
}