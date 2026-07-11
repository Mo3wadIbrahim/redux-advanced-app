import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantities: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
