// components/TrailList.tsx
"use client";

import { useState } from "react";
import { trailsData } from "../trails";
import { TrailCard } from "./TrailCard";
import { TrailDetailView } from "./TrailDetailView";
import { OriginalTrailData } from "../types/trails";
import { motion } from "framer-motion";

export function TrailList() {
  const [selectedTrail, setSelectedTrail] = useState<OriginalTrailData | null>(
    null
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleLearnMore = (trail: OriginalTrailData) => {
    setSelectedTrail(trail);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setTimeout(() => setSelectedTrail(null), 300); // Wait for animation to complete
  };

  return (
    <>
      <section className="container mx-auto px-4 py-12">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-gray-100"
        >
          Discover Epic Trails
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trailsData.map((trail, index) => (
            <motion.div
              key={`${trail.name}-${index}`}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <TrailCard trail={trail} onLearnMore={handleLearnMore} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trail Detail Modal */}
      <TrailDetailView
        trail={selectedTrail}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </>
  );
}
