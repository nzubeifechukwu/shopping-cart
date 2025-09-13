import { useOutletContext } from "react-router";

export default function Cart() {
  const [cart, setCart] = useOutletContext();

  return (
    <section>
      {!cart.length ? (
        <h2>You have no items in your cart</h2>
      ) : (
        cart.map((item) => (
          <article key={item.id}>
            {item.title} {item.quantity}
            <button
              type="button"
              onClick={() =>
                setCart(cart.filter((element) => element.id !== item.id))
              }
            >
              Delete
            </button>
          </article>
        ))
      )}
    </section>
  );
}
