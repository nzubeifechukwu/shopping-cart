import { Link, useOutletContext } from "react-router";

import shopStyles from "../Shop/shop.module.css";
import cartStyles from "./cart.module.css";

export default function Cart() {
  const [cart, setCart] = useOutletContext();

  function increaseQuantity(id) {
    const newCart = [...cart];
    const item = newCart.find((element) => id === element.id);
    item.quantity += 1;
    setCart(newCart);
  }

  function decreaseQuantity(id) {
    const newCart = [...cart];
    const item = newCart.find((element) => element.id === id);
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      alert(
        "You have just 1 of this item left in your cart. Click the Remove button if you want to remove it."
      );
    }
    setCart(newCart);
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
                <div className={cartStyles.qtyBtnsDiv}>
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
