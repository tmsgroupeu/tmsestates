/* FULL REPLACEMENT: src/components/ui/CompactArticleCard.tsx */
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/cms";
import { getStrapiMediaUrl } from "@/lib/media";

export default function CompactArticleCard({ article }: { article: Article }) {
  const imgUrl = getStrapiMediaUrl(article.coverImage);
  const date = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', {month:'short', year:'numeric'}) : '';

  return (
    <Link href={`/insights/${article.slug}`} className="group grid grid-cols-[80px_1fr] gap-4 items-center">
      
      {/* Thumbnail */}
      <div className="relative aspect-square rounded-md overflow-hidden bg-white/10">
        <Image
          src={imgUrl}
          alt={article.title || "Insight"}
          fill
          sizes="80px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="min-w-0">
        <h4 className="font-semibold font-montserrat text-sm text-white truncate group-hover:text-[var(--gold)] transition-colors">
            {article.title}
        </h4>
        <p className="text-xs text-white/60 mt-1 line-clamp-2 leading-relaxed">
            {article.excerpt}
        </p>
        <time className="text-[10px] text-[var(--gold)] mt-1.5 block uppercase tracking-wider font-medium">
            {date}
        </time>
      </div>
    </Link>
  );
}
