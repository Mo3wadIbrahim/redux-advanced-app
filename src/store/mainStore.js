import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import uiReducer from "./uiSlice";
export const mainStore = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
  },
});

export default mainStore;
