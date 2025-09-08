import { useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router";

export default function Root() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="shop">Shop</Link>
        <Link to="cart">Cart</Link>
      </nav>
      {/* <h1>Welcome home!</h1> */}
      <div className="mainBody">
        <Outlet context={[cart, setCart]} />
      </div>
    </>
  );
}
