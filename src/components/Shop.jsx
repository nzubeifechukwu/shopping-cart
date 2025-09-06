import { useEffect, useState } from "react";

export default function Shop() {
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

  function addToCart(productId) {
    // Add product only if input quantity was changed
    if (changed) {
      const cartProduct = products.find((product) => product.id === productId);
      cartProduct.quantity = quantity;
      setCart(Array.from(new Set([...cart, cartProduct]))); // Don't repeat products
    }
    console.log(cart);
    setChanged(false);
  }

  return error ? (
    <h1>Oops! There's a network error!</h1>
  ) : loading ? (
    <h1>Loading...</h1>
  ) : (
    <section>
      {products.map((product) => (
        <article key={product.id}>
          <img src={product.image} alt={product.title} />
          <h2>{product.title}</h2>
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
          <h2>{product.id}</h2>
          <button type="button" onClick={() => addToCart(product.id)}>
            Add to Cart
          </button>
        </article>
      ))}
    </section>
  );
}
