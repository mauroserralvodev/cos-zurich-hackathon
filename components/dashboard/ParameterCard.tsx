"use client";

import { ReactNode } from "react";

type ParameterCardProps = {
  children: ReactNode;
  className?: string;
};

export default function ParameterCard({
  children,
  className = "",
}: ParameterCardProps) {
  return (
    <div className={`rounded-3xl border border-black/7 bg-neutral-50 p-6 ${className}`}>
      {children}
    </div>
  );
}