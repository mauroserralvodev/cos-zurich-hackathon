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
import { generatePeopleInZurichShape } from "@/lib/collective-os/simulation";
import type {
  DashboardPhase,
  ManualStats,
  MapMode,
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

  const ideologyTotal =
    stats.right + stats.left + stats.apolitical + stats.other;

  const incomeTotal =
    stats.lowIncome + stats.mediumIncome + stats.highIncome;

  const ageTotal =
    stats.age18_24 + stats.age25_39 + stats.age40_64 + stats.age65Plus;

  const educationTotal =
    stats.basicEducation + stats.secondaryEducation + stats.higherEducation;

  const areaTotal = stats.urban + stats.suburban + stats.rural;
  const trustTotal = stats.lowTrust + stats.mediumTrust + stats.highTrust;
  const adoptionTotal =
    stats.earlyAdopters + stats.mainstreamAdopters + stats.lateAdopters;

  const priceSensitivityTotal =
    stats.lowPriceSensitivity +
    stats.mediumPriceSensitivity +
    stats.highPriceSensitivity;

  const mapSrc = mapMode === "map" ? "/map.png" : "/satelite.png";
  const hasStarted = simulationVersion > 1;

  const handlePrimaryAction = () => {
    if (phase === "setup") {
      setSimulationVersion((prev) => prev + 1);
      setPhase("stimulus");
      return;
    }

    setSimulationResult({
      publicAcceptance: 74,
      purchaseIntent: 48,
      trustImpact: 62,
      virality: 69,
      negativeReaction: 19,
    });
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
          ageTotal={ageTotal}
          incomeTotal={incomeTotal}
          educationTotal={educationTotal}
          areaTotal={areaTotal}
          ideologyTotal={ideologyTotal}
          trustTotal={trustTotal}
          adoptionTotal={adoptionTotal}
          priceSensitivityTotal={priceSensitivityTotal}
          hasStarted={hasStarted}
          onPrimaryAction={handlePrimaryAction}
          accent={ACCENT}
          stimulusForm={stimulusForm}
          setStimulusForm={setStimulusForm}
          simulationResult={simulationResult}
        />

        <MapPanel
          mapMode={mapMode}
          setMapMode={setMapMode}
          mapSrc={mapSrc}
          people={people}
        />
      </div>
    </main>
  );
}