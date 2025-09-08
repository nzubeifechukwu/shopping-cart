import { useOutletContext } from "react-router";

export default function Cart() {
  const [cart, setCart] = useOutletContext();

  return (
    <section>
      {cart.map((item) => (
        <article key={item.id}>{item.title}</article>
      ))}
    </section>
  );
}
