"use client";

import Image from "next/image";
import TypeBadge from "./TypeBadge";
import { getTypeColor } from "@/lib/typeColors";
import type { Pokemon } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
}

export default function PokemonCard({ pokemon, onSelect }: PokemonCardProps) {
  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const color = getTypeColor(primaryType);
  const artwork =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default;

  return (
    <div
      onClick={() => onSelect(pokemon)}
      className={`group relative rounded-2xl bg-gradient-to-br ${color.gradient} p-5 cursor-pointer
        transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/10
        dark:hover:shadow-black/30 border border-white/20 dark:border-white/5`}
    >
      <div className="absolute top-3 right-3 text-white/30 dark:text-white/10 text-sm font-mono font-bold">
        #{String(pokemon.id).padStart(3, "0")}
      </div>

      <div className="relative w-28 h-28 mx-auto mb-3 drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
        <Image
          src={artwork}
          alt={pokemon.name}
          fill
          sizes="112px"
          className="object-contain"
          unoptimized
        />
      </div>

      <h3 className="text-lg font-bold text-center text-white capitalize drop-shadow-sm mb-2">
        {pokemon.name.replace(/-/g, " ")}
      </h3>

      <div className="flex justify-center gap-1.5 flex-wrap">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize
              bg-white/25 text-white backdrop-blur-sm"
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
