// components/TrailList.tsx
import { trailsData } from "../trails";
import { TrailCard } from "./TrailCard";

export function TrailList() {
  return (
    <section className="container mx-auto px-4 py-12">
      {" "}
      {/* Added py-12 for spacing */}
      <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-900">
        Discover Epic Trails
      </h2>{" "}
      {/* Enhanced title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {" "}
        {/* Increased gap for better spacing */}
        {trailsData.map((trail, index) => (
          // Added a unique key, like index, but preferably use a unique ID from data if available
          // Since the original data doesn't have a specific ID, using name + index as a fallback key
          <TrailCard key={`${trail.name}-${index}`} trail={trail} />
        ))}
      </div>
    </section>
  );
}
