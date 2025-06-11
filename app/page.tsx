// app/page.tsx

import { HeroSection } from "./components/HeroSection";
import { TrailList } from "./components/TrailList";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <HeroSection />
      <TrailList />
    </div>
  );
}
