// web/src/components/sections/InsightsAndWhy.tsx
import Section from "@/components/Section";
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

const features = [
  {
    icon: Globe2,
    title: "Strategic EU Location",
    desc: "Gateway between Europe, the Middle East and North Africa.",
  },
  {
    icon: Landmark,
    title: "Stable Legal Framework",
    desc: "EU and English-based legal system with robust property rights.",
  },
  {
    icon: ShieldCheck,
    title: "Attractive Tax Environment",
    desc: "Competitive structures and incentives for investors.",
  },
  {
    icon: Ship,
    title: "Thriving Sectors",
    desc: "Maritime, tourism, tech and services sustain demand.",
  },
  {
    icon: Sun,
    title: "Lifestyle & Rentals",
    desc: "320+ sunny days and resilient rental demand.",
  },
  {
    icon: GraduationCap,
    title: "Education & Healthcare",
    desc: "International schools and modern private healthcare.",
  },
];

export default async function InsightsAndWhy() {
  const { data: articles } = await fetchArticles({
    "pagination[pageSize]": "3",
    sort: "publishedAt:desc",
  });

  return (
    <Section id="insights" title="Informed Decisions, Confident Investments">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
        {/* Latest Insights */}
        <div>
          <h3 className="text-2xl font-bold font-montserrat text-[color:var(--navy)] mb-6">
            Latest Market Insights
          </h3>
          <div className="space-y-4">
            {articles.length === 0 && (
              <div className="rounded-xl border border-[color:var(--muted)] bg-white p-6 text-[color:var(--muted-foreground)]">
                No articles yet.
              </div>
            )}
            {articles.map((article: Article) => (
              <CompactArticleCard key={article.id} article={article} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 font-semibold text-[color:var(--gold)] hover:brightness-110 transition-all"
            >
              View All Insights
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Why Cyprus */}
        <div>
          <h3 className="text-2xl font-bold font-montserrat text-[color:var(--navy)] mb-6">
            The Cyprus Advantage
          </h3>
          <div className="stack-cards-carousel lg:!grid lg:grid-cols-1 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-transparent bg-white p-4 transition-all hover:shadow-soft hover:border-[color:var(--muted)]"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-[color:var(--muted)]/70 p-2 shrink-0">
                    <f.icon className="size-5 text-[color:var(--muted-foreground)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[color:var(--navy)]">
                      {f.title}
                    </h4>
                    <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                      {f.desc}
                    </p>
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
