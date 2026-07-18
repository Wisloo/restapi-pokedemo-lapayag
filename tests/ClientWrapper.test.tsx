import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ClientWrapper from "@/app/components/ClientWrapper";
import type { Pokemon } from "@/types/pokemon";

const mockPokemon: Pokemon[] = [
  {
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
  },
  {
    id: 4,
    name: "charmander",
    types: [{ slot: 1, type: { name: "fire", url: "" } }],
    stats: [
      { base_stat: 39, effort: 0, stat: { name: "hp", url: "" } },
      { base_stat: 52, effort: 0, stat: { name: "attack", url: "" } },
      { base_stat: 43, effort: 0, stat: { name: "defense", url: "" } },
      { base_stat: 60, effort: 0, stat: { name: "special-attack", url: "" } },
      { base_stat: 50, effort: 0, stat: { name: "special-defense", url: "" } },
      { base_stat: 65, effort: 0, stat: { name: "speed", url: "" } },
    ],
    sprites: { front_default: "https://example.com/charmander.png", front_shiny: null, back_default: null, back_shiny: null },
    height: 6,
    weight: 85,
  },
];

describe("ClientWrapper", () => {
  it("renders all pokemon cards", () => {
    render(<ClientWrapper data={mockPokemon} />);
    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
  });

  it("filters pokemon by search query", async () => {
    render(<ClientWrapper data={mockPokemon} />);
    
    const input = screen.getByPlaceholderText("Search Pokemon...");
    fireEvent.change(input, { target: { value: "pika" } });

    await waitFor(() => {
      expect(screen.getByText("pikachu")).toBeInTheDocument();
      expect(screen.queryByText("charmander")).not.toBeInTheDocument();
    });
  });

  it("shows no results message when no pokemon match", async () => {
    render(<ClientWrapper data={mockPokemon} />);
    
    const input = screen.getByPlaceholderText("Search Pokemon...");
    fireEvent.change(input, { target: { value: "xyz" } });

    await waitFor(() => {
      expect(screen.getByText("No Pokemon found.")).toBeInTheDocument();
    });
  });

  it("shows stats chart when exactly one pokemon matches", async () => {
    render(<ClientWrapper data={mockPokemon} />);
    
    const input = screen.getByPlaceholderText("Search Pokemon...");
    fireEvent.change(input, { target: { value: "char" } });

    await waitFor(() => {
      expect(screen.getByText("Stats Chart")).toBeInTheDocument();
      expect(screen.getByText(/Stats for charmander/)).toBeInTheDocument();
    });
  });

  it("does not show stats chart when multiple pokemon match", async () => {
    render(<ClientWrapper data={mockPokemon} />);
    
    const input = screen.getByPlaceholderText("Search Pokemon...");
    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.queryByText("Stats Chart")).not.toBeInTheDocument();
    });
  });
});
