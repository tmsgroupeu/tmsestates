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
  // Fetch 2 latest articles
  const { data: articles } = await fetchArticles({ "pagination[pageSize]": "2", sort: "publishedAt:desc" });

  return (
    <div className="flex flex-col text-white">
      
      {/* 1. Header Block - Centered */}
      <div className="text-center mb-10 md:mb-14">
         <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-3">Informed Decisions</h2>
         <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
            Market intelligence and strategic advantages for the modern investor.
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* 2. Latest Insights (Left Column) */}
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
              Market Intelligence
            </h3>
            <Link href="/insights" className="text-[10px] font-bold uppercase text-white/60 hover:text-white transition-colors">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {articles.map((article: Article) => (
               <div key={article.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors border border-white/5 group">
                   <CompactArticleCard article={article} />
               </div>
            ))}
            {articles.length === 0 && (
                <div className="text-center py-8 text-white/40 italic text-sm border border-dashed border-white/10 rounded-xl">
                    New reports coming soon.
                </div>
            )}
          </div>
        </div>

        {/* 3. The Cyprus Advantage (Right Column) */}
        <div>
          <div className="border-b border-white/10 pb-4 mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
              The Ecosystem
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group">
                <div className="mt-1 text-[var(--gold)] group-hover:scale-110 transition-transform origin-center">
                  <f.icon size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-montserrat uppercase tracking-wide">{f.title}</h4>
                  <p className="text-[11px] text-white/60 mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
