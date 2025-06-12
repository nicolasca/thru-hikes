// app/page.tsx
"use client";

import { useState } from "react";
import HeroSection from "./components/HeroSection";
import { TrailMap } from "./components/TrailMap";
import { TrailCard } from "./components/TrailCard";
import { TrailDetailView } from "./components/TrailDetailView";
import { trailsData } from "./trails";
import { OriginalTrailData } from "./types/trails";
import { motion, AnimatePresence } from "framer-motion";
import { Map, Grid3X3, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  const [selectedTrail, setSelectedTrail] = useState<OriginalTrailData | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"map" | "grid">("map");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // This handler will now be passed to TrailMap
  const handleTrailSelectedFromMap = (trail: OriginalTrailData | null) => {
    setSelectedTrail(trail);
    setIsDetailOpen(false); // Close modal view
  };

  // This is for clicks on the Grid View cards
  const handleTrailSelectFromGrid = (trail: OriginalTrailData) => {
    setSelectedTrail(trail);
    setIsDetailOpen(false); // Close modal view
  };

  const handleLearnMore = (trail: OriginalTrailData) => {
    setSelectedTrail(trail);
    setIsDetailOpen(true); // Open modal for full details
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <HeroSection />

      {/* Explorer Section */}
      <section className="container-fluid px-4 py-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between mb-6"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Explore Epic Trails
            </h2>

            {/* View Mode Toggle */}
            <div className="flex gap-2 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm">
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="gap-2"
              >
                <Map className="w-4 h-4" />
                Map View
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="gap-2"
              >
                <Grid3X3 className="w-4 h-4" />
                Grid View
              </Button>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex gap-6 h-[800px]">
            {/* Left Panel - Map or Grid */}
            <motion.div
              className={`flex-1 transition-all duration-300 ${
                selectedTrail && !isSidebarCollapsed ? "lg:flex-[1.5]" : ""
              }`}
              layout
            >
              <AnimatePresence mode="wait">
                {viewMode === "map" ? (
                  <motion.div
                    key="map-view" // Added a key here to ensure AnimatePresence works correctly for switching between map/grid
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full"
                  >
                    <TrailMap
                      trails={trailsData}
                      onTrailSelected={handleTrailSelectedFromMap} // Pass the new handler
                      currentSelectedTrailName={selectedTrail?.name || null} // Pass the selected trail name
                      selectedTrailGpxUrl={selectedTrail?.gpxUrl || null} // NEW
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="grid-view" // Added a key here
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full overflow-y-auto pr-4 custom-scrollbar"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {trailsData.map((trail, index) => (
                        <motion.div
                          key={trail.name}
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleTrailSelectFromGrid(trail)} // Use the appropriate handler
                          className="cursor-pointer"
                        >
                          <TrailCard
                            trail={trail}
                            onLearnMore={handleLearnMore}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right Panel - Trail Details */}
            <AnimatePresence>
              {selectedTrail && (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.3 }}
                  className={`${
                    isSidebarCollapsed ? "w-0" : "w-full lg:w-[500px]"
                  } relative transition-all duration-300`}
                >
                  {/* Collapse Toggle */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute -left-10 top-4 z-10 bg-white dark:bg-slate-800 shadow-md rounded-full"
                  >
                    {isSidebarCollapsed ? (
                      <ChevronLeft className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>

                  {!isSidebarCollapsed && (
                    <Card className="h-full overflow-hidden bg-white dark:bg-slate-800 shadow-xl">
                      <div className="h-full overflow-y-auto custom-scrollbar">
                        {/* Trail Header Image */}
                        <div className="relative h-48">
                          <img
                            src={selectedTrail.image}
                            alt={selectedTrail.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-2xl font-bold text-white mb-1">
                              {selectedTrail.name}
                            </h3>
                            <p className="text-white/80">
                              {selectedTrail.subtitle} • {selectedTrail.country}
                            </p>
                          </div>
                        </div>

                        {/* Trail Quick Info */}
                        <div className="p-6 space-y-6">
                          {/* Key Stats */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Distance
                              </p>
                              <p className="font-bold text-lg">
                                {selectedTrail.distance}
                              </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Duration
                              </p>
                              <p className="font-bold text-lg">
                                {selectedTrail.estimatedDuration}
                              </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Best Time
                              </p>
                              <p className="font-bold text-lg">
                                {selectedTrail.idealWindow}
                              </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Budget
                              </p>
                              <p className="font-bold text-lg">
                                {selectedTrail.budget}
                              </p>
                            </div>
                          </div>

                          {/* Landscape */}
                          <div>
                            <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">
                              Landscape
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400">
                              {selectedTrail.landscape}
                            </p>
                          </div>

                          {/* Difficulty Ratings */}
                          <div>
                            <h4 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">
                              Difficulty Ratings
                            </h4>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                  Physical
                                </span>
                                <span className="font-medium">
                                  {selectedTrail.physicalDifficulty}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                  Adventure
                                </span>
                                <span className="font-medium">
                                  {selectedTrail.adventureDifficulty}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-600 dark:text-slate-400">
                                  Scenery
                                </span>
                                <span className="font-medium">
                                  {selectedTrail.sceneryRating}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Challenges */}
                          <div>
                            <h4 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">
                              Main Challenges
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedTrail.dangers.map((danger, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-sm"
                                >
                                  {danger}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Why Section */}
                          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">
                              Why choose this trail?
                            </h4>
                            <p className="text-blue-900 dark:text-blue-200 italic">
                              {selectedTrail.why}
                            </p>
                          </div>

                          {/* Full Details Button */}
                          <Button
                            onClick={() => handleLearnMore(selectedTrail)}
                            className="w-full"
                            size="lg"
                          >
                            View Full Trail Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Trail Detail Modal - Keep for full view */}
      <TrailDetailView
        trail={selectedTrail}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }

        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
