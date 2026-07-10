import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "./cartSlice";
import uiReducers from "./uiSlice";
export const mainStore = configureStore({
  reducer: {
    cart: cartReducers,
    ui: uiReducers,
  },
});

export default mainStore;
