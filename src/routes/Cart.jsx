import { useState } from "react";
import { Link, useOutletContext } from "react-router";

export default function Cart() {
  const [cart, setCart] = useOutletContext();

  // will toggle state to ensure rerender once increase (+) or decrease (-) button is clicked.
  // There may be a better way to do this than setting a more or less redundant state.
  const [rerender, setRerender] = useState(false);

  function increaseQuantity(id) {
    const item = cart.find((element) => id === element.id);
    item.quantity += 1;
    setRerender(!rerender);
  }

  function decreaseQuantity(id) {
    const item = cart.find((element) => element.id === id);
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      alert(
        "You have just 1 of this item left in your cart. Click the Remove button if you want to remove it."
      );
    }
    setRerender(!rerender);
  }

  return (
    <section>
      {!cart.length ? (
        <p>
          You have no items in your cart. Head over to{" "}
          <Link to="/shop">Shop</Link> for a list of our products and to fill
          your cart.
        </p>
      ) : (
        cart.map((item) => (
          <article key={item.id}>
            <h2>{item.title}</h2>
            <img src={item.image} alt={item.title} />
            <p>
              <strong>PRICE (per item): </strong>${item.price}
            </p>
            <p>
              <strong>QUANTITY: </strong>
              {item.quantity}
            </p>
            <p>{item.description}</p>
            <div className="changeQuantityBtns">
              <button type="button" onClick={() => increaseQuantity(item.id)}>
                +
              </button>
              <button type="button" onClick={() => decreaseQuantity(item.id)}>
                -
              </button>
            </div>
            <button
              type="button"
              onClick={() =>
                setCart(cart.filter((element) => element.id !== item.id))
              }
            >
              Remove
            </button>
          </article>
        ))
      )}
    </section>
  );
}
