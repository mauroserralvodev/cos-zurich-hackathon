"use client";

import { useEffect, useRef, useState } from "react";
import { IBM_Plex_Mono } from "next/font/google";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MapPanel from "@/components/dashboard/MapPanel";
import {
  ACCENT,
  DEFAULT_SIMULATION_RESULT,
  DEFAULT_STATS,
  DEFAULT_STIMULUS_FORM,
} from "@/lib/collective-os/constants";
import { DEFAULT_PARAMETER_BLOCKS } from "@/lib/collective-os/parameter-blocks";
import { applySimulationScoresToPeople } from "@/lib/collective-os/person-scoring";
import { generatePeopleInZurichShape } from "@/lib/collective-os/simulation";
import type {
  DashboardPhase,
  ManualStats,
  MapMode,
  OperationalReview,
  ParameterBlockId,
  Person,
  SimulationAnalysis,
  SimulationResult,
  SimulationTraceEntry,
  StimulusFormState,
} from "@/lib/collective-os/types";
import { analyzeSimulation } from "@/lib/collective-os/segment-analysis";
import Image from "next/image";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type SimulationApiResult = {
  summary: SimulationResult;
  narrative: {
    headline: string;
    explanation: string;
  } | null;
  simulationTrace?: SimulationTraceEntry[];
  weights: {
    baseScore: number;
    ideology: {
      Right: number;
      Left: number;
      Apolitical: number;
      Other: number;
    };
    income: {
      Low: number;
      Medium: number;
      High: number;
    };
    education: {
      Basic: number;
      Secondary: number;
      Higher: number;
    };
    areaType: {
      Urban: number;
      Suburban: number;
      Rural: number;
    };
    trust: {
      Low: number;
      Medium: number;
      High: number;
    };
    adoption: {
      Early: number;
      Mainstream: number;
      Late: number;
    };
    priceSensitivity: {
      Low: number;
      Medium: number;
      High: number;
    };
    ageGroup: {
      "18-24": number;
      "25-39": number;
      "40-64": number;
      "65+": number;
    };
  };
};

