// lib/collective-os/distribution.ts
export function clampPercentage(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function roundAndFixTotal(values: number[], target = 100) {
  const rounded = values.map((v) => Math.round(v));
  let diff = target - rounded.reduce((a, b) => a + b, 0);

  if (diff === 0) return rounded;

  const indexed = values
    .map((value, index) => ({
      index,
      decimal: value - Math.floor(value),
    }))
    .sort((a, b) => b.decimal - a.decimal);

  let i = 0;

  while (diff !== 0 && indexed.length > 0) {
    const idx = indexed[i % indexed.length].index;

    if (diff > 0) {
      rounded[idx] += 1;
      diff -= 1;
    } else if (rounded[idx] > 0) {
      rounded[idx] -= 1;
      diff += 1;
    }

    i++;
  }

  return rounded;
}

export function rebalanceDistribution<
  T extends Record<string, number>,
  K extends keyof T
>(
  current: T,
  changedKey: K,
  newValue: number,
  keys: readonly K[],
  total = 100
): T {
  const safeValue = clampPercentage(newValue);
  const otherKeys = keys.filter((key) => key !== changedKey);

  const next = { ...current };
  next[changedKey] = safeValue as T[K];

  const remaining = total - safeValue;

  if (otherKeys.length === 0) {
    return next;
  }

  const currentOthersTotal = otherKeys.reduce(
    (sum, key) => sum + Math.max(0, current[key]),
    0
  );

  let redistributed: number[];

  if (currentOthersTotal === 0) {
    const even = remaining / otherKeys.length;
    redistributed = roundAndFixTotal(otherKeys.map(() => even), remaining);
  } else {
    redistributed = roundAndFixTotal(
      otherKeys.map(
        (key) => (Math.max(0, current[key]) / currentOthersTotal) * remaining
      ),
      remaining
    );
  }

  otherKeys.forEach((key, index) => {
    next[key] = redistributed[index] as T[K];
  });

  return next;
}

export function equalizeDistribution<
  T extends Record<string, number>,
  K extends keyof T
>(current: T, keys: readonly K[], total = 100): T {
  const even = total / keys.length;
  const values = roundAndFixTotal(keys.map(() => even), total);
  const next = { ...current };

  keys.forEach((key, index) => {
    next[key] = values[index] as T[K];
  });

  return next;
}