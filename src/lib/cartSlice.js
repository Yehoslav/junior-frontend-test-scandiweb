import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProduct } from "./database";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

/* Creates an asyncThunk to fetch tasks from a remote endpoint.
 * You can read more about Redux Toolkit's thunks in the docs:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 */
export const fetchProduct = createAsyncThunk(
  "cart/addItem",
  async (itemId, thunkAPI) => {
    const inCart = thunkAPI.getState().cart.products.find((item) => item.id === itemId)
    if (inCart)
      return thunkAPI.rejectWithValue("Product already in cart");

    const { product } = await getProduct(itemId);
    return {
      ...product,
      amount: 1,
      attributes: product.attributes.map((att) => ({
        ...att,
        selectedAttr: att.items[0].id,
      })),
    };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increaseProductAmmount: (state, action) => {
      const { payload: productId } = action;
      state.products.find((item) => item.id === productId).amount += 1;
    },
    decreaseProductAmmount: (state, action) => {
      const { payload: productId } = action;
      const product = state.products.find((item) => item.id === productId);
      if (product.amount > 1) {
        product.amount -= 1;
      } else {
        return state;
      }
    },
    removeFromCart: (state, action) => {
      return { 
        ...state,
        products: state.products.filter((item) => item.id !== action.payload.id) }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.fulfilled, (state, action) => ({
        status: "succeeded",
        error: null,
        products: [...state.products, action.payload],
      }))
      .addCase(fetchProduct.pending, (state) => ({
        status: "loading",
        error: null,
        products: state.products,
      }))
      .addCase(fetchProduct.rejected, (state) => ({
        status: "failed",
        error: "Somethin went wrong.",
        products: state.products,
      }));
  },
});

export const { increaseProductAmmount, decreaseProductAmmount, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
