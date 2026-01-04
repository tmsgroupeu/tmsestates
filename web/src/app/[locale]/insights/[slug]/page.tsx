// UPDATED: web/src/app/insights/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchArticleBySlug, Article } from '@/lib/cms';
import { getStrapiMediaUrl } from '@/lib/media';
import { Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Import the new library

export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article: Article = await fetchArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const imageUrl = getStrapiMediaUrl(article.coverImage);
  const publishedDate = new Date(article.publishedAt || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="bg-paper min-h-screen">
      <header className="relative h-[40vh] md:h-[50vh] w-full pt-24 md:pt-32"> {/* ✅ FIX: Added top padding */}
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
        </div>
        <div className="relative z-10 h-full flex items-end justify-center">
            <div className="section text-center text-white pb-12">
                <h1 className="text-3xl md:text-5xl font-bold font-montserrat drop-shadow-lg max-w-4xl mx-auto">
                    {article.title}
                </h1>
                <div className="mt-4 flex justify-center items-center gap-6 text-sm text-white/80">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <time>{publishedDate}</time>
                    </div>
                </div>
            </div>
        </div>
      </header>

      <div className="section bg-paper !py-16">
          {/* ✅ ENHANCEMENT: Using react-markdown with Tailwind typography plugin */}
          <article className="prose prose-lg lg:prose-xl max-w-4xl mx-auto text-ink/90 leading-relaxed">
             {article.content ? (
                <ReactMarkdown>{article.content}</ReactMarkdown>
             ) : (
                <p>{article.excerpt || "Content is being prepared for this article."}</p>
             )}
          </article>
      </div>
    </main>
  );
}