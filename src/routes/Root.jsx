import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

export default function Root() {
  const [cart, setCart] = useState([]);
  const location = useLocation();

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="shop">Shop</Link>
        <Link to="cart">Cart</Link>
      </nav>
      <section className="hero">
        <h1>Zast E-Commerce Store</h1>
        {location.pathname === "/" && (
          <p>
            A one-stop online shop for all your needs. Head over to{" "}
            <Link to="shop">Shop</Link> for a list of our products and to fill
            your <Link to="cart">cart</Link>.
          </p>
        )}
      </section>
      <div className="mainBody">
        <Outlet context={[cart, setCart]} />
      </div>
    </>
  );
}
