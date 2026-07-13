import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";
const initialState = {
  items: [],
  totalQuantities: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart: (state, action) => {
      state.items = action.payload.items || [];
      state.totalQuantities = action.payload.totalQuantities || 0;
      state.totalPrice = action.payload.totalPrice || 0;
    },
    addItem: (state, action) => {
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

function sendCartData(cart) {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-app-edbe6-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        },
      );
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
function fetchCartData() {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-app-edbe6-default-rtdb.firebaseio.com/cart.json",
      );
      if (!response.ok) throw new Error("Could not fetch cart data!");
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      if (!cartData.items) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
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
      dispatch(cartActions.replaceCart(cartData));
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

export const cartActions = {
  ...cartSlice.actions,
  sendCartData,
  fetchCartData,
};
export default cartSlice.reducer;
