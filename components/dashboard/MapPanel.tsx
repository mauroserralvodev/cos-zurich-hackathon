"use client";

import { Map, Satellite } from "lucide-react";
import Image from "next/image";
import {
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
  ACCENT,
} from "@/lib/collective-os/constants";
import type { MapMode, Person } from "@/lib/collective-os/types";
import PersonDot from "./PersonDot";

type MapPanelProps = {
  mapMode: MapMode;
  setMapMode: React.Dispatch<React.SetStateAction<MapMode>>;
  mapSrc: string;
  people: Person[];
  showSentiment: boolean;
};

export default function MapPanel({
  mapMode,
  setMapMode,
  mapSrc,
  people,
  showSentiment,
}: MapPanelProps) {
  return (
    <section className="relative h-full max-w-199 overflow-hidden rounded-4xl border border-black/10 bg-white">
      <div className="relative h-full w-full bg-neutral-50">
        <div className="absolute right-5 top-5 z-30">
          <div className="inline-flex cursor-pointer rounded-3xl border border-black/10 bg-white p-1">
            <button
              type="button"
              onClick={() => setMapMode("map")}
              className={`cursor-pointer rounded-3xl px-2 py-2 text-sm font-medium transition ${
                mapMode === "map"
                  ? "text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
              style={{
                backgroundColor: mapMode === "map" ? ACCENT : "transparent",
              }}
            >
              <Map size={18} />
            </button>

            <button
              type="button"
              onClick={() => setMapMode("satellite")}
              className={`cursor-pointer rounded-3xl px-2 py-2 text-sm font-medium transition ${
                mapMode === "satellite"
                  ? "text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
              style={{
                backgroundColor:
                  mapMode === "satellite" ? ACCENT : "transparent",
              }}
            >
              <Satellite size={18} />
            </button>
          </div>
        </div>

        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="relative h-full w-full">
            <Image
              src={mapSrc}
              alt="Zurich canton"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div
            className="relative ml-36 mt-44 h-full"
            style={{ aspectRatio: `${VIEWBOX_WIDTH} / ${VIEWBOX_HEIGHT}` }}
          >
            {people.map((person) => (
              <PersonDot
                key={person.id}
                person={person}
                showSentiment={showSentiment}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}