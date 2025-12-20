/* FULL REPLACEMENT: src/components/sections/InsightsAndWhy.tsx */
import Link from "next/link";
import { fetchArticles, Article } from "@/lib/cms";
import CompactArticleCard from "@/components/ui/CompactArticleCard";
import { Globe2, Landmark, ShieldCheck, Ship, Sun, GraduationCap } from "lucide-react";

const features = [
  { icon: Globe2, title: "Strategic Location", desc: "EU-MENA Gateway." },
  { icon: Landmark, title: "Legal Stability", desc: "English Common Law." },
  { icon: ShieldCheck, title: "Tax Efficiency", desc: "Attractive incentives." },
  { icon: Ship, title: "Thriving Economy", desc: "Maritime & Tech hub." },
  { icon: Sun, title: "Premier Lifestyle", desc: "320+ sunny days." },
  { icon: GraduationCap, title: "Education", desc: "Global standards." },
];

export default async function InsightsAndWhy() {
  const { data: articles } = await fetchArticles({ "pagination[pageSize]": "2", sort: "publishedAt:desc" });

  return (
    <div className="flex flex-col gap-12 text-white">
      
      {/* 1. Header Block */}
      <div>
         <h2 className="text-3xl font-bold font-montserrat mb-2">Informed Decisions</h2>
         <p className="text-white/70 text-sm">Strategic intelligence for the modern investor.</p>
      </div>

      {/* 2. Latest Insights (Vertical Stack) */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--gold)] mb-6 border-b border-white/10 pb-2">
          Market Intelligence
        </h3>
        <div className="space-y-4">
          {articles.map((article: Article) => (
             /* Wrapping CompactCard to override its internal colors via CSS cascading if needed, 
                but assuming CompactCard needs to be updated or handled here */
             <div key={article.id} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors border border-white/5">
                 <CompactArticleCard article={article} />
             </div>
          ))}
        </div>
        <div className="mt-6 text-right">
          <Link href="/insights" className="text-xs font-bold uppercase text-white hover:text-[var(--gold)] transition-colors">
            View All Reports →
          </Link>
        </div>
      </div>

      {/* 3. The Cyprus Advantage (Compact Grid) */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--gold)] mb-6 border-b border-white/10 pb-2">
          The Ecosystem
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="group p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
              <div className="mb-2 text-[var(--gold)] group-hover:scale-110 transition-transform origin-left">
                <f.icon size={18} />
              </div>
              <h4 className="text-xs font-bold text-white font-montserrat">{f.title}</h4>
              <p className="text-[10px] text-white/60 mt-0.5 leading-snug">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
