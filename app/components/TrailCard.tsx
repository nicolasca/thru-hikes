// components/TrailCard.tsx
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { OriginalTrailData } from "../types/trails";

interface TrailCardProps {
  trail: OriginalTrailData;
}

// --- Helper Functions (Simplified) ---
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

// NEW helper to get budget text color
function getBudgetColor(budgetLevel: number): string {
  if (budgetLevel <= 2) {
    return "text-teal-600 dark:text-teal-400"; // Low budget
  }
  if (budgetLevel === 3) {
    return "text-amber-600 dark:text-amber-500"; // Medium budget
  }
  return "text-red-600 dark:text-red-500"; // High budget
}
// --- End Helper Functions ---

// NEW HELPER COMPONENT: ScaleBar for Mood/Atmosphere
interface ScaleBarProps {
  label: string;
  value: number; // 1-5 scale
  lowLabel: string;
  highLabel: string;
  colorClass: string; // Tailwind class for the indicator dot
}

const ScaleBar: React.FC<ScaleBarProps> = ({
  label,
  value,
  lowLabel,
  highLabel,
  colorClass,
}) => {
  // Calculate percentage for dot position (0% for 1, 100% for 5)
  const percentage = ((value - 1) / 4) * 100;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2">
        {label}
      </div>
      <div className="relative w-full max-w-[180px] h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
        {/* Indicator dot */}
        <div
          className={`absolute h-4 w-4 ${colorClass} rounded-full -translate-y-1/2 top-1/2 shadow-md`}
          style={{ left: `${percentage}%`, transform: `translateX(-50%)` }} // translateX(-50%) centers the dot
        ></div>
      </div>
      {/* Labels below the bar */}
      <div className="flex justify-between w-full max-w-[180px] text-xs mt-1 text-slate-500 dark:text-slate-400">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
};

export function TrailCard({ trail }: TrailCardProps) {
  return (
    <Card className="trail-card flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl dark:border-slate-700">
      {/* CARD IMAGE SECTION */}
      <div className="h-64 relative overflow-hidden">
        <Image
          src={trail.image}
          alt={trail.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Duration Circle */}
        <div className="absolute top-4 right-4 bg-black/30 text-white backdrop-blur-md rounded-full px-3 py-1 text-xs font-semibold">
          {trail.estimatedDuration}
        </div>

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

        {/* Trail Name and Subtitle */}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-bold text-white mb-0 drop-shadow-md">
            {trail.name}
          </h2>
          <p className="text-md text-white/90 font-light">{trail.subtitle}</p>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="p-6 flex-grow flex flex-col">
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-center text-sm">
          {trail.landscape}
        </p>

        {/* Difficulty Ratings Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
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

        {/* Detailed Info Rows */}
        <div className="space-y-4 text-sm flex-grow">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">Distance</span>
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
            <span className="text-slate-600 dark:text-slate-400">Budget</span>
            <span
              className={`font-semibold ${getBudgetColor(trail.budgetLevel)}`}
            >
              {trail.budget}
            </span>
          </div>
        </div>

        {/* Mood/Atmosphere Bars - NEW SECTION */}
        <div className="flex flex-col gap-6 mb-6">
          {" "}
          {/* Spacing between bars */}
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

        {/* Main Challenges / Dangers */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <h4 className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-3">
            Main Challenges
          </h4>
          <div className="flex flex-wrap gap-2">
            {trail.dangers.map((danger, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-amber-100 text-amber-800 rounded-md text-xs font-medium dark:bg-amber-900/50 dark:text-amber-300"
              >
                {danger}
              </span>
            ))}
          </div>
        </div>

        {/* WHY? Section - NEW ADDITION */}
        <div className="mt-6 pt-4 border-t border-blue-200 dark:border-blue-700">
          {/* Changed border color */}
          <h4 className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 tracking-wider mb-2">
            Why this trail?
          </h4>
          {/* Changed text color and made it bold */}
          <p className="text-sm italic text-blue-800 dark:text-blue-300">
            {trail.why}
          </p>
          {/* Changed text color and made it italic */}
        </div>
      </div>
    </Card>
  );
}
