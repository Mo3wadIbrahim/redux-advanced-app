import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "./store/cartSlice";

let isInitial = true;

function App() {
  const isCartOpen = useSelector((state) => state.ui.isCartOpen);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(
          "https://react-app-edbe6-default-rtdb.firebaseio.com/cart.json",
        );
        if (!response.ok) throw new Error("Could not fetch cart data!");

        const data = await response.json();

        dispatch(cartActions.replaceCart(data));
      } catch (error) {
        console.error("Fetching failed:", error);
      }
    };

    fetchCartData();
  }, [dispatch]);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          "https://react-app-edbe6-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify(cart),
          },
        );
        if (!response.ok) throw new Error("Sending cart data failed.");
      } catch (error) {
        console.error("Sending failed:", error);
      }
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendRequest();
  }, [cart]);

  return <Layout>{isCartOpen ? <Cart /> : <Products />}</Layout>;
}

export default App;
