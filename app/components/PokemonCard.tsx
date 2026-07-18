"use client";
import { useState } from "react";
import Image from "next/image";
import StatsChart from "./StatsChart";
import type { Pokemon } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [showStats, setShowStats] = useState(false);

  return (
    <div className="border rounded shadow p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width={96}
        height={96}
        className="mx-auto"
        unoptimized
      />
      
      <h3 className="text-lg font-semibold text-center capitalize">
        {pokemon.name}
      </h3>
      
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Type: {pokemon.types.map((t) => t.type.name).join(", ")}
      </p>

      <button
        onClick={() => setShowStats(!showStats)}
        className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded w-full transition"
      >
        {showStats ? "Hide Stats" : "Show Stats"}
      </button>

      {showStats && (
        <div className="mt-4">
          <StatsChart pokemon={pokemon} />
        </div>
      )}
    </div>
  );
}
