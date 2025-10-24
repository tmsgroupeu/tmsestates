import { Home, Users2, BadgeEuro } from "lucide-react";

export default function StatsStrip() {
  const Item = ({ icon: Icon, num, label }:{ icon: any; num: string; label: string; }) => (
    <div className="flex items-center gap-3">
      <span className="glass rounded-xl p-3"><Icon className="w-5 h-5 text-[var(--gold)]" /></span>
      <div>
        <div className="text-xl font-semibold">{num}</div>
        <div className="text-neutral-600 text-sm">{label}</div>
      </div>
    </div>
  );

  return (
    <div className="bg-[var(--navy)] text-[var(--text-on-dark)]">
      <div className="section py-8 grid gap-6 sm:grid-cols-3">
        <Item icon={Home}      num="1,200+" label="Properties sold" />
        <Item icon={Users2}    num="350+"   label="Private clients" />
        <Item icon={BadgeEuro} num="€2.5B"  label="In transactions" />
      </div>
    </div>
  );
}
