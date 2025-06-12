// components/TrailCard.tsx
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OriginalTrailData } from "../types/trails";
import { motion } from "framer-motion";

interface TrailCardProps {
  trail: OriginalTrailData;
  onLearnMore: (trail: OriginalTrailData) => void;
}

// Helper function for star rating
function getStarRating(ratingString: string) {
  const ratingValue = parseInt(ratingString.split("/")[0]);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span
        key={i}
        className={`star text-lg ${
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

export function TrailCard({ trail, onLearnMore }: TrailCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-full"
    >
      <Card className="trail-card flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl dark:border-slate-700 h-full">
        {/* CARD IMAGE SECTION */}
        <div className="h-48 relative overflow-hidden">
          <Image
            src={trail.image}
            alt={trail.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* Duration Circle */}
          <div className="absolute top-3 right-3 bg-black/30 text-white backdrop-blur-md rounded-full px-2 py-1 text-xs font-semibold">
            {trail.estimatedDuration}
          </div>

          {/* Country Flag */}
          <div className="absolute top-3 left-3">
            <Image
              src={trail.flag}
              alt={`Flag of ${trail.country}`}
              width={36}
              height={24}
              className="w-9 h-auto rounded-sm shadow-lg"
            />
          </div>

          {/* Trail Name and Subtitle */}
          <div className="absolute bottom-3 left-3 right-3">
            <h2 className="text-xl font-bold text-white mb-0 drop-shadow-md">
              {trail.name}
            </h2>
            <p className="text-sm text-white/90 font-light">{trail.subtitle}</p>
          </div>
        </div>

        {/* SIMPLIFIED INFO SECTION */}
        <div className="p-4 flex-grow flex flex-col">
          <p className="text-slate-600 dark:text-slate-400 mb-4 text-center text-sm">
            {trail.landscape}
          </p>

          {/* Essential Info Only */}
          <div className="space-y-3 text-sm flex-grow">
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
                Difficulty
              </span>
              <div className="flex items-center gap-1">
                {getStarRating(trail.physicalDifficulty)}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400">Budget</span>
              <span
                className={`font-semibold text-sm ${getBudgetColor(
                  trail.budgetLevel
                )}`}
              >
                {trail.budget}
              </span>
            </div>
          </div>

          {/* Learn More Button */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button
              onClick={() => onLearnMore(trail)}
              className="w-full"
              variant="outline"
            >
              Learn More
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
