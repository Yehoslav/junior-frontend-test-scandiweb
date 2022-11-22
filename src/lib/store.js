import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./currencySlice";
import cartSlice from "./cartSlice";
import storeSlice from "./storeSlice";
import productSlice from "./productSlice";

export const store = configureStore({
  reducer: {
    currency: currencySlice,
    cart: cartSlice,
    store: storeSlice,
    product: productSlice,
  }
})
