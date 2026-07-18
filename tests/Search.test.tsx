import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Search from "@/app/components/Search";

describe("Search", () => {
  it("renders with placeholder text", () => {
    render(<Search onSearch={vi.fn()} resultCount={0} totalCount={0} />);
    expect(screen.getByPlaceholderText("Search Pokemon...")).toBeInTheDocument();
  });

  it("calls onSearch with raw value on input change", () => {
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} resultCount={0} totalCount={0} />);
    
    const input = screen.getByPlaceholderText("Search Pokemon...");
    fireEvent.change(input, { target: { value: "Pikachu" } });

    expect(onSearch).toHaveBeenCalledWith("Pikachu");
  });

  it("calls onSearch with empty string when input is cleared", () => {
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} resultCount={0} totalCount={0} />);
    
    const input = screen.getByPlaceholderText("Search Pokemon...");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.change(input, { target: { value: "" } });

    expect(onSearch).toHaveBeenLastCalledWith("");
  });

  it("displays result count", () => {
    render(<Search onSearch={vi.fn()} resultCount={12} totalCount={151} />);
    expect(screen.getByText("Showing 12 of 151 Pokemon")).toBeInTheDocument();
  });
});
