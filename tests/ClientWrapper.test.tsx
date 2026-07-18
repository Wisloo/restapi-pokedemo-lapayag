import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TypeBadge from "@/app/components/TypeBadge";

describe("TypeBadge", () => {
  it("renders the type name capitalized", () => {
    render(<TypeBadge type="electric" />);
    expect(screen.getByText("electric")).toBeInTheDocument();
  });

  it("renders different types", () => {
    render(<TypeBadge type="fire" />);
    expect(screen.getByText("fire")).toBeInTheDocument();
  });
});
