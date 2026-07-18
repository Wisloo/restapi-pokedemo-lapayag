"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Search from "./Search";
import PokemonCard from "./PokemonCard";
import StatsModal from "./StatsModal";
import SkeletonCard from "./SkeletonCard";
import { useDebounce } from "@/app/hooks/useDebounce";
import type { Pokemon } from "@/types/pokemon";

const BATCH_SIZE = 24;

export default function PokedexApp() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const debouncedQuery = useDebounce(query, 300);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchBatch = useCallback(async (currentOffset: number, append: boolean) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await fetch(`/api/pokemon?limit=${BATCH_SIZE}&offset=${currentOffset}`);
      if (!res.ok) throw new Error("Failed to fetch Pokemon");
      const data: Pokemon[] = await res.json();

      if (data.length < BATCH_SIZE) {
        setHasMore(false);
      }

      setAllPokemon((prev) => (append ? [...prev, ...data] : data));
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchBatch(0, false);
  }, [fetchBatch]);

  useEffect(() => {
    if (!hasMore || loadingMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          const nextOffset = offset + BATCH_SIZE;
          setOffset(nextOffset);
          fetchBatch(nextOffset, true);
        }
      },
      { rootMargin: "200px" }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [offset, hasMore, loadingMore, loading, fetchBatch]);

  const filtered = allPokemon.filter((p) =>
    p.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <>
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Search onSearch={setQuery} resultCount={filtered.length} totalCount={allPokemon.length} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
              No Pokemon found matching &ldquo;{query}&rdquo;
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Try a different search term
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((p) => (
                <PokemonCard
                  key={p.id}
                  pokemon={p}
                  onSelect={setSelectedPokemon}
                />
              ))}
            </div>

            <div ref={sentinelRef} className="h-4" />

            {loadingMore && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={`loading-${i}`} />
                ))}
              </div>
            )}

            {!hasMore && filtered.length > 0 && (
              <div className="text-center py-10">
                <p className="text-gray-400 dark:text-gray-500">
                  You&apos;ve seen all {allPokemon.length} Pokemon!
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {selectedPokemon && (
        <StatsModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </>
  );
}
