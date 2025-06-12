// components/TrailDetailView.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OriginalTrailData } from "../types/trails";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TrailDetailViewProps {
  trail: OriginalTrailData | null;
  isOpen: boolean;
  onClose: () => void;
}

// Helper Functions
function getStarRating(ratingString: string) {
  const ratingValue = parseInt(ratingString.split("/")[0]);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span
        key={i}
        className={`star text-xl ${
          i < ratingValue ? "text-amber-400" : "text-slate-300"
        }`}
      >
        ★
      </span>
    );
  }
  return <div className="flex items-center justify-center">{stars}</div>;
}

function getBudgetColor(budgetLevel: number): string {
  if (budgetLevel <= 1) {
    return "text-teal-600 dark:text-teal-400";
  }
  if (budgetLevel === 2) {
    return "text-amber-600 dark:text-amber-500";
  }
  if (budgetLevel === 3) {
    return "text-orange-600 dark:text-orange-500";
  }
  return "text-red-600 dark:text-red-500";
}

// Scale Bar Component
interface ScaleBarProps {
  label: string;
  value: number;
  lowLabel: string;
  highLabel: string;
  colorClass: string;
}

const ScaleBar: React.FC<ScaleBarProps> = ({
  label,
  value,
  lowLabel,
  highLabel,
  colorClass,
}) => {
  const percentage = ((value - 1) / 4) * 100;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">
        {label}
      </div>
      <div className="relative w-full max-w-[180px] h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
        <motion.div
          className={`absolute h-4 w-4 ${colorClass} rounded-full -translate-y-1/2 top-1/2 shadow-md`}
          style={{ left: `${percentage}%`, transform: `translateX(-50%)` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        />
      </div>
      <div className="flex justify-between w-full max-w-[180px] text-xs mt-1 text-slate-500 dark:text-slate-400">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
};

export function TrailDetailView({
  trail,
  isOpen,
  onClose,
}: TrailDetailViewProps) {
  if (!trail) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-auto"
          >
            <Card className="max-w-4xl mx-auto bg-white dark:bg-slate-800 shadow-2xl">
              <CardContent className="p-0">
                {/* Header with close button */}
                <div className="relative h-64 md:h-80">
                  <Image
                    src={trail.image}
                    alt={trail.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Close Button */}
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-black/30 text-white hover:bg-black/50 backdrop-blur-md"
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  {/* Country Flag */}
                  <div className="absolute top-4 left-4">
                    <Image
                      src={trail.flag}
                      alt={`Flag of ${trail.country}`}
                      width={48}
                      height={32}
                      className="w-12 h-auto rounded-md shadow-lg"
                    />
                  </div>

                  {/* Trail Info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <motion.h1
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md"
                    >
                      {trail.name}
                    </motion.h1>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg text-white/90 font-light"
                    >
                      {trail.subtitle} • {trail.distance} •{" "}
                      {trail.estimatedDuration}
                    </motion.p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-slate-600 dark:text-slate-400 mb-8 text-center text-lg">
                      {trail.landscape}
                    </p>

                    {/* Difficulty Ratings Grid */}
                    <div className="grid grid-cols-3 gap-6 mb-8 text-center">
                      <div>
                        <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">
                          Physical
                        </div>
                        {getStarRating(trail.physicalDifficulty)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">
                          Adventure
                        </div>
                        {getStarRating(trail.adventureDifficulty)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">
                          Scenery
                        </div>
                        {getStarRating(trail.sceneryRating)}
                      </div>
                    </div>

                    {/* Detailed Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Distance
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {trail.distance}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Ideal Window
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {trail.idealWindow}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Highest Point
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {trail.highestPoint}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Budget
                          </span>
                          <span
                            className={`font-semibold ${getBudgetColor(
                              trail.budgetLevel
                            )}`}
                          >
                            {trail.budget}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="mb-4">
                          <span className="text-slate-600 dark:text-slate-400 block mb-2">
                            Regions Traversed
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                            {trail.regionsTraversed.join(" • ")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Mood/Atmosphere Bars */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <ScaleBar
                        label="Social Vibe"
                        value={trail.socialScale}
                        lowLabel="Solitary"
                        highLabel="Social"
                        colorClass="bg-purple-500 dark:bg-purple-400"
                      />
                      <ScaleBar
                        label="Wilderness Level"
                        value={trail.wildernessScale}
                        lowLabel="Civilized"
                        highLabel="Wild"
                        colorClass="bg-green-500 dark:bg-green-400"
                      />
                    </div>

                    {/* Main Challenges */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-4">
                        Main Challenges
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {trail.dangers.map((danger, index) => (
                          <motion.span
                            key={index}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium dark:bg-amber-900/50 dark:text-amber-300"
                          >
                            {danger}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Why Section */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="pt-6 border-t border-blue-200 dark:border-blue-700"
                    >
                      <h4 className="text-sm font-bold uppercase text-blue-600 dark:text-blue-400 tracking-wider mb-3">
                        Why this trail?
                      </h4>
                      <p className="text-blue-800 dark:text-blue-300 italic text-lg leading-relaxed">
                        {trail.why}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
