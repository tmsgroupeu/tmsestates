"use client";
import { useState } from 'react';
import Section from "@/components/Section"; // CORRECTED PATH
import PropertyCard from "@/components/PropertyCard"; // CORRECTED PATH
import { motion, AnimatePresence } from 'framer-motion';

// STATIC DATA FOR PRESENTATION
const collections = {
    'Seafront Villas': [
        { id: 1, attributes: { title: 'Luxury Beachfront Estate', slug: 'seafront-villa-amara', city: 'Limassol', price: 4250000, currency: '€', bedrooms: 5, bathrooms: 6, area: 550, status: 'for-sale', images: { data: [{ attributes: { url: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' } }] } } },
        { id: 4, attributes: { title: 'The Address - Sea View', slug: 'the-address-sea-view', city: 'Limassol', price: 3100000, currency: '€', bedrooms: 3, bathrooms: 4, area: 280, status: 'for-sale', images: { data: [{ attributes: { url: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' } }] } } },
        { id: 5, attributes: { title: 'Private Cove Residence', slug: 'private-cove-residence', city: 'Limassol', price: 7800000, currency: '€', bedrooms: 6, bathrooms: 7, area: 800, status: 'for-sale', images: { data: [{ attributes: { url: 'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' } }] } } },
    ],
    'City Apartments': [
        { id: 2, attributes: { title: 'Penthouse at The One Tower', slug: 'penthouse-one-tower', city: 'Limassol', price: 6500000, currency: '€', bedrooms: 4, bathrooms: 5, area: 480, status: 'for-sale', images: { data: [{ attributes: { url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' } }] } } },
        { id: 6, attributes: { title: 'Trilogy Tower Residence', slug: 'trilogy-tower-residence', city: 'Limassol', price: 1800000, currency: '€', bedrooms: 2, bathrooms: 3, area: 180, status: 'for-sale', images: { data: [{ attributes: { url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' } }] } } },
        { id: 7, attributes: { title: 'Old Town Historic Loft', slug: 'old-town-loft', city: 'Limassol', price: 950000, currency: '€', bedrooms: 3, bathrooms: 2, area: 220, status: 'for-sale', images: { data: [{ attributes: { url: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' } }] } } },
    ],
    'Investment Opportunities': [
        { id: 8, attributes: { title: 'Multi-Unit Complex', slug: 'multi-unit-complex', city: 'Zakaki', price: 3500000, currency: '€', bedrooms: 12, bathrooms: 12, area: 1100, status: 'for-sale', images: { data: [{ attributes: { url: 'https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' } }] } } },
        { id: 3, attributes: { title: 'Modern Residence with Rental Yield', slug: 'modern-residence-agios', city: 'Agios Athanasios', price: 2100000, currency: '€', bedrooms: 4, bathrooms: 4, area: 320, status: 'for-sale', images: { data: [{ attributes: { url: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' } }] } } },
        { id: 9, attributes: { title: 'Commercial Plot in Tourist Area', slug: 'commercial-plot-tourist', city: 'Germasogeia', price: 5200000, currency: '€', area: 2500, status: 'for-sale', images: { data: [{ attributes: { url: 'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' } }] } } },
    ]
};

type CollectionName = keyof typeof collections;

export default function PropertyCollections() {
  const [activeTab, setActiveTab] = useState<CollectionName>('Seafront Villas');

  return (
    <Section
      id="collections"
      title="Curated Collections"
      subtitle="Properties tailored to your lifestyle and investment goals."
    >
      <div className="flex justify-center mb-8 border-b border-muted">
        {Object.keys(collections).map((tabName) => (
          <button
            key={tabName}
            onClick={() => setActiveTab(tabName as CollectionName)}
            className={`relative px-4 py-3 text-sm sm:text-base font-semibold transition-colors ${
              activeTab === tabName ? 'text-gold' : 'text-muted-foreground hover:text-navy'
            }`}
          >
            {tabName}
            {activeTab === tabName && (
              <motion.div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-gold" layoutId="underline" />
            )}
          </button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {collections[activeTab].map((p) => <PropertyCard key={p.id} p={p} />)}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}