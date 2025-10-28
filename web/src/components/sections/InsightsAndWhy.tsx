/* ✅ Redesigned: ./src/components/sections/InsightsAndWhy.tsx */

import Section from "@/components/Section"; 
import Link from "next/link";
import { fetchArticles } from "@/lib/cms";
import type { Article } from "@/lib/cms"; 
import CompactArticleCard from "@/components/ui/CompactArticleCard"; // ✨ NEW: Using the compact card
import { Globe2, Landmark, ShieldCheck, Ship, Sun, GraduationCap } from "lucide-react";

const features = [
  { icon: Globe2, title: "Strategic EU Location", desc: "Gateway between Europe, Middle East and North Africa." },
  { icon: Landmark, title: "Stable Legal Framework", desc: "EU and English-based legal system, strong property rights." },
  { icon: ShieldCheck, title: "Attractive Tax Environment", desc: "Competitive corporate policies and investor incentives." },
  { icon: Ship, title: "Thriving Sectors", desc: "Maritime, tourism, tech and services drive resilient demand." },
  { icon: Sun, title: "Lifestyle & Rentals", desc: "320+ sunny days and strong short/long-let opportunities." },
  { icon: GraduationCap, title: "Education & Healthcare", desc: "International schools and modern private healthcare." },
];

export default async function InsightsAndWhy() {
  const { data: articles } = await fetchArticles({
    'pagination[pageSize]': '3', sort: 'publishedAt:desc',
  });

  return (
    <Section id="insights" title="Informed Decisions, Confident Investments">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
        
        {/* Market Insights (Articles) */}
        <div>
          <h3 className="text-2xl font-bold font-montserrat text-navy mb-6">Latest Market Insights</h3>
          <div className="grid gap-6">
            {articles.length === 0 && (
              <div className="rounded-xl border border-muted bg-white p-6 text-muted-foreground">No articles yet.</div>
            )}
            {articles.map((article: Article) => (
              // ✅ FIX: Rendering the new compact card
              <CompactArticleCard key={article.id} article={article} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/insights" className="font-semibold text-gold hover:brightness-110 transition-all group inline-flex items-center gap-2">
              View All Insights <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Why Invest in Cyprus */}
        <div>
          <h3 className="text-2xl font-bold font-montserrat text-navy mb-6">The Cyprus Advantage</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {features.map((f) => (
              <div key={f.title} className="group rounded-xl border border-transparent bg-white p-4 transition-shadow hover:shadow-soft hover:border-muted">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-muted/70 p-2 shrink-0"><f.icon className="size-5 text-muted-foreground" /></div>
                  <div>
                    <h4 className="font-semibold text-navy">{f.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}