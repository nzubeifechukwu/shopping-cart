import { useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";

export default function Root() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  // const [error, setError] = useState(null);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="shop">Shop</Link>
        <Link to="cart">Cart</Link>
      </nav>
      {/* <h1>Welcome home!</h1> */}
      <div className="mainBody">
        <Outlet context={[products, setProducts, cart, setCart]} />
      </div>
    </>
  );
}
