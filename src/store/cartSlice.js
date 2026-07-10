import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [{ title: "Test Item", quantity: 3, total: 18, price: 6 }],
  totalQuantities: 3,
  totalPrice: 18,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.title === action.payload.title,
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity++;
        state.items[itemIndex].total += state.items[itemIndex].price;
        state.totalPrice += action.payload.price;
        state.totalQuantities++;
      } else {
        const newItem = {
          title: action.payload.title,
          quantity: 1,
          total: action.payload.total,
          price: action.payload.price,
        };
        state.items.push(newItem);
        state.totalPrice += action.payload.price;
        state.totalQuantities++;
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.title === action.payload.title,
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
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
