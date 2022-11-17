import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductList } from "./database";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

/* Creates an asyncThunk to fetch tasks from a remote endpoint.
 * You can read more about Redux Toolkit's thunks in the docs:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 */
export const fetchProducts = createAsyncThunk("store/getProducts", async (category) => {
  const { category: {products: products} } = await getProductList(category);
    console.dir(products)
    return products;
});

const cartSlice = createSlice({
  name: "products",
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (_, action) => ({
        status: "succeeded",
        error: null,
        // products: [...state.products, ...action.payload],
        products: action.payload
      }))
      .addCase(fetchProducts.pending, (state) => ({
        status: "loading",
        error: null,
        products: state.products,
      }))
      .addCase(fetchProducts.rejected, (state) => ({
        status: "failed",
        error: "Somethin went wrong.",
        products: state.products,
      }));
  },
});


export default cartSlice.reducer;
