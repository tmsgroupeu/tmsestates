/* FULL REPLACEMENT: src/app/[locale]/insights/[slug]/page.tsx */
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchArticleBySlug, fetchArticles, Article } from '@/lib/cms';
import { getStrapiMediaUrl } from '@/lib/media';
import { Calendar, ChevronLeft, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import CompactArticleCard from '@/components/ui/CompactArticleCard'; // Ensure you have this or reuse ArticleCard

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

// Helper: Calculate Read Time
function getReadTime(text: string | undefined) {
    if (!text) return "1 min";
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} min read`;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  
  // 1. Fetch Main Article
  const article: Article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // 2. Fetch "Read Next" Articles (exclude current)
  // Fetch 3 latest, filtering out current ID in map (simpler API call)
  const { data: recentArticles } = await fetchArticles({ 
      "pagination[pageSize]": "4", 
      "sort[0]": "publishedAt:desc" 
  });
  const relatedArticles = recentArticles.filter((a: Article) => a.id !== article.id).slice(0, 3);


  const imageUrl = getStrapiMediaUrl(article.coverImage);
  const publishedDate = new Date(article.publishedAt || Date.now()).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const readTime = getReadTime(article.content);

  return (
    <main className="min-h-screen bg-[#F9F9F9] font-sans">
      
      {/* --- 1. IMMERSIVE HEADER --- */}
      <header className="relative h-[60vh] w-full">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
        {/* Navy Gradient Overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/90 via-[#0A2342]/40 to-[#0A2342]/30" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-32 px-6">
            <div className="max-w-4xl mx-auto w-full">
                <Link 
                    href="/insights" 
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] hover:text-white transition-colors mb-6"
                >
                    <ChevronLeft size={14} /> Back to Insights
                </Link>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white drop-shadow-lg leading-[1.1] mb-6">
                    {article.title}
                </h1>

                <div className="flex items-center gap-6 text-white/80 text-sm font-medium">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#D4AF37]" />
                        <time>{publishedDate}</time>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-[#D4AF37]" />
                        <span>{readTime}</span>
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* --- 2. ARTICLE CONTENT (Paper Card) --- */}
      <article className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 -mt-20">
          <div className="bg-white rounded-t-3xl md:rounded-[2.5rem] p-8 md:p-16 shadow-2xl border-t border-white/50">
             
             {/* Drop Cap styling via prose */}
             <div className="prose prose-lg prose-slate max-w-none 
                prose-headings:font-montserrat prose-headings:font-bold prose-headings:text-[#0A2342] 
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:text-[#0A2342]/90
                prose-p:text-gray-600 prose-p:leading-8 prose-p:font-light
                prose-a:text-[#D4AF37] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#0A2342] prose-strong:font-bold
                prose-blockquote:border-l-4 prose-blockquote:border-[#D4AF37] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-800
                prose-img:rounded-3xl prose-img:shadow-xl prose-img:my-10
                prose-li:text-gray-600 prose-ul:space-y-2">
                
                {article.content ? (
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                ) : (
                    <p className="text-gray-500 italic border border-dashed border-gray-300 p-8 rounded-xl text-center">
                        {article.excerpt || "Content is being prepared..."}
                    </p>
                )}
             </div>

             {/* Author / Footer of Article */}
             <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-[#0A2342] flex items-center justify-center text-white font-bold text-xs">
                        TMS
                     </div>
                     <div>
                        <p className="text-xs font-bold uppercase text-[#0A2342] tracking-wider">Published By</p>
                        <p className="text-sm text-gray-500">TMS Estates Editorial Team</p>
                     </div>
                 </div>
                 {/* Optional Share buttons could go here */}
             </div>

          </div>
      </article>

      {/* --- 3. READ NEXT --- */}
      {relatedArticles.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-24">
             <h3 className="text-2xl font-montserrat font-bold text-[#0A2342] mb-8 border-b border-gray-200 pb-4">
                Latest Market Reports
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel: Article) => (
                    // We assume you have ArticleCard imported, reusing it here
                    // Using a simpler wrapper if needed
                    <div key={rel.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        {/* We reuse your standard ArticleCard here, or a Compact version */}
                        {/* If ArticleCard is the big one, importing CompactArticleCard is better for footer */}
                         <Link href={`/insights/${rel.slug}`} className="block group">
                             <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-gray-100">
                                <Image src={getStrapiMediaUrl(rel.coverImage)} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                             </div>
                             <h4 className="font-bold text-[#0A2342] line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                                 {rel.title}
                             </h4>
                             <p className="text-xs text-gray-500 mt-2">
                                 {new Date(rel.publishedAt || '').toLocaleDateString()}
                             </p>
                         </Link>
                    </div>
                ))}
             </div>
          </section>
      )}

    </main>
  );
}
