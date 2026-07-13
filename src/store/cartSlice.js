import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";
const initialState = {
  items: [],
  totalQuantities: 0,
  totalPrice: 0,
  changed: false,
};
// Cart slice with reducers for adding, removing, and updating items in the cart, as well as async actions for sending and fetching cart data from a remote server.
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart: (state, action) => {
      state.changed = false;
      state.items = action.payload.items || [];
      state.totalQuantities = action.payload.totalQuantities || 0;
      state.totalPrice = action.payload.totalPrice || 0;
    },
    addItem: (state, action) => {
      state.changed = true;
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity++;
        state.items[itemIndex].total += state.items[itemIndex].price;
        state.totalPrice += action.payload.price;
        state.totalQuantities++;
      } else {
        const newItem = {
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          quantity: 1,
          total: action.payload.price,
        };
        state.items.push(newItem);
        state.totalPrice += action.payload.price;
        state.totalQuantities++;
      }
    },
    minusItem: (state, action) => {
      state.changed = true;
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (itemIndex >= 0) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity--;
          state.items[itemIndex].total -= state.items[itemIndex].price;
          state.totalPrice -= action.payload.price;
          state.totalQuantities--;
        } else {
          state.items.splice(itemIndex, 1);
          state.totalPrice -= action.payload.price;
          state.totalQuantities--;
        }
      }
    },
    removeItem: (state, action) => {
      state.changed = true;
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        state.totalPrice -= state.items[itemIndex].total;
        state.totalQuantities -= state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
  },
});
// Async action creator for fetching cart data from a remote server, with error handling and notifications.
function fetchCartData(url) {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(uiActions.setIsLoading(true));
      const response = await fetch(url);
      if (!response.ok) throw new Error("Could not fetch cart data!");
      const data = await response.json();
      dispatch(uiActions.setIsLoading(false));
      return data;
    };
    try {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Fetching...",
          message: "Fetching cart data!",
        }),
      );
      const cartData = await fetchData();
      if (cartData.totalQuantities === 0) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "There is no any items in the cart!",
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
      dispatch(
        cartActions.replaceCart(
          cartData || { items: [], totalQuantities: 0, totalPrice: 0 },
        ),
      );
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
}
// Async action creators for sending and fetching cart data from a remote server, with error handling and notifications.
function sendCartData(url, cart) {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantities: cart.totalQuantities,
          totalPrice: cart.totalPrice,
        }),
      });
      if (!response.ok) throw new Error("Sending cart data failed.");
    };
    try {
      await sendRequest();
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
}
// Exporting the cart actions and the reducer for use in the Redux store.
export const cartActions = {
  ...cartSlice.actions,
  fetchCartData,
  sendCartData,
};
export default cartSlice.reducer;
