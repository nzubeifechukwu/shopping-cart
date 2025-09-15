import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Root from "../src/routes/Root";
import Shop from "../src/routes/Shop";

describe("Root component", () => {
  it("renders component", () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );

    screen.debug();
  });

  it("renders heading", () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading").textContent).toMatch(
      /zast e-commerce store/i
    );
  });

  it("renders nav", () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders links", () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );
    expect(screen.getAllByRole("link")).toHaveLength(5);
  });
});
