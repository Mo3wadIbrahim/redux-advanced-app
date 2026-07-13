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
    dispatch(cartActions.fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (!isDataFetched) {
      return;
    }
    dispatch(cartActions.sendCartData(cart));
  }, [cart]);
  setTimeout(() => {
    dispatch(uiActions.hideNotification());
  }, 5000);
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
