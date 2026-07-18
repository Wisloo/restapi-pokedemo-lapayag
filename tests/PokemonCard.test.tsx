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
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText("pikachu")).toBeInTheDocument();
  });

  it("renders pokemon type", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText("Type: electric")).toBeInTheDocument();
  });

  it("renders show stats button", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText("Show Stats")).toBeInTheDocument();
  });

  it("toggles stats visibility on button click", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    
    const button = screen.getByText("Show Stats");
    fireEvent.click(button);
    
    expect(screen.getByText("Hide Stats")).toBeInTheDocument();
    expect(screen.getByText(/Stats for pikachu/)).toBeInTheDocument();
  });

  it("hides stats when button clicked again", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    
    const button = screen.getByText("Show Stats");
    fireEvent.click(button);
    fireEvent.click(screen.getByText("Hide Stats"));
    
    expect(screen.getByText("Show Stats")).toBeInTheDocument();
    expect(screen.queryByText(/Stats for pikachu/)).not.toBeInTheDocument();
  });
});
