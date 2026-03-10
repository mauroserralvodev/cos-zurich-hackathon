"use client";

import { ACCENT } from "@/lib/collective-os/constants";
import type { Person } from "@/lib/collective-os/types";

type PersonDotProps = {
  person: Person;
};

export default function PersonDot({ person }: PersonDotProps) {
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
        style={{ backgroundColor: ACCENT }}
      />

      <div className="pointer-events-none absolute left-1/2 top-4 z-999 hidden w-64 -translate-x-1/2 rounded-2xl border border-black/10 bg-white p-3 text-xs text-neutral-700 shadow-xl group-hover:block">
        <p className="mb-2 text-sm font-semibold text-neutral-900">
          {person.name}
        </p>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
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
            <span className="text-neutral-500">Cluster:</span> ZH-{person.id}
          </p>
        </div>
      </div>
    </div>
  );
}