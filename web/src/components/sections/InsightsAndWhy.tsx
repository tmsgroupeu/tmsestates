import Link from "next/link";
import { fetchArticles, Article } from "@/lib/cms";
import CompactArticleCard from "@/components/ui/CompactArticleCard";
import {
  Globe2,
  Landmark,
  ShieldCheck,
  Ship,
  Sun,
  GraduationCap,
} from "lucide-react";

// ✅ FIX: Explicitly defined features array with Icons
const features = [
  {
    icon: Globe2,
    title: "Strategic EU Location",
    desc: "Gateway between Europe, Middle East & Africa.",
  },
  {
    icon: Landmark,
    title: "Stable Legal Framework",
    desc: "English-based legal system with strong property rights.",
  },
  {
    icon: ShieldCheck,
    title: "Attractive Tax",
    desc: "Competitive incentives for international investors.",
  },
  {
    icon: Ship,
    title: "Thriving Sectors",
    desc: "Maritime, tourism, tech and services demand.",
  },
  {
    icon: Sun,
    title: "Lifestyle & Climate",
    desc: "320+ sunny days and high standard of living.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    desc: "International schools and UK-affiliated universities.",
  },
];

export default async function InsightsAndWhy() {
  const { data: articles } = await fetchArticles({
    "pagination[pageSize]": "3",
    sort: "publishedAt:desc",
  });

  return (
    <section id="insights" className="py-20">
      {/* Main Header */}
      <div className="mb-12 text-center">
         <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-[var(--navy)]">
            Informed Decisions
         </h2>
         <p className="mt-4 text-[var(--muted-foreground)]">
            Market intelligence and strategic advantages of investing in Cyprus.
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
        {/* 1. Latest Insights Column */}
        <div>
          <h3 className="text-xl font-bold font-montserrat text-[var(--navy)] mb-6 border-b pb-4 border-gray-100">
            Market Analysis
          </h3>
          <div className="space-y-4">
            {articles.length === 0 && (
              <div className="p-6 text-gray-500 bg-gray-50 rounded-xl border border-gray-100">
                No articles available yet.
              </div>
            )}
            {articles.map((article: Article) => (
              <CompactArticleCard key={article.id} article={article} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--gold)] hover:text-[var(--navy)] transition-colors"
            >
              Read All Reports
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* 2. Why Cyprus Column */}
        <div>
          <h3 className="text-xl font-bold font-montserrat text-[var(--navy)] mb-6 border-b pb-4 border-gray-100">
            The Cyprus Advantage
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="shrink-0 rounded-lg bg-[var(--navy)]/5 p-2 text-[var(--navy)]">
                  <f.icon className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--navy)]">
                    {f.title}
                  </h4>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)] leading-snug">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}