/* ✨ NEW FILE: ./src/components/ui/CompactArticleCard.tsx */

import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/cms";
import { getStrapiMediaUrl } from "@/lib/media";

export default function CompactArticleCard({ article }: { article: Article }) {
  const imgUrl = getStrapiMediaUrl(article.coverImage);
  const publishedDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-4 items-center"
    >
      <div className="relative aspect-square rounded-lg bg-muted overflow-hidden shrink-0">
        <Image
          src={imgUrl}
          alt={article.title || "Market Insight Article"}
          fill
          sizes="120px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div>
        <h4 className="font-semibold font-montserrat text-navy line-clamp-2 leading-snug group-hover:text-gold transition-colors">{article.title}</h4>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{article.excerpt}</p>
        <time className="text-xs text-muted-foreground/80 mt-2 block">{publishedDate}</time>
      </div>
    </Link>
  );
}