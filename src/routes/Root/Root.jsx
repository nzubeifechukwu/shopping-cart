import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

import styles from "./root.module.css";

export default function Root() {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const totalCartItems = cart.reduce((prev, curr) => prev + curr.quantity, 0);

  return (
    <>
      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="shop">Shop</Link>
        <Link to="cart">
          Cart <span>{totalCartItems ? totalCartItems : ""}</span>
        </Link>
      </nav>
      <section className={styles.hero}>
        <h1>Zast E-Commerce Store</h1>
        {location.pathname === "/" && (
          <p>
            A one-stop online shop for all your needs. Head over to{" "}
            <Link to="shop">Shop</Link> for a list of our products and to fill
            your <Link to="cart">cart</Link>.
          </p>
        )}
      </section>
      <section className={styles.mainBody}>
        <Outlet context={[cart, setCart]} />
      </section>
    </>
  );
}
