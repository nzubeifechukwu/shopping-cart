import { Outlet } from "react-router";
import { Link } from "react-router";
import { useEffect, useState } from "react";

export default function Root() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="shop">Shop</Link>
        <Link to="cart">Cart</Link>
      </nav>
      <h1>Welcome home!</h1>
      <div className="mainBody">
        <Outlet
          products={products}
          error={error}
          loading={loading}
          cart={cart}
          setCart={setCart}
          quantity={quantity}
          setQuantity={setQuantity}
          changed={changed}
          setChanged={setChanged}
        />
      </div>
    </>
  );
}
