/* FULL REPLACEMENT: src/components/PropertyPageClient.tsx */
"use client";

import { motion, Variants } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Ruler, MapPin, Crown, Calendar, Phone, Mail, House } from "lucide-react";

// --- Type Definitions ---
type StrapiMedia = { url: string; alternativeText?: string };

export type Property = {
  id: number;
  title?: string;
  slug: string;
  description?: string;
  
  city?: string;
  address?: string;
  
  area?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  propertyType?: string | null;
  
  price?: number | null;
  currency?: 'EUR' | 'USD' | 'GBP' | null;
  
  // ✅ FIX: Use 'prop_status' matching the new cms.ts type
  prop_status?: 'for-sale' | 'for-rent' | 'sold' | 'rented' | null;
  
  vip?: boolean;
  images?: StrapiMedia[];
  updatedAt?: string;
};

const API = process.env.NEXT_PUBLIC_API_URL || "";
const asUrl = (u?: string) => (!u ? "" : u.startsWith("http") ? u : `${API}${u}`);

const formatPrice = (price?: number | null, currency?: string | null) => {
  if (!price) return 'Price Upon Request';
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: currency || 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeInOut" } 
  }
};

const StatCard = ({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>, label: string, value: string | number | null | undefined }) => {
    if (!value) return null;
    return (
        <div className="rounded-2xl bg-white border border-gray-100 p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-[#0A2342]/5 p-3 rounded-full text-[#D4AF37]">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">{label}</div>
                <div className="text-[#0A2342] font-semibold text-lg">{value}</div>
            </div>
        </div>
    );
};

export default function PropertyPageClient({ property }: { property: Property }) {
  if (!property) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Property not found.</div>;
  }
  
  const p = property;
  const allImages = p.images?.map(img => ({ url: asUrl(img.url), alt: img.alternativeText || p.title || "Property photo" })) || [];
  const heroImage = allImages[0];
  const galleryImages = allImages.slice(1);

  return (
    <motion.main
      className="min-h-screen bg-[#F9F9F9]"
      initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {/* Hero */}
      {heroImage && (
        <motion.section variants={sectionVariants} className="relative h-[60vh] md:h-[70vh] w-full">
          <Image 
            src={heroImage.url} 
            alt={heroImage.alt} 
            fill 
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {p.vip && (
             <div className="absolute left-6 top-24 md:top-32 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-lg backdrop-blur-md">
                <Crown className="h-4 w-4" /> VIP Collection
            </div>
          )}
        </motion.section>
      )}

      <div className="mx-auto max-w-7xl px-6 py-12 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Details */}
          <div className="lg:col-span-2 space-y-12">
            
            <motion.div variants={sectionVariants} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex gap-2 mb-4">
                 {/* ✅ FIX: Use prop_status */}
                 {p.prop_status && (
                    <span className="inline-flex px-3 py-1 rounded-full bg-[#0A2342] text-white text-[10px] font-bold uppercase tracking-widest">
                       {p.prop_status.replace(/-/g, ' ')}
                    </span>
                 )}
                 <span className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                    {p.propertyType || 'Residence'}
                 </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold font-montserrat text-[#0A2342] leading-tight mb-6">
                {p.title}
              </h1>
              
              <div className="flex flex-wrap items-end justify-between gap-6 border-t border-gray-100 pt-6">
                 <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="h-5 w-5 text-[#D4AF37]" />
                    <span className="text-lg">{p.city || "Cyprus"}</span>
                 </div>
                 <div className="text-3xl font-bold text-[#D4AF37] font-montserrat">
                    {formatPrice(p.price, p.currency)}
                 </div>
              </div>
            </motion.div>

            <motion.div variants={sectionVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={BedDouble} label="Bedrooms" value={p.bedrooms} />
              <StatCard icon={Bath} label="Bathrooms" value={p.bathrooms} />
              <StatCard icon={Ruler} label="Area (m²)" value={p.area} />
              <StatCard icon={House} label="Type" value={p.propertyType ? p.propertyType.replace(/-/g, ' ') : 'Property'} />
            </motion.div>

            {p.description && (
              <motion.section variants={sectionVariants} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                 <h2 className="text-2xl font-bold font-montserrat text-[#0A2342] mb-6">Property Overview</h2>
                 <div className="prose prose-lg prose-slate max-w-none text-gray-600 leading-relaxed">
                    <p className="whitespace-pre-line">{p.description}</p>
                 </div>
              </motion.section>
            )}

            {galleryImages.length > 0 && (
              <motion.section variants={sectionVariants}>
                <h2 className="text-2xl font-bold font-montserrat text-[#0A2342] mb-6">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {galleryImages.map((img, i) => (
                    <div 
                        key={i} 
                        className={`relative overflow-hidden rounded-2xl bg-gray-200 aspect-[4/3] group ${
                            i === 0 || i % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : ''
                        }`}
                    >
                      <Image 
                        src={img.url} 
                        alt={img.alt} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(min-width: 1024px) 60vw, 100vw"
                      />
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <motion.div variants={sectionVariants} className="sticky top-28 space-y-6">
                
                <div className="rounded-3xl bg-white shadow-xl shadow-[#0A2342]/5 border border-gray-100 p-6 flex flex-col gap-4">
                  <div className="text-center mb-2">
                      <h3 className="text-xl font-bold font-montserrat text-[#0A2342]">Interested?</h3>
                      <p className="text-sm text-gray-500 mt-1">Get the full brochure or schedule a private viewing.</p>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <Link href={`/contact?property=${encodeURIComponent(p.slug)}`} className="btn btn-primary w-full gap-2 !bg-[#0A2342] hover:!bg-[#D4AF37] !text-white !border-0 shadow-lg flex items-center justify-center py-3 rounded-xl font-bold uppercase text-xs">
                      <Mail className="h-4 w-4" /> Request Info
                    </Link>
                    <Link href={`/contact?type=tour&property=${encodeURIComponent(p.slug)}`} className="btn w-full gap-2 border border-gray-200 hover:border-[#0A2342] text-[#0A2342] flex items-center justify-center py-3 rounded-xl font-bold uppercase text-xs">
                      <Calendar className="h-4 w-4" /> Book a Viewing
                    </Link>
                    <a href={`tel:+35700000000`} className="btn w-full gap-2 border border-gray-200 hover:border-[#0A2342] text-[#0A2342] flex items-center justify-center py-3 rounded-xl font-bold uppercase text-xs">
                      <Phone className="h-4 w-4" /> Call Agent
                    </a>
                  </div>

                  <div className="mt-2 pt-4 border-t border-gray-100 text-center">
                     <span className="text-[10px] uppercase tracking-widest text-gray-400">Reference ID</span>
                     <p className="text-sm font-mono text-[#0A2342] font-bold">#{p.id.toString().padStart(4, '0')}</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#0A2342] p-6 text-white text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2">Exclusive Service</p>
                    <p className="text-sm opacity-80 leading-relaxed">
                        Represented by TMS Estates. We offer discreet advisory for high-net-worth acquisitions.
                    </p>
                </div>

            </motion.div>
          </aside>

        </div>
      </div>
    </motion.main>
  );
}