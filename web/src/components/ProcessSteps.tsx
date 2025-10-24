const steps = [
  { n: "01", t: "Discovery",    d: "Tell us what ‘home’ looks like. We refine a tailored brief." },
  { n: "02", t: "Shortlist",    d: "Curated options with pros/cons, local insights and comparables." },
  { n: "03", t: "Viewings",     d: "Private appointments to your schedule, on or off-market." },
  { n: "04", t: "Offer & Close", d: "Negotiation, legals and completion — managed with precision." },
];

export default function ProcessSteps() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {steps.map(s => (
        <div key={s.n} className="glass rounded-2xl p-6">
          <div className="text-[var(--gold)] font-semibold">{s.n}</div>
          <h4 className="font-semibold mt-1">{s.t}</h4>
          <p className="text-neutral-600 mt-2">{s.d}</p>
        </div>
      ))}
    </div>
  );
}
