"use client";

import { useState } from "react";
import Search from "./Search";
import PokemonCard from "./PokemonCard";
import StatsChart from "./StatsChart";
import { useDebounce } from "@/app/hooks/useDebounce";
import type { Pokemon } from "@/types/pokemon";

interface ClientWrapperProps {
  data: Pokemon[];
}

export default function ClientWrapper({ data }: ClientWrapperProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const filtered = data.filter((p) =>
    p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <>
      <Search onSearch={setQuery} />

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No Pokemon found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>

      {filtered.length === 1 && (
        <>
          <h3 className="text-xl font-semibold mt-6">Stats Chart</h3>
          <StatsChart pokemon={filtered[0]} />
        </>
      )}
    </>
  );
}
