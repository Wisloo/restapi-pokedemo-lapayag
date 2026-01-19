"use client";
import { useState } from "react";
import StatsChart from "./StatsChart";

export default function PokemonCard({ pokemon }) {
  const [showStats, setShowStats] = useState(false);

  return (
    <div className="border rounded shadow p-4 bg-white text-gray-900">
      <img src={pokemon.sprites.front_default} className="h-24 mx-auto" />
      
      <h3 className="text-lg font-semibold text-center capitalize text-gray-900">
        {pokemon.name}
      </h3>
      
      <p className="text-center text-sm text-gray-600">
        Type: {pokemon.types.map(t => t.type.name).join(", ")}
      </p>

      <button
        onClick={() => setShowStats(!showStats)}
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded w-full"
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