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

/** Masse et index de base par immatriculation et configuration d'equipage.
 *  Source : Tableau des versions PAX, MANEX partie B6 (annexe B6-02 Rev 57, 13/06/2026). */
export interface AircraftVersion {
  dowLbs: number;
  dowKg: number;
  doi: number;
}

export const AIRCRAFT_VERSIONS: Record<string, Record<string, AircraftVersion>> = {
  FGLND: {
    "2/0": { dowLbs: 10937, dowKg: 4961, doi: 40.27 },
    "2/1": { dowLbs: 11102, dowKg: 5036, doi: 35.15 },
    "2/2": { dowLbs: 11268, dowKg: 5111, doi: 31.42 },
    "3/0": { dowLbs: 11125, dowKg: 5046, doi: 34.46 },
    "3/1": { dowLbs: 11290, dowKg: 5121, doi: 30.74 },
  },
  FGLNE: {
    "2/0": { dowLbs: 11206, dowKg: 5083, doi: 22.32 },
    "2/1": { dowLbs: 11371, dowKg: 5158, doi: 17.20 },
    "2/2": { dowLbs: 11537, dowKg: 5233, doi: 13.47 },
    "3/0": { dowLbs: 11393, dowKg: 5168, doi: 16.51 },
    "3/1": { dowLbs: 11559, dowKg: 5243, doi: 12.79 },
  },
  FGLNF: {
    "2/0": { dowLbs: 11252, dowKg: 5104, doi: 27.33 },
    "2/1": { dowLbs: 11418, dowKg: 5179, doi: 22.21 },
    "2/2": { dowLbs: 11583, dowKg: 5254, doi: 18.48 },
    "3/0": { dowLbs: 11440, dowKg: 5189, doi: 21.52 },
    "3/1": { dowLbs: 11605, dowKg: 5264, doi: 17.80 },
  },
  FGLNH: {
    "2/0": { dowLbs: 10913, dowKg: 4950, doi: 38.13 },
    "2/1": { dowLbs: 11078, dowKg: 5025, doi: 33.01 },
    "2/2": { dowLbs: 11244, dowKg: 5100, doi: 29.28 },
    "3/0": { dowLbs: 11100, dowKg: 5035, doi: 32.32 },
    "3/1": { dowLbs: 11266, dowKg: 5110, doi: 28.60 },
  },
  FGLNK: {
    "2/0": { dowLbs: 11067, dowKg: 5020, doi: 41.15 },
    "2/1": { dowLbs: 11233, dowKg: 5095, doi: 36.03 },
    "2/2": { dowLbs: 11398, dowKg: 5170, doi: 32.30 },
    "3/0": { dowLbs: 11255, dowKg: 5105, doi: 35.34 },
    "3/1": { dowLbs: 11420, dowKg: 5180, doi: 31.62 },
  },
  FGOPE: {
    "2/0": { dowLbs: 10942, dowKg: 4963, doi: 38.42 },
    "2/1": { dowLbs: 11107, dowKg: 5038, doi: 33.30 },
    "2/2": { dowLbs: 11272, dowKg: 5113, doi: 29.57 },
    "3/0": { dowLbs: 11129, dowKg: 5048, doi: 32.61 },
    "3/1": { dowLbs: 11294, dowKg: 5123, doi: 28.89 },
  },
  FGRYL: {
    "2/0": { dowLbs: 11244, dowKg: 5100, doi: 37.06 },
    "2/1": { dowLbs: 11409, dowKg: 5175, doi: 31.94 },
    "2/2": { dowLbs: 11574, dowKg: 5250, doi: 28.21 },
    "3/0": { dowLbs: 11431, dowKg: 5185, doi: 31.25 },
    "3/1": { dowLbs: 11596, dowKg: 5260, doi: 27.53 },
  },
  FGTKJ: {
    "2/0": { dowLbs: 11385, dowKg: 5164, doi: 28.61 },
    "2/1": { dowLbs: 11550, dowKg: 5239, doi: 23.49 },
    "2/2": { dowLbs: 11715, dowKg: 5314, doi: 19.76 },
    "3/0": { dowLbs: 11572, dowKg: 5249, doi: 22.80 },
    "3/1": { dowLbs: 11737, dowKg: 5324, doi: 19.08 },
  },
  FGTVC: {
    "2/0": { dowLbs: 11305, dowKg: 5128, doi: 26.55 },
    "2/1": { dowLbs: 11471, dowKg: 5203, doi: 21.43 },
    "2/2": { dowLbs: 11636, dowKg: 5278, doi: 17.70 },
    "3/0": { dowLbs: 11493, dowKg: 5213, doi: 20.74 },
    "3/1": { dowLbs: 11658, dowKg: 5288, doi: 17.02 },
  },
  FGUME: {
    "2/0": { dowLbs: 11125, dowKg: 5046, doi: 40.93 },
    "2/1": { dowLbs: 11290, dowKg: 5121, doi: 35.81 },
    "2/2": { dowLbs: 11455, dowKg: 5196, doi: 32.08 },
    "3/0": { dowLbs: 11312, dowKg: 5131, doi: 35.12 },
    "3/1": { dowLbs: 11477, dowKg: 5206, doi: 31.40 },
  },
  FGUPE: {
    "2/0": { dowLbs: 10917, dowKg: 4952, doi: 34.38 },
    "2/1": { dowLbs: 11083, dowKg: 5027, doi: 29.26 },
    "2/2": { dowLbs: 11248, dowKg: 5102, doi: 25.53 },
    "3/0": { dowLbs: 11105, dowKg: 5037, doi: 28.57 },
    "3/1": { dowLbs: 11270, dowKg: 5112, doi: 24.85 },
  },
  FHAPE: {
    "2/0": { dowLbs: 11239, dowKg: 5098, doi: 25.90 },
    "2/1": { dowLbs: 11405, dowKg: 5173, doi: 20.78 },
    "2/2": { dowLbs: 11570, dowKg: 5248, doi: 17.05 },
    "3/0": { dowLbs: 11427, dowKg: 5183, doi: 20.09 },
    "3/1": { dowLbs: 11592, dowKg: 5258, doi: 16.37 },
  },
  FHTJT: {
    "2/0": { dowLbs: 11008, dowKg: 4993, doi: 35.71 },
    "2/1": { dowLbs: 11173, dowKg: 5068, doi: 30.59 },
    "2/2": { dowLbs: 11338, dowKg: 5143, doi: 26.86 },
    "3/0": { dowLbs: 11195, dowKg: 5078, doi: 29.90 },
    "3/1": { dowLbs: 11360, dowKg: 5153, doi: 26.18 },
  },
};

export const REGISTRATIONS = Object.keys(AIRCRAFT_VERSIONS);

export function registrationLabel(code: string): string {
  return "F-" + code.slice(1);
}

function normalizeCrewKey(crew: string): string {
  return crew.replace(/\s+/g, "");
}

export function findAircraftVersion(immat: string, crew: string): AircraftVersion | null {
  const row = AIRCRAFT_VERSIONS[immat.trim().toUpperCase()];
  if (!row) return null;
  return row[normalizeCrewKey(crew)] ?? null;
}

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
  const immat = v.immat.trim().toUpperCase();
  const lines = [
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
  ];
  const version = findAircraftVersion(immat, v.crew);
  if (version) {
    lines.push(
      "",
      `DOW : ${formatThousands(version.dowKg)} KG (${formatThousands(version.dowLbs)} LBS)`,
      `DOI : ${version.doi.toFixed(2)}`,
    );
  }
  return lines.join("\n");
}
