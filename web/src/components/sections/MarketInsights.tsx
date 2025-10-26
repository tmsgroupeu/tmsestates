/* Enhanced: ./components/sections/MarketInsights.tsx (previously InfoSection.tsx) */

import Section from "@/components/Section";
import { fetchArticles } from "@/lib/cms"; // UPDATE: Import Strapi fetcher
import ArticleCard from "@/components/ui/ArticleCard"; // UPDATE: Use the new card component

export default async function MarketInsights() {

  // UPDATE: Fetch the 3 latest articles from your CMS
  const { data: articles } = await fetchArticles({
     'pagination[pageSize]': '3'
  });

  return (
    <Section
      id="insights"
      title="Market Insights"
      subtitle="Expert analysis and actionable advice to help you navigate the Limassol property market with confidence."
      className="bg-paper"
    >
      {articles.length > 0 ? (
          <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map(article => (
                  <ArticleCard key={article.id} article={article} />
              ))}
          </div>
      ) : (
          <p className="text-center text-muted-foreground">
              Market insights and articles will be published here soon.
          </p>
      )}
    </Section>
  );
}