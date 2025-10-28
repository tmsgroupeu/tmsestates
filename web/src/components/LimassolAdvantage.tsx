/* ✅ Enhanced: ./src/components/LimassolAdvantage.tsx */

"use client";
import { useInView, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import Section from "@/components/Section";

const stats = [
  { value: 12, suffix: '%', label: 'YoY Price Appreciation' },
  { value: 7500, prefix: '€', suffix: '/m²', label: 'Prime Seafront Average' },
  { value: 1, prefix: '#', label: 'Top EU Destination for Lifestyle & Investment' }
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

  // Refined styling for the prefix and suffix for better alignment
  return (
    <span className="flex items-baseline justify-center">
      {prefix && <span className="text-3xl md:text-4xl">{prefix}</span>}
      <span ref={ref}/>
      {suffix && <span className="text-3xl md:text-4xl">{suffix}</span>}
    </span>
  );
}

export default function LimassolAdvantage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // The component's root is now a Section, ensuring consistent padding and animations.
  // The solid background is correctly handled by the layout in page.tsx.
  return (
    <Section id="advantage">
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Consistent, responsive typography using brand fonts */}
            <h3 className="text-5xl md:text-6xl font-bold font-montserrat text-gold">
              {inView ? <Counter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} /> : <span>{stat.prefix || ''}0{stat.suffix || ''}</span>}
            </h3>
            {/* Improved label styling and responsiveness */}
            <p className="mt-3 text-base text-muted-foreground max-w-[200px] mx-auto">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}