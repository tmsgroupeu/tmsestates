import Link from "next/link";
import { fetchArticles, Article } from "@/lib/cms";
import CompactArticleCard from "@/components/ui/CompactArticleCard";
import { Globe2, Landmark, ShieldCheck, Ship, Sun, GraduationCap } from "lucide-react";

const features = [
  { icon: Globe2, title: "Strategic EU Location", desc: "Gateway between Europe & MENA." },
  { icon: Landmark, title: "Legal Framework", desc: "English-based legal system." },
  { icon: ShieldCheck, title: "Tax Incentives", desc: "Attractive structures for investors." },
  { icon: Ship, title: "Thriving Sectors", desc: "Maritime, tech and tourism hub." },
  { icon: Sun, title: "Lifestyle", desc: "320+ sunny days per year." },
  { icon: GraduationCap, title: "Education", desc: "High standard of intl. schools." },
];

export default async function InsightsAndWhy() {
  const { data: articles } = await fetchArticles({ "pagination[pageSize]": "3", sort: "publishedAt:desc" });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
      
      {/* LEFT: Insights */}
      <div>
        <h3 className="text-2xl font-bold font-montserrat text-[var(--navy)] mb-6">Market Analysis</h3>
        <div className="space-y-4">
          {articles.map((article: Article) => (
             <CompactArticleCard key={article.id} article={article} />
          ))}
          {articles.length === 0 && <p className="text-gray-500 italic">No reports available.</p>}
        </div>
        <div className="mt-6">
          <Link href="/insights" className="text-sm font-bold uppercase text-[var(--gold)] hover:text-[var(--navy)] transition-colors">
            View All Insights →
          </Link>
        </div>
      </div>

      {/* RIGHT: Why Cyprus */}
      <div>
        <h3 className="text-2xl font-bold font-montserrat text-[var(--navy)] mb-6">The Cyprus Advantage</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="shrink-0 text-[var(--navy)]/80"><f.icon size={20} /></div>
              <div>
                <h4 className="text-sm font-bold text-[var(--navy)]">{f.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
