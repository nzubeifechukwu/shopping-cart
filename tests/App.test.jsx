import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Outlet, Routes, Route } from "react-router";
import Root from "../src/routes/Root";
import Shop from "../src/routes/Shop";

// Test suite for Root component
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

    expect(screen.getByRole("heading")).toBeInTheDocument();
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

  it("renders text", () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );
    expect(screen.getByText(/one-stop online shop/i)).toBeInTheDocument();
  });

  it("renders Home page when no nav link has been clicked", () => {
    // screen has no container property, so destructure render to get container
    const { container } = render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it("renders Shop page after Shop nav link is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );
    const navLinks = screen.getAllByRole("link", { name: "Shop" });
    await user.click(navLinks[0]);
    expect(await screen.findAllByRole("button")).toHaveLength(20);
  });
});

// Test suite for Shop component
// Mock the parent element
// const ParentComponentWithOutlet = ({ children }) => {
//   const outletContextValue = {
//     message: "Hello from Outlet Context",
//     count: 5,
//   };
//   return <Outlet context={outletContextValue} />;
// };
// describe("Shop component", () => {
//   it("renders the component with outlet context provided", () => {
//     render(
//       <MemoryRouter>
//         <Routes>
//           <Route path="/" element={<ParentComponentWithOutlet />}>
//             <Route element={<Shop />} />
//           </Route>
//         </Routes>
//       </MemoryRouter>
//     );
//     screen.debug();
//   });

//   it("renders data from the API call", async () => {
//     render(
//       <MemoryRouter>
//         <Routes>
//           <Route path="/" element={<ParentComponentWithOutlet />}>
//             <Route element={<Shop />} />
//           </Route>
//         </Routes>
//       </MemoryRouter>
//     );

//     expect(await screen.findAllByRole("button")).toHaveLength(20)

//     // expect(
//     //   await screen.findByText(/Your perfect pack for everyday use/)
//     // ).toBeInTheDocument();
//   });
// });
