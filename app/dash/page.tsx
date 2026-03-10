"use client";

import { Map, Satellite } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Person = {
  id: number;
  name: string;
  age: number;
  ideology: "Right" | "Left" | "Apolitical" | "Other";
  income: "Low" | "Medium" | "High";
  familyStatus: "Single" | "Couple" | "Family";
  x: number;
  y: number;
};

type ManualStats = {
  right: number;
  left: number;
  apolitical: number;
  other: number;
  lowIncome: number;
  mediumIncome: number;
  highIncome: number;
};

const ACCENT = "#FF5500";

const ZURICH_PATH = `M578 95L585 51L602.5 68.5L627 40L612 11.5L652 0L718 40L746.5 95L764 153L845 179.5L983 142L995.5 104.5H1030.5V142L1079 159.5L1052.5 262.5L1030.5 312.5L995.5 299L898.5 240.5V341L1038 371L1098.5 401.5L1142 441L1112 460.5L1089.5 464L1122 535.5L1242 559L1248 612L1224 750.5L1283 861H1333.5V888H1283L1260 968.527L1322 998L1356.5 1050.5L1428 1154.5L1443.5 1249.5L1428 1294L1333.5 1346L1368 1381.5L1333.5 1436L1175 1493H1038L984 1526H824.5L586.5 1381.5L465.5 1165.5L423 1083.5V1201.59L555 1448.5L677.5 1481.5L824.5 1634L767 1663.5V1756.5L721.5 1784.5L619.5 1731.5L515.5 1590L287.5 1618L138.5 1566L69 1346L218.5 1201.59L129 1228.5L13 968.527L47 851L13 703L0 612L129 483L140 422L309.5 385.5L297 357.5H234L218.5 312.5L372.5 200L489 262.5L452.5 341V472L465.5 464L517 349.5L553 299V179.5L578 95Z`;

const VIEWBOX_WIDTH = 1443.5;
const VIEWBOX_HEIGHT = 1784.5;

const sampleNames = [
  "Luca Meier",
  "Anna Keller",
  "Noah Weber",
  "Mia Schmid",
  "Elias Frei",
  "Lea Baumann",
  "Jonas Huber",
  "Nina Steiner",
  "David Brunner",
  "Sofia Vogel",
  "Lina Graf",
  "Jan Roth",
  "Clara Ziegler",
  "Leo Koch",
  "Emma Hofmann",
  "Paul Zimmermann",
];

