// components/TrailDetailView.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OriginalTrailData } from "../types/trails";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Clock,
  DollarSign,
  Mountain,
  Users,
  Compass,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Star,
  Flag,
  Route,
} from "lucide-react";

interface TrailDetailViewProps {
  trail: OriginalTrailData | null;
  isOpen: boolean;
  onClose: () => void;
}

// Helper Functions
function getStarRating(ratingString: string, size: "sm" | "md" = "md") {
  const ratingValue = parseInt(ratingString.split("/")[0]);
  const stars = [];
  const starSize = size === "sm" ? "text-sm" : "text-lg";

  for (let i = 0; i < 5; i++) {
    stars.push(
      <motion.span
        key={i}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 * i, duration: 0.3 }}
        className={`${starSize} ${
          i < ratingValue
            ? "text-amber-400"
            : "text-slate-300 dark:text-slate-600"
        }`}
      >
        ★
      </motion.span>
    );
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

function getBudgetColor(budgetLevel: number): string {
  if (budgetLevel <= 1)
    return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20";
  if (budgetLevel === 2)
    return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20";
  if (budgetLevel === 3)
    return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20";
  return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20";
}

// Enhanced Scale Bar Component
interface ScaleBarProps {
  label: string;
  value: number;
  lowLabel: string;
  highLabel: string;
  icon: React.ReactNode;
  gradient: string;
}

