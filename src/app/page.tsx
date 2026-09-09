"use client";

import { useMemo, useState } from "react";
import { generateFuelMail, GPU_FUEL_PRESETS, REGISTRATIONS, registrationLabel } from "@/lib/fuel";

const CUSTOM = "__custom__";

function WeightField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-0.5">
      <span className="text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {label}
      </span>
      <input
        className="rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-2 py-1 text-sm"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

export default function FuelPage() {
  const [rtow, setRtow] = useState("");
  const [block, setBlock] = useState("");
  const [taxi, setTaxi] = useState("");
  const [trip, setTrip] = useState("");
  const [crew, setCrew] = useState("");
  const [immat, setImmat] = useState("");
  const [preset, setPreset] = useState<string>(GPU_FUEL_PRESETS[0].value);
  const [customText, setCustomText] = useState("");
  const [copied, setCopied] = useState(false);

  const gpuFuelLine = preset === CUSTOM ? customText : preset;

  const mail = useMemo(
    () => generateFuelMail({ rtow, block, taxi, trip, crew, immat, gpuFuel: gpuFuelLine }),
    [rtow, block, taxi, trip, crew, immat, gpuFuelLine],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(mail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Copie impossible (presse-papier non autorise).");
    }
  };

  const reset = () => {
    setRtow("");
    setBlock("");
    setTaxi("");
    setTrip("");
    setCrew("");
    setImmat("");
    setPreset(GPU_FUEL_PRESETS[0].value);
    setCustomText("");
    setCopied(false);
  };

  return (
    <main className="mx-auto max-w-2xl p-4 pb-24">
      <header className="mb-4">
        <h1 className="text-lg font-semibold">Mail fuel — service trafic</h1>
        <p className="text-sm text-neutral-500">
          Saisis les poids fuel en LBS : la conversion en KG est automatique et la valeur LBS
          reste affichee entre parentheses pour verification. Rien n&apos;est pre-rempli, pour
          eviter de renvoyer une ancienne valeur par erreur.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <section className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3">
          <h2 className="mb-2 text-sm font-semibold">Fuel (LBS)</h2>
          <div className="grid grid-cols-2 gap-3">
            <WeightField label="RTOW" value={rtow} onChange={setRtow} placeholder="ex: 16950 ou N/A" />
            <WeightField label="BLOCK" value={block} onChange={setBlock} placeholder="ex: 1633" />
            <WeightField label="TAXI" value={taxi} onChange={setTaxi} placeholder="ex: 50" />
            <WeightField label="TRIP" value={trip} onChange={setTrip} placeholder="ex: 574" />
          </div>
        </section>

        <section className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3">
          <h2 className="mb-2 text-sm font-semibold">Equipage et avion</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-0.5">
              <span className="text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Crew
              </span>
              <input
                className="rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-2 py-1 text-sm"
                value={crew}
                onChange={(e) => setCrew(e.target.value)}
                placeholder="2/1"
              />
            </label>
            <label className="flex flex-col gap-0.5">
              <span className="text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Immatriculation
              </span>
              <select
                className="rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-2 py-1 text-sm"
                value={immat}
                onChange={(e) => setImmat(e.target.value)}
              >
                <option value="" disabled>
                  — sélectionner —
                </option>
                {REGISTRATIONS.map((code) => (
                  <option key={code} value={code}>
                    {registrationLabel(code)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3">
          <h2 className="mb-2 text-sm font-semibold">GPU / fuel au sol</h2>
          <select
            className="w-full rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-2 py-1 text-sm"
            value={preset}
            onChange={(e) => setPreset(e.target.value)}
          >
            {GPU_FUEL_PRESETS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
            <option value={CUSTOM}>Personnalise…</option>
          </select>
          {preset === CUSTOM && (
            <textarea
              className="mt-2 w-full rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-2 py-1 text-sm"
              rows={2}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="GPU + FUEL"
            />
          )}
        </section>

        <section className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3">
          <h2 className="mb-2 text-sm font-semibold">Apercu du mail</h2>
          <pre className="whitespace-pre-wrap rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-3 text-sm font-mono">
            {mail}
          </pre>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur p-3">
        <div className="mx-auto flex max-w-2xl flex-wrap items-center gap-2 text-sm">
          <button
            type="button"
            onClick={copy}
            className="rounded bg-blue-600 px-3 py-1.5 font-medium text-white"
          >
            {copied ? "Copie !" : "Copier le mail"}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded border border-neutral-300 dark:border-neutral-700 px-3 py-1.5"
          >
            Reinitialiser
          </button>
        </div>
      </div>
    </main>
  );
}
