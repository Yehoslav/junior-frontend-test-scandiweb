import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./currencySlice";
import cartSlice from "./cartSlice";
import storeSlice from "./storeSlice";

export const store = configureStore({
  reducer: {
    currency: currencySlice,
    cart: cartSlice,
    store: storeSlice,
  }
})
