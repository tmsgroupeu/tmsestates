import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ArticleCardProps {
  image: string;
  title: string;
  excerpt: string;
  slug: string;
}

export default function ArticleCard({ image, title, excerpt, slug }: ArticleCardProps) {
  return (
    <Link href={`/articles/${slug}`} className="group block rounded-xl overflow-hidden bg-white shadow-soft transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-video bg-muted">
        <Image src={image} alt={title} fill className="object-cover"/>
      </div>
      <div className="p-5">
        <h3 className="font-semibold font-display text-lg text-navy line-clamp-2">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
        <div className="mt-4 font-semibold text-sm text-gold inline-flex items-center gap-1.5 group-hover:gap-2 transition-all">
          Read More <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}