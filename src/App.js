import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { useSelector } from "react-redux";

function App() {
  const isCartOpen = useSelector((state) => state.ui.isCartOpen);
  return (
    <Layout>
      {isCartOpen && <Cart />}
      {!isCartOpen && <Products />}
    </Layout>
  );
}

export default App;
