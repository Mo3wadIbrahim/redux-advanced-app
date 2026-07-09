import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [{ title: "Test Item", quantity: 3, total: 18, price: 6 }],
  isCartOpen: false,
  totalQuantities: 3,
  totalPrice: 18,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const isItemExist = state.items.findIndex(
        (item) => item.title === action.payload.title,
      );
      if (isItemExist >= 0) {
        state.items[isItemExist].quantity++;
        state.items[isItemExist].total += state.items[isItemExist].price;
        state.totalPrice += action.payload.price;
        state.totalQuantities++;
      } else {
        const newItem = {
          title: action.payload.title,
          quantity: 1,
          total: action.payload.price,
          price: action.payload.price,
        };
        state.items.push(newItem);
        state.totalPrice += action.payload.price;
        state.totalQuantities++;
      }
    },
    removeItem: (state, action) => {
      const isItemExist = state.items.findIndex(
        (item) => item.title === action.payload.title,
      );
      const itemQuantity = action.payload.quantity;

      if (itemQuantity > 1) {
        state.items[isItemExist].quantity--;
        state.items[isItemExist].total -= state.items[isItemExist].price;
        state.totalPrice -= action.payload.price;
        state.totalQuantities--;
      } else {
        state.items.splice(isItemExist, 1);
        state.totalPrice -= action.payload.price;
        state.totalQuantities--;
      }
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const { addItem, removeItem, toggleCart } = cartSlice.actions;

export default cartSlice.reducer;
