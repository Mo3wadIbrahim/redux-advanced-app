import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
export const mainStore = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default mainStore;
