/* Enhanced: ./components/sections/PropertyCollectionsTabs.tsx */
"use client";
import { useState } from 'react';
import PropertyCard from "@/components/PropertyCard";
import { motion, AnimatePresence } from 'framer-motion';
import { Property } from '@/lib/cms';

type CollectionName = string;
interface PropertyCollectionsTabsProps { collections: Record<string, Property[]>; }

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Animate children in with a 0.1s delay between them
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function PropertyCollectionsTabs({ collections }: PropertyCollectionsTabsProps) {
  const tabNames = Object.keys(collections);
  // Guard against no collections being passed
  const [activeTab, setActiveTab] = useState<CollectionName | undefined>(tabNames[0]);

  if (!activeTab) return null; // Render nothing if there are no tabs

  return (
    <div className="w-full">
      <div className="flex justify-center mb-10 border-b border-white/20 overflow-x-auto">
        {tabNames.map((tabName) => (
          <button
            key={tabName}
            onClick={() => setActiveTab(tabName)}
            className={`relative px-4 sm:px-6 py-4 text-sm sm:text-base font-semibold transition-colors duration-300 whitespace-nowrap ${
              activeTab === tabName 
                ? 'text-white' 
                : 'text-white/50 hover:text-white'
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
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {collections[activeTab]?.map((p) => (
             p && <motion.div variants={itemVariants} key={p.id}><PropertyCard p={p} /></motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}