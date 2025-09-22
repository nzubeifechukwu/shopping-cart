import { useState } from "react";
import { Link, useOutletContext } from "react-router";

import shopStyles from "../Shop/shop.module.css";
import cartStyles from "./cart.module.css";

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
    <>
      {!cart.length ? (
        <p className={shopStyles.initialP}>
          You have no items in your cart. Head over to{" "}
          <Link to="/shop">Shop</Link> for a list of our products and to fill
          your cart.
        </p>
      ) : (
        <>
          <h2>Items in your cart</h2>
          <section className={shopStyles.products}>
            {cart.map((item) => (
              <article key={item.id}>
                <h3>{item.title}</h3>
                <img src={item.image} alt={item.title} width={200} />
                <p className={cartStyles.price}>
                  PRICE (per item): ${item.price}
                </p>
                <div>
                  <p>QTY {item.quantity}</p>
                  <div className={cartStyles.changeQuantityBtns}>
                    <button
                      className={cartStyles.upBtn}
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      ⌃
                    </button>
                    <button
                      className={cartStyles.downBtn}
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      ⌄
                    </button>
                  </div>
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
            ))}
          </section>
        </>
      )}
    </>
  );
}
