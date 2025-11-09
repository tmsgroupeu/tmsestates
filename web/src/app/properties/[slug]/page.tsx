// Corrected Version: web/src/app/properties/[slug]/page.tsx
"use client"
import { motion, Variants } from 'framer-motion'; // <-- Import Variants
import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Ruler, MapPin, Crown, Calendar, Phone, Mail } from "lucide-react";
import { useEffect, useState } from 'react';

// --- Type Definitions (Flattened Structure) ---
type StrapiMedia = { url: string; alternativeText?: string };
type Property = {
  id: number;
  title?: string;
  slug: string;
  description?: string;
  address?: string;
  city?: string;
  area?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  propertyType?: string | null;
  vip?: boolean;
  images?: StrapiMedia[];
  updatedAt?: string;
};

const API = process.env.NEXT_PUBLIC_API_URL || "";
const asUrl = (u?: string) => (!u ? "" : u.startsWith("http") ? u : `${API}${u}`);

async function fetchAllPropertySlugs(): Promise<{ slug: string }[]> {
  const res = await fetch(`${API}/api/properties?fields[0]=slug`, { next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data?.map((item: { slug: string }) => ({ slug: item.slug })) ?? [];
}

async function fetchProperty(slug: string): Promise<Property | null> {
  const params = new URLSearchParams({
    "filters[slug][$eq]": slug,
    "populate": "*",
  });
  try {
    const res = await fetch(`${API}/api/properties?${params.toString()}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.[0] ?? null;
  } catch (error) {
    console.error("Failed to fetch property:", error);
    return null;
  }
}

// RESTORED: This is critical for fixing the 404 error
export async function generateStaticParams() {
  const slugs = await fetchAllPropertySlugs();
  return slugs;
}

// -- CORRECTED: Animation Variants for Framer Motion --
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeInOut" // <-- Corrected ease value
    } 
  }
};

// -- Reusable UI Components --
const StatCard = ({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>, label: string, value: string | number | null | undefined }) => {
    if (value === null || value === undefined) return null;
    return (
        <div className="rounded-2xl bg-white/60 backdrop-blur p-4 ring-1 ring-black/5">
            <div className="text-ink/60 text-sm font-medium">{label}</div>
            <div className="mt-1 flex items-center gap-2 text-xl font-semibold">
                <Icon className="h-5 w-5 text-gold" /> {value}
            </div>
        </div>
    );
};

// -- Main Page Component --
export default function Page({ params }: { params: { slug: string } }) {
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    fetchProperty(params.slug).then(setProperty);
  }, [params.slug]);

  if (!property) {
    return <div className="min-h-screen flex items-center justify-center">Loading property...</div>;
  }
  
  const p = property;
  const allImages = p.images?.map(img => ({ url: asUrl(img.url), alt: img.alternativeText || p.title || "Property photo" })) || [];
  const heroImage = allImages[0];
  const galleryImages = allImages.slice(1, 5);

  return (
    <motion.main
      className="min-h-screen bg-paper"
      initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {heroImage && (
        <motion.section variants={sectionVariants} className="relative h-[60vh] w-full">
          <Image src={heroImage.url} alt={heroImage.alt} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          {p.vip && (
             <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-gold/90 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                <Crown className="h-4 w-4" /> VIP Listing
            </div>
          )}
        </motion.section>
      )}

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          <div className="lg:col-span-2 space-y-10">
            <motion.header variants={sectionVariants}>
              <h1 className="text-4xl md:text-5xl font-bold font-montserrat text-navy tracking-tight">{p.title}</h1>
              <p className="mt-3 flex items-center gap-2 text-lg text-muted-foreground">
                <MapPin className="h-5 w-5 text-gold" />
                <span>{p.address || p.city || "Cyprus"}</span>
              </p>
            </motion.header>

            <motion.div variants={sectionVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={BedDouble} label="Bedrooms" value={p.bedrooms} />
              <StatCard icon={Bath} label="Bathrooms" value={p.bathrooms} />
              <StatCard icon={Ruler} label="Area (m²)" value={p.area} />
              <StatCard icon={Calendar} label="Type" value={p.propertyType} />
            </motion.div>
            
            {p.description && (
              <motion.section variants={sectionVariants} className="prose prose-lg max-w-none text-ink/80 leading-relaxed">
                 <h2 className="text-2xl font-semibold font-montserrat text-navy">About This Property</h2>
                 <p>{p.description}</p>
              </motion.section>
            )}

            {galleryImages.length > 0 && (
              <motion.section variants={sectionVariants}>
                <h2 className="text-2xl font-semibold font-montserrat text-navy mb-4">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {galleryImages.map((img, i) => (
                    <div key={i} className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2' : ''}`}>
                      <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 50vw"/>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          <aside className="lg:col-span-1">
            <motion.div variants={sectionVariants} className="sticky top-28 rounded-2xl bg-white shadow-medium ring-1 ring-black/5 p-6 flex flex-col gap-4">
              <h3 className="text-xl font-bold font-montserrat text-navy">Interested in this property?</h3>
              <p className="text-sm text-muted-foreground">Contact us for pricing, viewings, and more information.</p>
              
              <div className="flex flex-col gap-3 mt-2">
                <Link href={`/contact?property=${encodeURIComponent(p.slug)}`} className="btn btn-primary gap-2">
                  <Mail className="h-4 w-4" /> Request Price
                </Link>
                <Link href={`/contact?type=tour&property=${encodeURIComponent(p.slug)}`} className="btn btn-outline">
                  <Calendar className="h-4 w-4" /> Book a Tour
                </Link>
                <a href={`tel:+35700000000`} className="btn btn-outline">
                  <Phone className="h-4 w-4" /> Call Us
                </a>
              </div>

               <div className="mt-3 rounded-xl bg-muted p-3 text-center text-xs text-muted-foreground">
                Reference: <span className="font-mono">{p.slug}</span>
               </div>
            </motion.div>
          </aside>

        </div>
      </div>
    </motion.main>
  );
}
