import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useOutletContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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

  function addToCart(productId) {
    // Add product only if input quantity was changed
    if (changed) {
      const cartProduct = products.find((product) => product.id === productId);
      const newCart = [...cart];
      newCart.forEach((item, index) => {
        if (cartProduct.id === item.id) {
          newCart.splice(index, 1, cartProduct); // Don't repeat products
        }
      });
      cartProduct.quantity = quantity;
      setCart(Array.from(new Set([...newCart, cartProduct]))); // Don't repeat products
    }
    // console.log(cart);
    setChanged(false);
  }

  return error ? (
    <p>Oops! There's a network error!</p>
  ) : loading ? (
    <p>Loading...</p>
  ) : (
    <section>
      <h2>Items in our store...</h2>
      {products.map((product) => (
        <article key={product.id}>
          <h3>{product.title}</h3>
          <img src={product.image} alt={product.title} />
          <p>${product.price}</p>
          <p>{product.description}</p>
          <form action="">
            <label htmlFor="quantity">Quantity </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min={1}
              onChange={(e) => {
                setChanged(true);
                setQuantity(parseInt(e.target.value));
              }}
            />
          </form>
          <button type="button" onClick={() => addToCart(product.id)}>
            Add to Cart
          </button>
        </article>
      ))}
    </section>
  );
}
