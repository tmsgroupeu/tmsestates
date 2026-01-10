/* FULL REPLACEMENT: src/app/[locale]/insights/[slug]/page.tsx */
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchArticleBySlug, Article } from '@/lib/cms';
import { getStrapiMediaUrl } from '@/lib/media';
import { Calendar, ChevronLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export const revalidate = 3600;

// ✅ FIX: Correct Props for Next.js 15
type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function ArticlePage({ params }: Props) {
  // ✅ FIX: Await params
  const { slug } = await params;
  
  const article: Article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const imageUrl = getStrapiMediaUrl(article.coverImage);
  const publishedDate = new Date(article.publishedAt || Date.now()).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-[#F9F9F9] font-sans">
      
      {/* 1. Header Image */}
      <header className="relative h-[50vh] w-full">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0A2342]/60" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <Link href="/insights" className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-[#D4AF37] transition-colors">
               <ChevronLeft size={14} /> Back to Insights
            </Link>
            <h1 className="text-3xl md:text-5xl font-montserrat font-bold text-white drop-shadow-xl max-w-4xl leading-tight">
                {article.title}
            </h1>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm text-white/90">
                <Calendar size={14} className="text-[#D4AF37]" />
                <time>{publishedDate}</time>
            </div>
        </div>
      </header>

      {/* 2. Article Content */}
      <article className="max-w-3xl mx-auto px-6 py-20 -mt-20 relative z-10">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
             <div className="prose prose-lg prose-slate max-w-none 
                prose-headings:font-montserrat prose-headings:font-bold prose-headings:text-[#0A2342] 
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-a:text-[#D4AF37] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#0A2342]
                prose-img:rounded-2xl prose-img:shadow-lg">
                
                {article.content ? (
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                ) : (
                    <p className="text-gray-500 italic">{article.excerpt || "Content is being prepared..."}</p>
                )}
             </div>
          </div>
      </article>
    </main>
  );
}
