"use client";

import { useEffect, useCallback } from "react";
import StatsChart from "./StatsChart";
import TypeBadge from "./TypeBadge";
import { getTypeColor } from "@/lib/typeColors";
import type { Pokemon } from "@/types/pokemon";

interface StatsModalProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export default function StatsModal({ pokemon, onClose }: StatsModalProps) {
  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const color = getTypeColor(primaryType);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const heightM = (pokemon.height / 10).toFixed(1);
  const weightKg = (pokemon.weight / 10).toFixed(1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/10 dark:bg-white/10
            flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 transition"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className={`bg-gradient-to-br ${color.gradient} rounded-t-3xl p-6 pb-12 text-center`}>
          <p className="text-white/60 text-sm font-mono mb-1">
            #{String(pokemon.id).padStart(3, "0")}
          </p>
          <h2 className="text-3xl font-bold text-white capitalize drop-shadow-sm">
            {pokemon.name.replace(/-/g, " ")}
          </h2>
          <div className="flex justify-center gap-2 mt-3">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>
        </div>

        <div className="-mt-8 px-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-center gap-10 mb-6 text-sm">
              <div className="text-center">
                <p className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide">Height</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{heightM}m</p>
              </div>
              <div className="w-px bg-gray-200 dark:bg-gray-600" />
              <div className="text-center">
                <p className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wide">Weight</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{weightKg}kg</p>
              </div>
            </div>

            <StatsChart pokemon={pokemon} typeColor={color.statBar} />
          </div>
        </div>

        <div className="p-6 pt-4">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400
              hover:bg-gray-200 dark:hover:bg-gray-700 transition font-medium text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
