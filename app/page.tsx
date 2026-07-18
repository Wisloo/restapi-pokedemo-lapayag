import Navbar from "./components/Navbar";
import ClientWrapper from "./components/ClientWrapper";
import type { Pokemon } from "@/types/pokemon";

async function fetchPokemon(limit: number = 12): Promise<Pokemon[]> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch Pokemon list: ${res.status}`);
    const list = await res.json();

    const detailed = await Promise.all(
      list.results.map(async (p: { name: string; url: string }) => {
        const res = await fetch(p.url, { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error(`Failed to fetch ${p.name}: ${res.status}`);
        return res.json();
      })
    );

    return detailed;
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    return [];
  }
}

export default async function Page() {
  const data = await fetchPokemon(12);

  return (
    <>
      <Navbar />
      <main className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Pokedex</h1>
        <ClientWrapper data={data} />
      </main>
    </>
  );
}
