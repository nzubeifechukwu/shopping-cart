import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  createMemoryRouter,
  RouterProvider,
  Outlet,
  Routes,
  Route,
  MemoryRouter,
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

  it("correctly renders Cart page when cart is empty", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const navLinks = screen.getAllByRole("link", { name: "Cart" });
    await user.click(navLinks[navLinks.length - 1]);
    expect(
      await screen.findByText(/no items in your cart/i)
    ).toBeInTheDocument();
  });
});

// mock data for Shop component
// function ShopCart() {
//   const products = [
//     { id: 1, title: "product 1", price: 15, description: "this is product 1" },
//     { id: 2, title: "product 2", price: 35, description: "this is product 2" },
//   ];
//   let cart = [];

//   function addToCart(productId) {
//     if (cart.length) {
//       cart.forEach((item) => {
//         if (item.id !== productId) {
//           cart.push(products.find((product) => product.id === productId));
//           return;
//         }
//       });
//     } else {
//       cart.push(products.find((product) => product.id === productId));
//     }
//   }

//   return (
//     <section>
//       {products.map((product) => (
//         <article key={product.id}>
//           <h2>{product.title}</h2>
//           <img src={product.image} alt={product.title} />
//           <p>${product.price}</p>
//           <p>{product.description}</p>
//           <form action="">
//             <label htmlFor="quantity">Quantity </label>
//             <input
//               type="number"
//               id="quantity"
//               name="quantity"
//               min={1}
//               onChange={(e) => {
//                 setChanged(true);
//                 setQuantity(parseInt(e.target.value));
//               }}
//             />
//           </form>
//           <button type="button" onClick={() => addToCart(product.id)}>
//             Add to Cart
//           </button>
//         </article>
//       ))}
//     </section>
//   );
// }

describe("Shop component", () => {
  const routes = [
    {
      path: "/shop",
      element: <Shop />,
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/shop"],
  });

  it("renders Shop component", () => {
    render(<RouterProvider router={router} />);
    screen.debug();
  });

  // it("calls the addToCart function when Add to Cart button is clicked", async () => {
  //   // const addToCart = vi.fn();
  //   const user = userEvent.setup();

  //   render(<ShopCart />);

  //   const buttons = screen.getByRole("button");
  //   await user.click(buttons[0]);

  //   expect(addToCart).toHaveBeenCalled();
  // });
});
