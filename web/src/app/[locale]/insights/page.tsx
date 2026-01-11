/* FULL REPLACEMENT: src/app/[locale]/insights/page.tsx */
import Image from "next/image";
import ArticleCard from "@/components/ui/ArticleCard";
import { fetchArticles, Article } from "@/lib/cms";

export const revalidate = 3600;

export default async function InsightsPage() {
  const { data: articles } = await fetchArticles({
    'pagination[pageSize]': '99',
    'sort': 'publishedAt:desc'
  });

  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      
      {/* --- HEADER (Matches Properties Page Style) --- */}
      <div className="relative pt-48 pb-24 px-6 text-center text-white overflow-hidden bg-[#0A2342]">
         {/* Background Texture/Image */}
         <div className="absolute inset-0 z-0 opacity-20">
             {/* You can use a generic abstract image or the hero poster here */}
             <Image 
               src="/assets/hero-poster.jpg" 
               alt="Background" 
               fill 
               className="object-cover"
             />
             <div className="absolute inset-0 bg-[#0A2342]/80 backdrop-blur-[2px]" />
         </div>

         <div className="relative z-10 max-w-3xl mx-auto">
             <span className="inline-block py-1 px-3 border border-[#D4AF37]/50 rounded-full text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                 Market Intelligence
             </span>
             <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 drop-shadow-xl">
                Market Insights
             </h1>
             <p className="text-white/80 text-lg font-light leading-relaxed">
                The definitive guide to the Cyprus real estate market, featuring expert analysis, 
                investment trends, and lifestyle reports.
             </p>
         </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 pb-24 relative z-20">
         
         {articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article: Article, index: number) => (
                // We assume ArticleCard handles its own layout, but we ensure the wrapper is clean
                <div key={article.id} className="h-full">
                   <ArticleCard article={article} />
                </div>
              ))}
            </div>
         ) : (
            <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
               <div className="text-4xl mb-4 opacity-50">📰</div>
               <h2 className="text-xl font-bold text-[#0A2342]">No Articles Found</h2>
               <p className="text-gray-400 mt-2 text-sm">Expert insights are being curated. Please check back later.</p>
            </div>
         )}

      </div>
    </main>
  );
}
