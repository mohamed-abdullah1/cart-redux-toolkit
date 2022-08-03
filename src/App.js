import { useState } from "react";
import Cart from "./components/Cart";
import Notification from "./components/Notification";
import "./styles.css";

export default function App() {
  const [status, setStatus] = useState();
  return (
    <div className="App">
      <Notification intial={status} />
      <Cart />
      <button onClick={() => setStatus("fail")}>Click</button>
      <button onClick={() => setStatus("success")}>Click</button>
    </div>
  );
}
