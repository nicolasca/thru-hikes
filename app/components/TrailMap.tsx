// app/components/TrailMap.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { OriginalTrailData } from "../types/trails";
import { motion } from "framer-motion";
import { Map, X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";

// Declare L as a global variable that will be initialized on the client-side
// This helps TypeScript understand that L will eventually exist.
declare global {
  interface Window {
    L: typeof import("leaflet");
  }
}

// Use a local variable to store the Leaflet instance.
// Initialize it to null, and then assign it within the client-side check.
let L_client: typeof import("leaflet") | null = null;
let markerLayerGroup: L.LayerGroup | null = null;
let gpxLayer: any = null; // Use 'any' to bypass strict type checking for the dynamically added L.GPX

// Only run this block on the client side
if (typeof window !== "undefined") {
  L_client = require("leaflet");
  require("leaflet-gpx"); // Ensure leaflet-gpx is required AFTER Leaflet is available

  // Fix for default markers
  if (L_client && L_client.Icon) {
    // Ensure L.Icon exists before merging options
    delete (L_client.Icon.Default.prototype as any)._getIconUrl;
    L_client.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });
  }
}

interface TrailMapProps {
  trails: OriginalTrailData[];
  onTrailSelected: (trail: OriginalTrailData | null) => void;
  currentSelectedTrailName: string | null;
  selectedTrailGpxUrl: string | null;
}

const trailCoordinates: Record<string, [number, number]> = {
  "Pacific Crest Trail": [34.2694, -116.1842],
  "Appalachian Trail": [34.6272, -84.1937],
  "Continental Divide Trail": [31.9156, -108.504],
  "Te Araroa": [-34.4261, 172.6856],
  Hexatrek: [48.015, 7.855],
  "Ruta de los Parques": [-41.1456, -71.8531],
  "Great Divide Trail": [49.0008, -114.1251],
  "Arizona Trail": [31.3322, -110.9402],
  "Hayduke Trail": [37.0042, -112.5263],
  "Via Alpina": [46.4908, 10.7429],
  "Sentiero Italia": [38.1157, 13.3615],
  "Michinoku Coastal Trail": [40.6066, 141.4655],
};

