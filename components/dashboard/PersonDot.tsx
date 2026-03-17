"use client";

import type { Person } from "@/lib/collective-os/types";

type PersonDotProps = {
  person: Person;
  showSentiment?: boolean;
};

function getDotColor(person: Person, showSentiment: boolean) {
  if (!showSentiment) return "#A3A3A3";
  if (person.sentiment >= 67) return "#22C55E";
  if (person.sentiment >= 40) return "#EAB308";
  return "#EF4444";
}

function getSentimentTextColor(sentiment: number) {
  if (sentiment >= 67) return "text-green-600";
  if (sentiment >= 40) return "text-yellow-600";
  return "text-red-600";
}

export default function PersonDot({
  person,
  showSentiment = false,
}: PersonDotProps) {
  return (
    <div
      className="group absolute hover:z-1000"
      style={{
        left: `${person.x}%`,
        top: `${person.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="h-2.5 w-2.5 rounded-full border border-white shadow-sm transition duration-200 group-hover:scale-150"
        style={{ backgroundColor: getDotColor(person, showSentiment) }}
      />

      <div className="absolute left-1/2 top-4 z-999 hidden w-72 -translate-x-1/2 rounded-2xl border border-black/10 bg-white p-3 text-xs text-neutral-700 shadow-xl group-hover:block">
        <p className="mb-2 text-sm font-semibold text-neutral-900">
          {person.name}
        </p>

        <div className="mb-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
          <p>
            <span className="text-neutral-500">Age:</span> {person.age}
          </p>
          <p>
            <span className="text-neutral-500">Group:</span> {person.ageGroup}
          </p>
          <p>
            <span className="text-neutral-500">Ideology:</span> {person.ideology}
          </p>
          <p>
            <span className="text-neutral-500">Income:</span> {person.income}
          </p>
          <p>
            <span className="text-neutral-500">Education:</span> {person.education}
          </p>
          <p>
            <span className="text-neutral-500">Area:</span> {person.areaType}
          </p>
          <p>
            <span className="text-neutral-500">Trust:</span> {person.trust}
          </p>
          <p>
            <span className="text-neutral-500">Adoption:</span> {person.adoption}
          </p>
          <p>
            <span className="text-neutral-500">Price sens.:</span>{" "}
            {person.priceSensitivity}
          </p>
          <p>
            <span className="text-neutral-500">Zone:</span> {person.zoneType}
          </p>
          <p>
            <span className="text-neutral-500">Sentiment:</span>{" "}
            <span className={getSentimentTextColor(person.sentiment)}>
              {person.sentimentLabel}
            </span>
          </p>
          <p>
            <span className="text-neutral-500">Score:</span> {person.sentiment}%
          </p>
        </div>

        <button
          type="button"
          className="h-9 w-full cursor-pointer rounded-xl border border-black/10 bg-neutral-50 px-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100"
        >
          View opinion
        </button>
      </div>
    </div>
  );
}