function clampPercentage(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

function createSeededRandom(seed: number) {
  let s = seed >>> 0;
  return function () {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function buildSeed(
  peopleCount: number,
  stats: ManualStats,
  simulationVersion: number
) {
  const raw = [
    peopleCount,
    stats.right,
    stats.left,
    stats.apolitical,
    stats.other,
    stats.lowIncome,
    stats.mediumIncome,
    stats.highIncome,
    simulationVersion,
  ].join("-");

  let hash = 2166136261;
  for (let i = 0; i < raw.length; i++) {
    hash ^= raw.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pickWeightedIdeology(
  stats: ManualStats,
  random: () => number
): Person["ideology"] {
  const total = stats.right + stats.left + stats.apolitical + stats.other;
  if (total <= 0) return "Apolitical";

  const rand = random() * total;

  if (rand < stats.right) return "Right";
  if (rand < stats.right + stats.left) return "Left";
  if (rand < stats.right + stats.left + stats.apolitical) return "Apolitical";
  return "Other";
}

function pickWeightedIncome(
  stats: ManualStats,
  random: () => number
): Person["income"] {
  const total = stats.lowIncome + stats.mediumIncome + stats.highIncome;
  if (total <= 0) return "Medium";

  const rand = random() * total;

  if (rand < stats.lowIncome) return "Low";
  if (rand < stats.lowIncome + stats.mediumIncome) return "Medium";
  return "High";
}

function randomFamilyStatus(random: () => number): Person["familyStatus"] {
  const statuses: Person["familyStatus"][] = ["Single", "Couple", "Family"];
  return statuses[Math.floor(random() * statuses.length)];
}

function randomAge(random: () => number) {
  return Math.floor(random() * 52) + 18;
}

function randomName(index: number) {
  return sampleNames[index % sampleNames.length];
}

function generatePeopleInZurichShape(
  count: number,
  stats: ManualStats,
  simulationVersion: number
): Person[] {
  if (typeof window === "undefined") return [];

  const canvas = document.createElement("canvas");
  canvas.width = VIEWBOX_WIDTH;
  canvas.height = VIEWBOX_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  const path = new Path2D(ZURICH_PATH);
  const seed = buildSeed(count, stats, simulationVersion);
  const random = createSeededRandom(seed);

  const people: Person[] = [];
  let attempts = 0;
  const maxAttempts = count * 100;

  while (people.length < count && attempts < maxAttempts) {
    attempts++;

    const px = random() * VIEWBOX_WIDTH;
    const py = random() * VIEWBOX_HEIGHT;

    if (!ctx.isPointInPath(path, px, py)) continue;

    people.push({
      id: people.length + 1,
      name: randomName(people.length),
      age: randomAge(random),
      ideology: pickWeightedIdeology(stats, random),
      income: pickWeightedIncome(stats, random),
      familyStatus: randomFamilyStatus(random),
      x: (px / VIEWBOX_WIDTH) * 78,
      y: (py / VIEWBOX_HEIGHT) * 80,
    });
  }

  return people;
}

function StatInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-neutral-600">{label}</label>
      <input
        type="number"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(clampPercentage(Number(e.target.value)))}
        className="h-11 mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-neutral-900 outline-none transition focus:border-black/20"
      />
    </div>
  );
}

function PersonDot({ person }: { person: Person }) {
  return (
    <div
      className="group absolute z-10 hover:z-999"
      style={{
        left: `${person.x}%`,
        top: `${person.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="h-2.5 w-2.5 rounded-full border border-white shadow-sm transition duration-200 group-hover:scale-150"
        style={{ backgroundColor: ACCENT }}
      />

      <div className="pointer-events-none absolute left-1/2 top-4 z-999 hidden w-56 -translate-x-1/2 rounded-2xl border border-black/10 bg-white p-3 text-xs text-neutral-700 shadow-xl group-hover:block">
        <p className="mb-1 text-sm font-semibold text-neutral-900">{person.name}</p>
        <div className="space-y-1">
          <p>
            <span className="text-neutral-500">Age:</span> {person.age}
          </p>
          <p>
            <span className="text-neutral-500">Ideology:</span> {person.ideology}
          </p>
          <p>
            <span className="text-neutral-500">Income:</span> {person.income}
          </p>
          <p>
            <span className="text-neutral-500">Household:</span> {person.familyStatus}
          </p>
          <p>
            <span className="text-neutral-500">Cluster ID:</span> ZH-{person.id}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DashPage() {
  const [peopleCount, setPeopleCount] = useState(500);
  const [mapMode, setMapMode] = useState<"map" | "satellite">("satellite");
  const [simulationVersion, setSimulationVersion] = useState(1);
  const [people, setPeople] = useState<Person[]>([]);

  const [stats, setStats] = useState<ManualStats>({
    right: 40,
    left: 40,
    apolitical: 10,
    other: 10,
    lowIncome: 25,
    mediumIncome: 55,
    highIncome: 20,
  });

  useEffect(() => {
    const generated = generatePeopleInZurichShape(
      peopleCount,
      stats,
      simulationVersion
    );
    setPeople(generated);
  }, [peopleCount, stats, simulationVersion]);

  const ideologyTotal =
    stats.right + stats.left + stats.apolitical + stats.other;

  const incomeTotal =
    stats.lowIncome + stats.mediumIncome + stats.highIncome;

  const mapSrc = mapMode === "map" ? "/map.png" : "/satelite.png";
  const hasStarted = simulationVersion > 1;

  return (
    <main className="min-h-screen bg-white p-4 md:p-6">
      <div className="mx-auto grid max-w-400 grid-cols-1 gap-4 lg:grid-cols-[800px_minmax(0,1fr)]">
        <section className="p-5 md:p-6">
          <div className="mb-5 flex items-center">
            <div className="relative h-20 w-20 overflow-hidden">
              <Image
                src="/logo.png"
                alt="COS logo"
                fill
                className="object-contain p-1.5"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-black/10 bg-neutral-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-md font-medium text-neutral-900">
                  Population size
                </p>
                <span className="px-2.5 py-1 text-xs text-neutral-600">
                  {peopleCount.toLocaleString()} agents
                </span>
              </div>

              <input
                type="range"
                min={50}
                max={5000}
                step={50}
                value={peopleCount}
                onChange={(e) => setPeopleCount(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: ACCENT }}
              />

              <div className="mt-3">
                <input
                  type="number"
                  min={1}
                  max={5000}
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(Number(e.target.value))}
                  className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-neutral-900 outline-none focus:border-black/20"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-neutral-50 p-4">
              <div className="space-y-4">
                <div>
                  <p className="mb-3 text-md font-medium text-neutral-900">
                    Ideology
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    <StatInput
                      label="Right %"
                      value={stats.right}
                      onChange={(value) =>
                        setStats((prev) => ({ ...prev, right: value }))
                      }
                    />
                    <StatInput
                      label="Left %"
                      value={stats.left}
                      onChange={(value) =>
                        setStats((prev) => ({ ...prev, left: value }))
                      }
                    />
                    <StatInput
                      label="Apolitical %"
                      value={stats.apolitical}
                      onChange={(value) =>
                        setStats((prev) => ({ ...prev, apolitical: value }))
                      }
                    />
                    <StatInput
                      label="Other %"
                      value={stats.other}
                      onChange={(value) =>
                        setStats((prev) => ({ ...prev, other: value }))
                      }
                    />
                  </div>
                  <p
                    className={`mt-3 text-xs ${
                      ideologyTotal === 100 ? "text-neutral-500" : "text-red-500"
                    }`}
                  >
                    Total: {ideologyTotal}%
                  </p>
                </div>

                <div>
                  <p className="mb-3 text-md font-medium text-neutral-900">
                    Income
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <StatInput
                      label="Low %"
                      value={stats.lowIncome}
                      onChange={(value) =>
                        setStats((prev) => ({ ...prev, lowIncome: value }))
                      }
                    />
                    <StatInput
                      label="Medium %"
                      value={stats.mediumIncome}
                      onChange={(value) =>
                        setStats((prev) => ({ ...prev, mediumIncome: value }))
                      }
                    />
                    <StatInput
                      label="High %"
                      value={stats.highIncome}
                      onChange={(value) =>
                        setStats((prev) => ({ ...prev, highIncome: value }))
                      }
                    />
                  </div>
                  <p
                    className={`mt-3 text-xs ${
                      incomeTotal === 100 ? "text-neutral-500" : "text-red-500"
                    }`}
                  >
                    Total: {incomeTotal}%
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSimulationVersion((prev) => prev + 1)}
              className="h-12 w-full rounded-3xl px-4 text-sm font-medium text-white shadow-sm transition hover:opacity-95 cursor-pointer"
              style={{ backgroundColor: ACCENT }}
            >
              {hasStarted ? "Regenerate simulation" : "Start simulation"}
            </button>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-black/10 bg-white">
          <div className="relative h-210 w-full bg-neutral-50">
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
                className="relative h-full mt-44 ml-36"
                style={{ aspectRatio: `${VIEWBOX_WIDTH} / ${VIEWBOX_HEIGHT}` }}
              >
                {people.map((person) => (
                  <PersonDot key={person.id} person={person} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}