const LBS_TO_KG = 0.45359237;

export function isNA(input: string): boolean {
  return /^n\/?a$/i.test(input.trim());
}

/** Parse un poids saisi en LBS (accepte les espaces de separation de milliers). */
export function parseWeightLbs(input: string): number | null {
  const cleaned = input.replace(/[^\d.,]/g, "").replace(",", ".");
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function lbsToKg(lbs: number): number {
  return Math.round(lbs * LBS_TO_KG);
}

/** Formate un nombre entier avec des espaces comme separateur de milliers (style FR). */
export function formatThousands(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** Construit une ligne "LABEL : xxx KG (yyy LBS)" a partir d'une saisie en LBS. */
export function formatWeightLine(label: string, rawLbs: string): string {
  const trimmed = rawLbs.trim();
  if (!trimmed) return `${label} : `;
  if (isNA(trimmed)) return `${label} : N/A KG`;
  const lbs = parseWeightLbs(trimmed);
  if (lbs == null) return `${label} : ${trimmed}`;
  return `${label} : ${formatThousands(lbsToKg(lbs))} KG (${formatThousands(lbs)} LBS)`;
}

export const GPU_FUEL_PRESETS = [
  { value: "GPU\nNO FUEL", label: "GPU seul (pas de fuel)" },
  { value: "GPU + FUEL", label: "GPU + fuel" },
  { value: "NO GPU\nNO FUEL", label: "Ni GPU ni fuel" },
] as const;

export interface FuelMailValues {
  rtow: string;
  block: string;
  taxi: string;
  trip: string;
  crew: string;
  immat: string;
  gpuFuel: string;
}

export function generateFuelMail(v: FuelMailValues): string {
  const immat = v.immat.trim().replace(/[\s-]/g, "").toUpperCase();
  return [
    "Hello,",
    "",
    formatWeightLine("RTOW", v.rtow),
    formatWeightLine("BLOCK", v.block),
    formatWeightLine("TAXI", v.taxi),
    formatWeightLine("TRIP", v.trip),
    `CREW : ${v.crew.trim()}`,
    immat,
    "",
    v.gpuFuel,
  ].join("\n");
}
