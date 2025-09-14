import { useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";

export default function Root() {
  const [cart, setCart] = useState([]);

  // Use to set home page text. This solution doesn't work
  // when you click browser back button to return to home.
  const [page, setPage] = useState("home");

  return (
    <>
      <nav>
        <Link to="/" onClick={() => setPage("home")}>
          Home
        </Link>
        <Link to="shop" onClick={() => setPage("")}>
          Shop
        </Link>
        <Link to="cart" onClick={() => setPage("")}>
          Cart
        </Link>
      </nav>
      {page && (
        <section className="hero">
          <h1>Zast E-Commerce Store</h1>
          <p>
            A one-stop online shop for all your needs. Head over to{" "}
            <strong>
              <Link to="shop" onClick={() => setPage("")}>
                Shop
              </Link>
            </strong>{" "}
            for a list of our products and to fill your cart.
          </p>
        </section>
      )}
      <div className="mainBody">
        <Outlet context={[cart, setCart]} />
      </div>
    </>
  );
}