function TrailMapContent({
  trails,
  onTrailSelected,
  currentSelectedTrailName,
  selectedTrailGpxUrl,
}: TrailMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Early exit if Leaflet is not yet available (SSR or initial render)
    if (!L_client || !mapContainerRef.current) {
      return;
    }

    if (!mapRef.current) {
      // L_client is guaranteed to be non-null here due to the early exit
      const map = L_client.map(mapContainerRef.current, {
        center: [30, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        worldCopyJump: true,
      });

      L_client.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
      ).addTo(map);

      mapRef.current = map;
      // markerLayerGroup is also guaranteed to be created once L_client is available
      markerLayerGroup = L_client.layerGroup().addTo(map);
    }

    // Add event listener for zoomend
    mapRef.current.on("zoomend", () => {
      const currentZoom = mapRef.current?.getZoom();
      document.querySelectorAll(".trail-marker").forEach((marker) => {
        marker.setAttribute("data-zoom", currentZoom?.toString() || "");
      });
    });

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.off("zoomend");
        mapRef.current.remove();
        mapRef.current = null;
        markerLayerGroup = null;
        gpxLayer = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect for updating markers when trails data or selection changes
  useEffect(() => {
    // Ensure L_client and map are ready
    if (!L_client || !mapRef.current || !markerLayerGroup) return;

    markerLayerGroup.clearLayers();

    trails.forEach((trail) => {
      const coords = trailCoordinates[trail.name];
      if (!coords) return;

      const customIcon = L_client.divIcon({
        // Use L_client here
        html: `
          <div class="trail-marker ${
            currentSelectedTrailName === trail.name ? "selected" : ""
          }" data-zoom="${mapRef.current?.getZoom()}">
            <img src="${trail.flag}" alt="${trail.country}" />
            <div class="trail-marker-pulse"></div>
            <span class="trail-label">${trail.name}</span>
          </div>
        `,
        className: "custom-trail-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      const marker = L_client.marker(coords, { icon: customIcon }); // Use L_client here

      const popupContent = `
        <div class="trail-popup">
          <img src="${trail.image}" alt="${trail.name}" />
          <div class="trail-popup-content">
            <h3>${trail.name}</h3>
            <p class="subtitle">${trail.subtitle} • ${trail.country}</p>
            <div class="stats">
              <span>📏 ${trail.distance}</span>
              <span>⏱️ ${trail.estimatedDuration}</span>
            </div>
            <p class="landscape">${trail.landscape}</p>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: "custom-popup",
      });

      marker.on("click", () => {
        onTrailSelected(trail);
      });

      marker.addTo(markerLayerGroup!);
    });
  }, [trails, onTrailSelected, currentSelectedTrailName]);

  // NEW EFFECT: To handle GPX route display
  useEffect(() => {
    // Ensure L_client, L_client.GPX (via type assertion), and map are ready
    if (!L_client || !(L_client as any).GPX || !mapRef.current) {
      return;
    }

    // Remove existing GPX layer if any
    if (gpxLayer) {
      mapRef.current.removeLayer(gpxLayer);
      gpxLayer = null;
    }

    if (selectedTrailGpxUrl) {
      // Use L_client.GPX and L_client.icon
      gpxLayer = new (L_client as any).GPX(selectedTrailGpxUrl, {
        async: true,
        polyline_options: {
          color: "#4a90e2",
          opacity: 0.8,
          weight: 5,
          dashArray: "10, 5",
        },
        marker_options: false,
        markers: {
          startIcon: null,
          endIcon: null,
          shadow: null,
        },
      })
        .on("loaded", function (e: any) {
          console.log("GPX layer loaded:", e.target);
          console.log("GPX layer options:", e.target.options); // Check options directly
        })
        .on("loaded", function (e: any) {
          if (mapRef.current && e.target.getBounds) {
            mapRef.current.fitBounds(e.target.getBounds());
          }
        })
        .addTo(mapRef.current);
    }
  }, [selectedTrailGpxUrl]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // Invalidate map size after a short delay to allow CSS transitions
    setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 300);
  };

  const resetView = () => {
    mapRef.current?.setView([30, 0], 2);
    onTrailSelected(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`trail-map-container ${isFullscreen ? "fullscreen" : ""}`}
      >
        <Card className="relative h-[600px] overflow-hidden border-0 shadow-xl">
          {/* Map Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-white/90 to-transparent dark:from-slate-900/90 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  Trail Explorer Map
                </h3>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={resetView}
                  variant="outline"
                  size="sm"
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
                >
                  Reset View
                </Button>
                <Button
                  onClick={toggleFullscreen}
                  variant="outline"
                  size="icon"
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div ref={mapContainerRef} className="h-full w-full" />

          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-10">
            <Card className="p-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                Click markers to explore trails
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span>📍 {trails.length} Epic Trails</span>
                <span>
                  🌍 {new Set(trails.map((t) => t.country)).size} Countries
                </span>
              </div>
            </Card>
          </div>
        </Card>
      </motion.div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={toggleFullscreen}
        >
          <div
            className="absolute inset-4 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
            <div ref={mapContainerRef} className="h-full w-full" />
          </div>
        </motion.div>
      )}

      <style jsx global>{`
        /* Custom marker styles */
        .custom-trail-marker {
          background: none !important;
          border: none !important;
        }

        .trail-marker {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .trail-marker:hover {
          transform: scale(1.1);
        }

        .trail-marker.selected {
          transform: scale(1.2);
        }

        .trail-marker img {
          width: 32px;
          height: 24px;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          border: 2px solid white;
          object-fit: cover;
        }

        .trail-marker-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.3);
          animation: pulse 2s infinite;
          z-index: -1;
        }

        .trail-marker.selected .trail-marker-pulse {
          background: rgba(239, 68, 68, 0.3);
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        /* Custom popup styles */
        .custom-popup .leaflet-popup-content-wrapper {
          padding: 0;
          overflow: hidden;
          border-radius: 12px;
        }

        .custom-popup .leaflet-popup-content {
          margin: 0;
          width: 300px !important;
        }

        .trail-popup {
          background: white;
          border-radius: 12px;
          overflow: hidden;
        }

        .dark .trail-popup {
          background: #1e293b;
        }

        .trail-popup img {
          width: 100%;
          height: 150px;
          object-fit: cover;
        }

        .trail-popup-content {
          padding: 16px;
        }

        .trail-popup h3 {
          font-size: 18px;
          font-weight: bold;
          margin: 0 0 4px 0;
          color: #1e293b;
        }

        .dark .trail-popup h3 {
          color: #f1f5f9;
        }

        .trail-popup .subtitle {
          font-size: 14px;
          color: #64748b;
          margin: 0 0 12px 0;
        }

        .trail-popup .stats {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
          font-size: 14px;
          color: #475569;
        }

        .dark .trail-popup .stats {
          color: #cbd5e1;
        }

        .trail-popup .landscape {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          font-style: italic;
        }

        /* Trail label styles */
        .trail-label {
          position: absolute;
          bottom: -25px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          color: #1e293b;
        }

        .dark .trail-label {
          background: rgba(30, 41, 59, 0.95);
          color: #f1f5f9;
        }

        /* Show labels when zoomed in (zoom level 4+) */
        .trail-marker[data-zoom="4"] .trail-label,
        .trail-marker[data-zoom="5"] .trail-label,
        .trail-marker[data-zoom="6"] .trail-label,
        .trail-marker[data-zoom="7"] .trail-label,
        .trail-marker[data-zoom="8"] .trail-label,
        .trail-marker[data-zoom="9"] .trail-label,
        .trail-marker[data-zoom="10"] .trail-label {
          opacity: 1;
        }

        /* Always show label on hover */
        .trail-marker:hover .trail-label {
          opacity: 1;
        }

        /* Adjust label position for selected markers */
        .trail-marker.selected .trail-label {
          bottom: -30px;
          font-size: 14px;
        }

        /* Added or modified for GPX icons */
        .leaflet-pane .leaflet-path-pane path {
          filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
        }

        /* Ensure Leaflet icon base path for custom icons */
        .leaflet-default-icon-path {
          background-image: url("/leaflet/marker-icon.png");
        }
      `}</style>
    </>
  );
}

export const TrailMap = dynamic(() => Promise.resolve(TrailMapContent), {
  ssr: false,
});
