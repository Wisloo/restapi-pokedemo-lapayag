import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PokemonCard from "@/app/components/PokemonCard";
import type { Pokemon } from "@/types/pokemon";

const mockPokemon: Pokemon = {
  id: 25,
  name: "pikachu",
  types: [{ slot: 1, type: { name: "electric", url: "" } }],
  stats: [
    { base_stat: 35, effort: 0, stat: { name: "hp", url: "" } },
    { base_stat: 55, effort: 0, stat: { name: "attack", url: "" } },
    { base_stat: 40, effort: 0, stat: { name: "defense", url: "" } },
    { base_stat: 50, effort: 0, stat: { name: "special-attack", url: "" } },
    { base_stat: 50, effort: 0, stat: { name: "special-defense", url: "" } },
    { base_stat: 90, effort: 0, stat: { name: "speed", url: "" } },
  ],
  sprites: { front_default: "https://example.com/pikachu.png", front_shiny: null, back_default: null, back_shiny: null },
  height: 4,
  weight: 60,
};

describe("PokemonCard", () => {
  it("renders pokemon name capitalized", () => {
    render(<PokemonCard pokemon={mockPokemon} onSelect={vi.fn()} />);
    expect(screen.getByText("pikachu")).toBeInTheDocument();
  });

  it("renders pokemon type badges", () => {
    render(<PokemonCard pokemon={mockPokemon} onSelect={vi.fn()} />);
    expect(screen.getByText("electric")).toBeInTheDocument();
  });

  it("renders pokemon id", () => {
    render(<PokemonCard pokemon={mockPokemon} onSelect={vi.fn()} />);
    expect(screen.getByText("#025")).toBeInTheDocument();
  });

  it("calls onSelect when card is clicked", () => {
    const onSelect = vi.fn();
    render(<PokemonCard pokemon={mockPokemon} onSelect={onSelect} />);
    
    fireEvent.click(screen.getByText("pikachu"));
    expect(onSelect).toHaveBeenCalledWith(mockPokemon);
  });
});
