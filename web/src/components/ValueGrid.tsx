import { ShieldCheck, Sparkles, ScrollText, Landmark } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Trusted advice", desc: "Seasoned agents who protect your interests at every step." },
  { icon: Sparkles,    title: "Presentation that sells", desc: "Editorial imagery and compelling copy that elevates your listing." },
  { icon: Landmark,    title: "Prime network", desc: "Discreet access to off-market opportunities and serious buyers." },
  { icon: ScrollText,  title: "Flawless process", desc: "Negotiation, legals, financing and closing managed end-to-end." },
];

export default function ValueGrid() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {features.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="glass rounded-2xl p-6 h-full">
          <div className="flex items-center gap-3 mb-3">
            <span className="glass rounded-xl p-3"><Icon className="w-5 h-5 text-[var(--gold)]" /></span>
            <h3 className="font-semibold">{title}</h3>
          </div>
          <p className="text-neutral-600">{desc}</p>
        </div>
      ))}
    </div>
  );
}
