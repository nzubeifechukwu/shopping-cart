import { useState } from "react";
import Shop from "./components/Shop";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Shop />
    </>
  );
}

export default App;
