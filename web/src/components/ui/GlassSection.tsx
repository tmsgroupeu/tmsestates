import { ReactNode } from "react";

export default function GlassSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 ${className}`}>
      <div className="apple-glass rounded-3xl p-8 sm:p-12 overflow-hidden">
        {children}
      </div>
    </section>
  );
}
