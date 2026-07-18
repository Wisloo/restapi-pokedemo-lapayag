import { NextResponse } from "next/server";
import type { Pokemon } from "@/types/pokemon";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "24";
  const offset = searchParams.get("offset") || "0";

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Pokemon list" },
        { status: res.status }
      );
    }

    const list = await res.json();

    const detailed: Pokemon[] = await Promise.all(
      list.results.map(async (p: { name: string; url: string }) => {
        const res = await fetch(p.url, { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error(`Failed to fetch ${p.name}`);
        return res.json();
      })
    );

    return NextResponse.json(detailed);
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
