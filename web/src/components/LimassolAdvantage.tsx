"use client";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import Section from "@/components/Section"; // CORRECTED PATH

const stats = [
  { value: 12, suffix: '%', label: 'YoY Price Appreciation' },
  { value: 7500, prefix: '€', suffix: '/m²', label: 'Prime Seafront Average' },
  { value: 1, label: 'Top EU Destination for Lifestyle & Investment' }
];

function Counter({ from, to, prefix, suffix }: { from: number, to: number, prefix?: string, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 2.5,
      ease: [0.25, 1, 0.5, 1],
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = value.toLocaleString('en-US', { maximumFractionDigits: 0 });
        }
      }
    });
    return () => controls.stop();
  }, [from, to]);

  return <span className="flex items-baseline">
    {prefix && <span className="text-2xl lg:text-3xl">{prefix}</span>}
    <span ref={ref}/>
    {suffix && <span className="text-2xl lg:text-3xl">{suffix}</span>}
  </span>;
}

export default function LimassolAdvantage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="bg-white">
      <Section id="advantage">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="p-4">
              <h3 className="text-5xl lg:text-6xl font-bold font-display text-gold">
                {inView ? <Counter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} /> : <span>{stat.prefix}0{stat.suffix}</span>}
              </h3>
              <p className="mt-2 text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}