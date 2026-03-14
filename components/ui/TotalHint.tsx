"use client";

type TotalHintProps = {
  total: number;
  className?: string;
};

export default function TotalHint({
  total,
  className = "mt-2",
}: TotalHintProps) {
  return (
    <p
      className={`${className} text-xs ${
        total === 100 ? "text-neutral-500" : "text-red-500"
      }`}
    >
      Total: {total}%
    </p>
  );
}