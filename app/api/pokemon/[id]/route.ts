import { NextResponse } from "next/server";
import type { Pokemon } from "@/types/pokemon";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Pokemon "${id}" not found` },
        { status: res.status }
      );
    }

    const pokemon: Pokemon = await res.json();
    return NextResponse.json(pokemon);
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
