// types/trail.d.ts (You might want to create a `types` folder for this)
// Or you can put it directly in components/TrailList.tsx for now
export interface OriginalTrailData {
  name: string;
  subtitle: string;
  country: string;
  flag: string;
  image: string;
  distance: string;
  physicalDifficulty: string; // e.g., "4/5"
  adventureDifficulty: string; // e.g., "3/5"
  sceneryRating: string; // e.g., "5/5"
  landscape: string;
  specificity: string;
  idealWindow: string;
  estimatedDuration: string;
  budget: string;
  social: string;
  terrain: string;
  dangers: string[];
  budgetLevel: number; // 1-4
  why: string;
  socialScale: number; // 1 (Very Solitary) to 5 (Very Social)
  wildernessScale: number; // 1 (Civilized) to 5 (Wild)
  highestPoint: string;
  regionsTraversed: string[];
  gpxUrl?: string;
}

// Your actual trailsData will be placed in TrailList.tsx
