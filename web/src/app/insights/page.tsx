// UPDATED: web/src/app/insights/page.tsx
import ArticleCard from "@/components/ui/ArticleCard";
import { fetchArticles, Article } from "@/lib/cms"; // Assuming Article type is exported

export const revalidate = 3600; // Revalidate this page every hour

export default async function InsightsPage() {
  const { data: articles } = await fetchArticles({
    'pagination[pageSize]': '99', // Fetch all articles
  });

  return (
    <main className="min-h-screen bg-paper">
      {/* --- 1. Elegant Header --- */}
      <section className="bg-white border-b border-muted">
        <div className="section text-center !py-16 md:!py-20">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-navy">Market Insights</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Your definitive guide to the Cyprus real estate market, with expert analysis, trends, and investment advice.
          </p>
        </div>
      </section>

      {/* --- 2. Articles Grid --- */}
      <section className="section">
        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-navy">No Articles Found</h2>
            <p className="mt-2 text-muted-foreground">Expert insights are coming soon. Please check back later.</p>
          </div>
        )}
      </section>
    </main>
  );
}