export default function DashPage() {
  const [phase, setPhase] = useState<DashboardPhase>("setup");
  const [peopleCount, setPeopleCount] = useState(500);
  const [mapMode, setMapMode] = useState<MapMode>("satellite");
  const [simulationVersion, setSimulationVersion] = useState(1);
  const [people, setPeople] = useState<Person[]>([]);
  const [stats, setStats] = useState<ManualStats>(DEFAULT_STATS);
  const [stimulusForm, setStimulusForm] =
    useState<StimulusFormState>(DEFAULT_STIMULUS_FORM);
  const [simulationResult, setSimulationResult] =
    useState<SimulationResult>(DEFAULT_SIMULATION_RESULT);
  const [selectedBlocks, setSelectedBlocks] =
    useState<ParameterBlockId[]>(DEFAULT_PARAMETER_BLOCKS);
  const [isSimulating, setIsSimulating] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(true);

  const [simulationAnalysis, setSimulationAnalysis] =
    useState<SimulationAnalysis | null>(null);
  const [simulationNarrative, setSimulationNarrative] = useState<{
    headline: string;
    explanation: string;
  } | null>(null);

  const [simulationTrace, setSimulationTrace] = useState<SimulationTraceEntry[]>(
    []
  );
  const [operationalReview, setOperationalReview] =
    useState<OperationalReview | null>(null);
  const [hasPlayedTraceAnimation, setHasPlayedTraceAnimation] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    setHasMounted(true);

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const generated = generatePeopleInZurichShape(
      peopleCount,
      stats,
      simulationVersion
    );
    setPeople(generated);
  }, [peopleCount, stats, simulationVersion]);

  const updateScrollFades = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const atTop = scrollTop <= 2;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 2;

    setShowTopFade(!atTop);
    setShowBottomFade(!atBottom);
  };

  useEffect(() => {
    updateScrollFades();
  }, [phase]);

  const mapSrc = mapMode === "map" ? "/map.png" : "/satelite.png";
  const hasStarted = simulationVersion > 1;
  const showSentiment = phase === "results";

  const handlePrimaryAction = async () => {
    if (isSimulating) return;

    if (phase === "setup") {
      setSimulationVersion((prev) => prev + 1);
      setPhase("stimulus");
      return;
    }

    if (phase === "stimulus") {
      setIsSimulating(true);
      setSimulationTrace([]);
      setHasPlayedTraceAnimation(false);
      setOperationalReview(null);

      try {
        const res = await fetch("/api/simulate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            peopleCount,
            stats,
            stimulusForm,
            selectedBlocks,
          }),
        });

        if (!res.ok) {
          throw new Error("Simulation request failed");
        }

        const result: SimulationApiResult = await res.json();

        const normalizedResult = {
          ...result,
          narrative: result.narrative ?? {
            headline: "",
            explanation: "",
          },
        };

        const scoredPeople = applySimulationScoresToPeople(
          people,
          normalizedResult,
          selectedBlocks
        );

        const computedAnalysis = analyzeSimulation(scoredPeople, selectedBlocks);

        let reviewData: OperationalReview | null = null;

        const reviewPayload = {
          stimulusType: stimulusForm.type,
          tone: stimulusForm.tone,
          channel: stimulusForm.channel,
          selectedBlocks,
          narrativeHeadline: result.narrative?.headline ?? "",
          summary: result.summary,
          analysis: {
            polarization: computedAnalysis.polarization,
            topSupportiveSegments: computedAnalysis.topSupportiveSegments.map(
              (segment) => segment.label
            ),
            topResistantSegments: computedAnalysis.topResistantSegments.map(
              (segment) => segment.label
            ),
          },
        };

        try {
          const reviewRes = await fetch("/api/operational-review", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              payload: reviewPayload,
            }),
          });

          if (reviewRes.ok) {
            reviewData = await reviewRes.json();
          }
        } catch (reviewError) {
          console.error("Operational review request failed:", reviewError);
        }

        setSimulationResult(result.summary);
        setSimulationNarrative(result.narrative ?? null);
        setSimulationTrace(result.simulationTrace ?? []);
        setHasPlayedTraceAnimation(false);
        setPeople(scoredPeople);
        setSimulationAnalysis(computedAnalysis);
        setOperationalReview(reviewData);
        setPhase("results");
      } catch (error) {
        console.error(error);
      } finally {
        setIsSimulating(false);
      }

      return;
    }

    if (phase === "results") {
      setPhase("stimulus");
    }
  };

  const handleBack = () => {
    if (phase === "results") {
      setPhase("stimulus");
      return;
    }

    if (phase === "stimulus") {
      setPhase("setup");
    }
  };

  if (!hasMounted) return null;

  if (isMobile) {
    return (
      <main
        className={`flex min-h-screen items-center justify-center bg-[#f7f7f4] px-6 ${ibmPlexMono.className}`}
      >
        <div className="max-w-md text-center">
          <div className="relative mb-10 h-14 w-full overflow-hidden">
            <Image
              src="/cos-logo.png"
              alt="COS logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-md uppercase text-neutral-900">
            Available on desktop only
          </h1>
          <p className="mt-3 text-xs text-neutral-600">
            This demo is currently not available on mobile. To access it, open
            the platform from a desktop computer.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen overflow-hidden bg-neutral-50 p-4 md:p-6">
      <div className="mx-auto grid h-full max-w-425 grid-cols-1 gap-4 lg:grid-cols-[800px_minmax(0,1fr)]">
        <DashboardSidebar
          phase={phase}
          peopleCount={peopleCount}
          setPeopleCount={setPeopleCount}
          stats={stats}
          setStats={setStats}
          scrollRef={scrollRef}
          showTopFade={showTopFade}
          showBottomFade={showBottomFade}
          updateScrollFades={updateScrollFades}
          hasStarted={hasStarted}
          onPrimaryAction={handlePrimaryAction}
          onBack={handleBack}
          accent={ACCENT}
          stimulusForm={stimulusForm}
          setStimulusForm={setStimulusForm}
          simulationResult={simulationResult}
          selectedBlocks={selectedBlocks}
          setSelectedBlocks={setSelectedBlocks}
          isSimulating={isSimulating}
          operationalReview={operationalReview}
        />

        <MapPanel
          mapMode={mapMode}
          setMapMode={setMapMode}
          mapSrc={mapSrc}
          people={people}
          showSentiment={showSentiment}
          form={stimulusForm}
          narrative={simulationNarrative?.explanation}
          analysis={simulationAnalysis ?? undefined}
          simulationTrace={simulationTrace}
          hasPlayedTraceAnimation={hasPlayedTraceAnimation}
          setHasPlayedTraceAnimation={setHasPlayedTraceAnimation}
        />
      </div>
    </main>
  );
}