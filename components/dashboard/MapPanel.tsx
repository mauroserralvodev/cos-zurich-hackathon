"use client";

import { ChevronDown, ChevronUp, Map, Satellite } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import {
  VIEWBOX_HEIGHT,
  VIEWBOX_WIDTH,
  ACCENT,
} from "@/lib/collective-os/constants";
import type {
  MapMode,
  Person,
  SimulationAnalysis,
  StimulusFormState,
} from "@/lib/collective-os/types";
import PersonDot from "./PersonDot";

type MapPanelProps = {
  mapMode: MapMode;
  setMapMode: React.Dispatch<React.SetStateAction<MapMode>>;
  mapSrc: string;
  people: Person[];
  showSentiment: boolean;
  form?: StimulusFormState;
  narrative?: string;
  analysis?: SimulationAnalysis;
};

export default function MapPanel({
  mapMode,
  setMapMode,
  mapSrc,
  people,
  showSentiment,
  form,
  narrative,
  analysis,
}: MapPanelProps) {
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
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
                opinionContext={{
                  title: form?.title,
                  description: form?.description,
                  tone: form?.tone,
                  narrative,
                }}
              />
            ))}
          </div>
        </div>
        {showSentiment && analysis && (
          <div className="absolute bottom-5 left-5 z-30 max-w-100 ">
            <div className="rounded-3xl border border-black/10 bg-white/95 shadow-xl backdrop-blur">
              <button
                type="button"
                onClick={() => setIsAnalysisOpen((prev) => !prev)}
                className="flex w-full items-center justify-between gap-3 rounded-3xl px-4 py-3 text-left transition hover:bg-black/2"
              >
                {/* <div>
                  <p className="text-sm font-medium text-neutral-900">
                    Simulation readout
                  </p>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Segment response, distribution and geographic variation
                  </p>
                </div> */}

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
                    Polarization {analysis.polarization}%
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 cursor-pointer">
                    {isAnalysisOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </span>
                </div>
              </button>

              {isAnalysisOpen && (
                <div className="max-h-[58vh] overflow-y-auto px-4 pb-4 no-scrollbar">
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between text-[11px] text-neutral-500">
                      <span>Positive {analysis.sentimentDistribution.positive}%</span>
                      <span>Neutral {analysis.sentimentDistribution.neutral}%</span>
                      <span>Negative {analysis.sentimentDistribution.negative}%</span>
                    </div>

                    <div className="flex h-2.5 overflow-hidden rounded-full bg-neutral-200">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${analysis.sentimentDistribution.positive}%` }}
                      />
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: `${analysis.sentimentDistribution.neutral}%` }}
                      />
                      <div
                        className="h-full bg-red-500"
                        style={{ width: `${analysis.sentimentDistribution.negative}%` }}
                      />
                    </div>
                  </div>

                  {narrative && (
                    <div className="mb-4 rounded-2xl border border-black/10 bg-neutral-50 p-3">
                      <p className="mb-1 text-sm text-neutral-500">
                        Narrative interpretation
                      </p>
                      <p className="text-xs leading-5 text-neutral-700">
                        {narrative}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3">
                    <div className="rounded-2xl border border-black/10 bg-neutral-50 p-3">
                      <p className="mb-2 text-sm text-neutral-500">
                        Most receptive segments
                      </p>
                      <div className="space-y-2">
                        {analysis.topSupportiveSegments.map((segment) => (
                          <div
                            key={`support-${segment.label}`}
                            className="flex items-center justify-between gap-3 text-xs"
                          >
                            <span className="truncate text-neutral-700">
                              {segment.label}
                            </span>
                            <span className="font-medium text-green-700">
                              {segment.averageSentiment}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-black/10 bg-neutral-50 p-3">
                      <p className="mb-2 text-sm text-neutral-500">
                        Most resistant segments
                      </p>
                      <div className="space-y-2">
                        {analysis.topResistantSegments.map((segment) => (
                          <div
                            key={`resist-${segment.label}`}
                            className="flex items-center justify-between gap-3 text-xs"
                          >
                            <span className="truncate text-neutral-700">
                              {segment.label}
                            </span>
                            <span className="font-medium text-red-700">
                              {segment.averageSentiment}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-black/10 bg-neutral-50 p-3">
                      <p className="mb-2 text-sm text-neutral-500">
                        Geographic reaction
                      </p>
                      <div className="space-y-2">
                        {analysis.zoneBreakdown.map((zone) => (
                          <div
                            key={`zone-${zone.label}`}
                            className="flex items-center justify-between gap-3 text-xs"
                          >
                            <span className="truncate text-neutral-700">
                              {zone.label}
                            </span>
                            <span className="font-medium text-neutral-900">
                              {zone.averageSentiment}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-black/10 bg-neutral-50 p-3">
                      <p className="mb-2 text-sm text-neutral-500">
                        Main simulation drivers
                      </p>
                      <div className="space-y-2">
                        {analysis.leadingDrivers.map((driver) => (
                          <div
                            key={driver.label}
                            className="text-xs leading-5 text-neutral-700"
                          >
                            <span className="font-medium text-neutral-900">
                              {driver.label}:
                            </span>{" "}
                            strongest positive in {driver.strongestPositive}, strongest
                            resistance in {driver.strongestNegative} ({driver.spread}pt
                            spread)
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}