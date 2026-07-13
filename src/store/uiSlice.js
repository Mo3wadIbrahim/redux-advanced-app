import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isCartOpen: false,
    notification: null,
    isDataFetched: false,
  },
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    showNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    hideNotification: (state) => {
      state.notification = null;
    },
    setIsDataFetched: (state, action) => {
      state.isDataFetched = true;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
