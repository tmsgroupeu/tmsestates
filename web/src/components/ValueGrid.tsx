// web/src/components/ValueGrid.tsx
import { ShieldCheck, Sparkles, ScrollText, Landmark } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Advice",
    desc: "Seasoned advisors who protect your interests at every step.",
  },
  {
    icon: Sparkles,
    title: "Presentation That Sells",
    desc: "Editorial visuals and narrative that elevate your asset.",
  },
  {
    icon: Landmark,
    title: "Prime Network",
    desc: "Access to decision-makers, family offices, and HNWI buyers.",
  },
  {
    icon: ScrollText,
    title: "Flawless Process",
    desc: "Negotiation, legal, and closing handled end-to-end.",
  },
];

export default function ValueGrid() {
  return (
    <div className="stack-cards-carousel md:grid-cols-2 xl:grid-cols-4 gap-6">
      {features.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="glass-dark p-6 h-full flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-white/10 rounded-lg p-3">
              <Icon className="w-6 h-6 text-[color:var(--gold)]" />
            </span>
            <h3 className="font-semibold text-lg text-white">{title}</h3>
          </div>
          <p className="text-white/75 text-sm">{desc}</p>
        </div>
      ))}
    </div>
  );
}
