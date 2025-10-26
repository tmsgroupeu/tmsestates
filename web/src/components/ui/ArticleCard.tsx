/* Fully Updated: ./components/ArticleCard.tsx */

import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/cms";
import { ArrowRight } from "lucide-react";
import { getStrapiMediaUrl } from "@/lib/media";

export default function ArticleCard({ article }: { article: Article }) {
  // THE FIX IS HERE: We now access `article.coverImage` (camelCase)
  const imgUrl = getStrapiMediaUrl(article.coverImage); 
  const publishedDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block rounded-xl overflow-hidden bg-white shadow-soft transition-all duration-300 hover:shadow-medium hover:-translate-y-1"
    >
      <div className="relative aspect-[16/9] bg-muted overflow-hidden">
        <Image
          src={imgUrl}
          alt={article.title || "Market Insight Article"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>
      <div className="p-6">
        <h3 className="font-semibold font-montserrat text-lg text-navy line-clamp-2">{article.title}</h3>
        {article.excerpt && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>}
        <div className="mt-4 pt-4 border-t border-muted/70 flex justify-between items-center text-sm">
           <span className="font-semibold text-gold group-hover:text-navy transition-colors">
              Read More <ArrowRight size={16} className="inline-block transition-transform group-hover:translate-x-1"/>
           </span>
           <time className="text-muted-foreground">{publishedDate}</time>
        </div>
      </div>
    </Link>
  );
}