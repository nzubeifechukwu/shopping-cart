import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  createMemoryRouter,
  RouterProvider,
  Outlet,
  Routes,
  Route,
} from "react-router";
import Root from "../src/routes/Root";
import Shop from "../src/routes/Shop";
import Cart from "../src/routes/Cart";
import ErrorPage from "../src/ErrorPage";

// Test suite for Root component
describe("Root component", () => {
  // Initialize routes and router
  const routes = [
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "shop",
          element: <Shop />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/shop", "/cart"],
    initialIndex: 0,
  });

  it("renders component", () => {
    render(<RouterProvider router={router} />);

    screen.debug();
  });

  it("renders home page heading", () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders nav", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders links", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getAllByRole("link")).toHaveLength(5);
  });

  it("renders text", () => {
    render(<RouterProvider router={router} />);
    expect(screen.getByText(/one-stop online shop/i)).toBeInTheDocument();
  });

  it("renders Shop page after Shop nav link is clicked", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const navLinks = screen.getAllByRole("link", { name: "Shop" });
    await user.click(navLinks[1]);
    expect(await screen.findAllByRole("button")).toHaveLength(20);
  });

  it("calls the addToCart function when 'Add to Cart' button is clicked", async () => {
    const addToCart = vi.fn();
    const user = userEvent.setup();

    render(<RouterProvider router={router} />);

    const navLinks = screen.getAllByRole("link", { name: "Shop" });
    await user.click(navLinks[1]);

    const buttons = screen.getAllByRole("button", { name: "Add to Cart" });
    await user.click(buttons[0]);

    expect(addToCart).toHaveBeenCalled();
  });

  it("correctly renders Cart page when cart is empty", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const navLinks = screen.getAllByRole("link", { name: "Cart" });
    await user.click(navLinks[navLinks.length - 1]);
    expect(
      await screen.findByText(/no items in your cart/i)
    ).toBeInTheDocument();
  });

  // it("correctly renders Cart page when cart is not empty", async () => {
  //   const user = userEvent.setup();

  //   render(<RouterProvider router={router} />);

  //   const navLinks = screen.getAllByRole("link");
  //   await user.click(navLinks[1]);

  //   const buttons = screen.getAllByRole("button");
  //   await user.click(buttons[0]);

  //   // const navLinks = screen.getAllByRole("link", { name: "Cart" });
  //   await user.click(navLinks[navLinks.length - 1]);

  //   expect(await screen.findAllByRole("button")).toHaveLength(3);
  // });
});
