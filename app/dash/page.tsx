"use client";

import { useEffect, useRef, useState } from "react";
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
  ParameterBlockId,
  Person,
  SimulationResult,
  StimulusFormState,
} from "@/lib/collective-os/types";

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
  }, []);

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

        const result = await res.json();
        console.log("SIMULATION RESULT:", result);

        setSimulationResult(result.summary);
        setPeople((prev) =>
          applySimulationScoresToPeople(prev, result, selectedBlocks)
        );
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
        />

        <MapPanel
          mapMode={mapMode}
          setMapMode={setMapMode}
          mapSrc={mapSrc}
          people={people}
          showSentiment={showSentiment}
        />
      </div>
    </main>
  );
}