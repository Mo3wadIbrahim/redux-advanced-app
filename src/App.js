import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "./store/cartSlice";

import { uiActions } from "./store/uiSlice";
import Notification from "./components/UI/Notification";

function App() {
  const isCartOpen = useSelector((state) => state.ui.isCartOpen);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const isDataFetched = useSelector((state) => state.ui.isDataFetched);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(
          "https://react-app-edbe6-default-rtdb.firebaseio.com/cart.json",
        );
        if (!response.ok) throw new Error("Could not fetch cart data!");

        const data = await response.json();
        if (!data.items) {
          dispatch(
            uiActions.showNotification({
              status: "success",
              title: "Success!",
              message: "There is no cart data to fetch!",
            }),
          );
        } else {
          dispatch(
            uiActions.showNotification({
              status: "success",
              title: "Success!",
              message: "Cart data fetched successfully!",
            }),
          );
        }
        dispatch(cartActions.replaceCart(data));
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Fetching cart data failed!",
          }),
        );
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
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Cart data sent successfully!",
          }),
        );
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Sending cart data failed!",
          }),
        );
      }
    };
    if (!isDataFetched) {
      return;
    }
    sendRequest();
  }, [cart]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>{isCartOpen ? <Cart /> : <Products />}</Layout>
    </Fragment>
  );
}

export default App;