const ScaleBar: React.FC<ScaleBarProps> = ({
  label,
  value,
  lowLabel,
  highLabel,
  icon,
  gradient,
}) => {
  const percentage = ((value - 1) / 4) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center w-full p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700"
    >
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <div className="text-sm font-bold uppercase text-slate-700 dark:text-slate-300 tracking-wider">
          {label}
        </div>
      </div>

      <div className="relative w-full max-w-[200px] h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={`absolute h-full rounded-full ${gradient}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        />
        <motion.div
          className="absolute h-5 w-5 bg-white rounded-full border-2 border-slate-300 dark:border-slate-600 shadow-lg -translate-y-1/2 top-1/2"
          style={{
            left: `${percentage}%`,
            transform: `translateX(-50%) translateY(-50%)`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        />
      </div>

      <div className="flex justify-between w-full max-w-[200px] text-xs mt-2 text-slate-500 dark:text-slate-400 font-medium">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </motion.div>
  );
};

// Info Card Component
interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value, accent }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-all duration-300 ${
      accent || ""
    }`}
  >
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-xs font-semibold uppercase text-slate-600 dark:text-slate-400 tracking-wider">
        {label}
      </span>
    </div>
    <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
      {value}
    </div>
  </motion.div>
);

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
          {/* Enhanced Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />

          {/* Enhanced Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-500 overflow-auto"
          >
            <Card className="max-w-6xl mx-auto bg-white dark:bg-slate-900 shadow-2xl border-0 rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                {/* Enhanced Header */}
                <div className="relative h-80 md:h-96">
                  <Image
                    src={trail.image}
                    alt={trail.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Close Button */}
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="icon"
                    className="absolute top-6 right-6 bg-black/30 text-white hover:bg-black/50 backdrop-blur-md rounded-full border border-white/20 w-12 h-12"
                  >
                    <X className="h-5 w-5" />
                  </Button>

                  {/* Country Flag and Info */}
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <Image
                      src={trail.flag}
                      alt={`Flag of ${trail.country}`}
                      width={48}
                      height={32}
                      className="rounded-lg shadow-xl border border-white/20"
                    />
                    <div className="bg-black/30 backdrop-blur-md rounded-xl px-4 py-2 border border-white/10">
                      <span className="text-white font-semibold">
                        {trail.country}
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Trail Info */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-xl">
                        {trail.name}
                      </h1>
                      <p className="text-xl text-white/90 font-light mb-4 drop-shadow-lg">
                        {trail.subtitle}
                      </p>

                      {/* Quick stats */}
                      <div className="flex flex-wrap gap-4 text-white/80">
                        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md rounded-full px-4 py-2">
                          <MapPin className="w-4 h-4" />
                          <span className="font-medium">{trail.distance}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md rounded-full px-4 py-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">
                            {trail.estimatedDuration}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md rounded-full px-4 py-2">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-medium">
                            {trail.highestPoint.split("(")[0]}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="p-8 md:p-12">
                  {/* Landscape Description */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-10"
                  >
                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
                      {trail.landscape}
                    </p>
                  </motion.div>

                  {/* Difficulty Ratings */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-3 gap-6 mb-12"
                  >
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800">
                      <Star className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                      <div className="text-sm font-bold uppercase text-amber-700 dark:text-amber-400 tracking-wider mb-2">
                        Physical
                      </div>
                      {getStarRating(trail.physicalDifficulty)}
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800">
                      <Compass className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-sm font-bold uppercase text-purple-700 dark:text-purple-400 tracking-wider mb-2">
                        Adventure
                      </div>
                      {getStarRating(trail.adventureDifficulty)}
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800">
                      <Mountain className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                      <div className="text-sm font-bold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider mb-2">
                        Scenery
                      </div>
                      {getStarRating(trail.sceneryRating)}
                    </div>
                  </motion.div>

                  {/* Enhanced Info Grid */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
                  >
                    <InfoCard
                      icon={<Calendar className="w-4 h-4 text-blue-600" />}
                      label="Best Time"
                      value={trail.idealWindow}
                    />
                    <InfoCard
                      icon={<TrendingUp className="w-4 h-4 text-green-600" />}
                      label="Highest Point"
                      value={trail.highestPoint.split("(")[0]}
                    />
                    <InfoCard
                      icon={<DollarSign className="w-4 h-4 text-purple-600" />}
                      label="Monthly Budget"
                      value={trail.budget}
                      accent={getBudgetColor(trail.budgetLevel)}
                    />
                    <InfoCard
                      icon={<Route className="w-4 h-4 text-orange-600" />}
                      label="Distance"
                      value={trail.distance}
                    />
                  </motion.div>

                  {/* Enhanced Scale Bars */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
                  >
                    <ScaleBar
                      label="Social Vibe"
                      value={trail.socialScale}
                      lowLabel="Solitary"
                      highLabel="Social"
                      icon={<Users className="w-5 h-5 text-purple-600" />}
                      gradient="bg-gradient-to-r from-purple-400 to-pink-500"
                    />
                    <ScaleBar
                      label="Wilderness Level"
                      value={trail.wildernessScale}
                      lowLabel="Civilized"
                      highLabel="Wild"
                      icon={<Mountain className="w-5 h-5 text-green-600" />}
                      gradient="bg-gradient-to-r from-green-400 to-emerald-600"
                    />
                  </motion.div>

                  {/* Regions */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mb-8"
                  >
                    <h4 className="text-sm font-bold uppercase text-slate-600 dark:text-slate-400 tracking-wider mb-4 flex items-center gap-2">
                      <Flag className="w-4 h-4" />
                      Regions Traversed
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {trail.regionsTraversed.map((region, index) => (
                        <motion.span
                          key={index}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.8 + index * 0.05 }}
                          className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                        >
                          {region}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Challenges */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mb-10"
                  >
                    <h4 className="text-sm font-bold uppercase text-slate-600 dark:text-slate-400 tracking-wider mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Main Challenges
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {trail.dangers.map((danger, index) => (
                        <motion.span
                          key={index}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                          className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-semibold dark:from-amber-900/30 dark:to-orange-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shadow-sm"
                        >
                          {danger}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Enhanced Why Section */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="pt-8 border-t-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800"
                  >
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                      <h4 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Why choose this trail?
                      </h4>
                      <p className="text-blue-900 dark:text-blue-200 italic text-lg leading-relaxed font-medium">
                        {trail.why}
                      </p>
                    </div>
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
