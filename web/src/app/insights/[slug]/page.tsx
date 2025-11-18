// NEW FILE: web/src/app/insights/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchArticleBySlug, Article } from '@/lib/cms';
import { getStrapiMediaUrl } from '@/lib/media';
import { Calendar, User } from 'lucide-react';

// Revalidate the page every hour
export const revalidate = 3600;

// This function tells Next.js which slugs to pre-build at build time
export async function generateStaticParams() {
    // We are keeping this empty to generate pages on-demand
    // If you have a few high-priority articles, you could fetch their slugs here
    return [];
}

// Helper for rich text (if you use it in Strapi)
function renderRichText(content: string) {
    // A simple implementation; consider a more robust library like 'react-markdown' if you use Markdown
    return { __html: content.replace(/\n/g, '<br />') };
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
      {/* 1. Hero Image Header */}
      <header className="relative h-[40vh] md:h-[50vh] w-full">
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
        <div className="absolute inset-0 flex items-end justify-center z-10">
            <div className="section text-center text-white pb-12">
                <h1 className="text-3xl md:text-5xl font-bold font-montserrat drop-shadow-lg max-w-4xl mx-auto">
                    {article.title}
                </h1>
                <div className="mt-4 flex justify-center items-center gap-6 text-sm text-white/80">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <time>{publishedDate}</time>
                    </div>
                    {/* Add Author if available in your Strapi model */}
                    {/* <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>Admin</span>
                    </div> */}
                </div>
            </div>
        </div>
      </header>

      {/* 2. Article Content */}
      <article className="section bg-paper !py-16">
          <div className="prose prose-lg lg:prose-xl max-w-4xl mx-auto text-ink/90 leading-relaxed">
             {/* If using Markdown/Rich Text from Strapi */}
             {article.content ? (
                <div dangerouslySetInnerHTML={renderRichText(article.content)} />
             ) : (
                <p>{article.excerpt || "Content is being prepared for this article."}</p>
             )}
          </div>
      </article>
    </main>
  );
}
