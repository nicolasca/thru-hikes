// components/TrailCard.tsx
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OriginalTrailData } from "../types/trails";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  DollarSign,
  Mountain,
  Users,
  Compass,
} from "lucide-react";

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
        className={`text-sm ${
          i < ratingValue
            ? "text-amber-400"
            : "text-slate-300 dark:text-slate-600"
        }`}
      >
        ★
      </span>
    );
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

function getBudgetColor(budgetLevel: number): string {
  if (budgetLevel <= 1) return "text-emerald-600 dark:text-emerald-400";
  if (budgetLevel === 2) return "text-amber-600 dark:text-amber-400";
  if (budgetLevel === 3) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
}

function getSocialIcon(socialScale: number) {
  if (socialScale <= 2) return <Users className="w-3 h-3 text-slate-500" />;
  if (socialScale <= 3) return <Users className="w-3 h-3 text-blue-500" />;
  return <Users className="w-3 h-3 text-green-500" />;
}

function getWildernessIcon(wildernessScale: number) {
  if (wildernessScale <= 2)
    return <Compass className="w-3 h-3 text-slate-500" />;
  if (wildernessScale <= 3)
    return <Mountain className="w-3 h-3 text-blue-500" />;
  return <Mountain className="w-3 h-3 text-green-600" />;
}

export function TrailCard({ trail, onLearnMore }: TrailCardProps) {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="h-full group"
    >
      <Card className="trail-card flex flex-col rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 dark:border-slate-700/50 h-full bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg">
        {/* Enhanced Image Section */}
        <div className="h-56 relative overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src={trail.image}
              alt={trail.name}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Top badges row */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <Image
                src={trail.flag}
                alt={`Flag of ${trail.country}`}
                width={28}
                height={20}
                className="rounded-md shadow-lg border border-white/20"
              />
              <div className="bg-black/40 backdrop-blur-md rounded-full px-2 py-1">
                <span className="text-white text-xs font-medium">
                  {trail.country}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/20 backdrop-blur-md text-white rounded-full px-3 py-1.5 text-sm font-semibold border border-white/10"
            >
              <Clock className="w-3 h-3 inline mr-1" />
              {trail.estimatedDuration}
            </motion.div>
          </div>

          {/* Enhanced title section */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                {trail.name}
              </h2>
              <p className="text-white/90 font-light text-sm mb-3 drop-shadow-md">
                {trail.subtitle}
              </p>

              {/* Quick stats bar */}
              <div className="flex items-center gap-4 text-white/80 text-xs">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{trail.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  {getSocialIcon(trail.socialScale)}
                  <span className="capitalize">
                    {trail.social.split(" ")[0]}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {getWildernessIcon(trail.wildernessScale)}
                  <span>Wild</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced content section */}
        <div className="p-6 flex-grow flex flex-col">
          {/* Landscape description */}
          <p className="text-slate-600 dark:text-slate-400 mb-5 text-center text-sm leading-relaxed font-medium">
            {trail.landscape}
          </p>

          {/* Enhanced stats grid */}
          <div className="space-y-4 flex-grow">
            {/* Difficulty ratings */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1">
                  Physical
                </div>
                {getStarRating(trail.physicalDifficulty)}
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1">
                  Adventure
                </div>
                {getStarRating(trail.adventureDifficulty)}
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1">
                  Scenery
                </div>
                {getStarRating(trail.sceneryRating)}
              </div>
            </div>

            {/* Key info */}
            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                  Best Time
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                  {trail.idealWindow}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400 text-sm font-medium flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  Budget
                </span>
                <span
                  className={`font-bold text-sm ${getBudgetColor(
                    trail.budgetLevel
                  )}`}
                >
                  {trail.budget.split("/")[0]}/mo
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced CTA button */}
          <div className="mt-6 pt-4">
            <Button
              onClick={() => onLearnMore(trail)}
              className="w-full bg-blue-500 cursor-pointer hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-xl h-11 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              variant="outline"
            >
              Discover More
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
