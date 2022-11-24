import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getProduct } from "./database";

const initialState = {
  products: [],
  productViewData: { 
          inCart: false, 
          id: null,
          status: "loading",
          error: null,
        },
  status: "idle",
  error: null,
};

/* Creates an asyncThunk to fetch tasks from a remote endpoint.
 * You can read more about Redux Toolkit's thunks in the docs:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 */
export const fetchAndAddToCart = createAsyncThunk(
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

/* Creates an asyncThunk to fetch tasks from a remote endpoint.
 * You can read more about Redux Toolkit's thunks in the docs:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 */
export const getProductData = createAsyncThunk(
  "store/getProduct",
  async (productId, thunkAPI) => {
    const inCart = thunkAPI.getState().cart.products.find((item) => item.id === productId)
    if (inCart) {
      const { product: product } = await getProduct(productId, ["description"]);
      return {
        ...inCart, 
        description: product.description
      }
    }

    const { product: product } = await getProduct(productId, ["description"]);
    return {
      ...product,
      attributes: product.attributes.map((att) => ({
        ...att,
        selectedAttr: att.items[0].id,
      })),
    };
  });

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state) => {
      const {id, name, brand, gallery, prices, attributes } = state.productViewData;
      return {
        ...state,
        products: [...state.products, {id, name, brand, gallery, prices, attributes, amount: 1 } ]
      }
    },
    selectAttribute: (state, action) => {
      const product = state.productViewData;
      const {productId, attrId, value} = action.payload;

      console.log('payload: ');
      console.dir(action.payload)
      console.dir(current(state))
      console.dir(current(product))

      // HACK: This return statement is too ugly
      return {
        ...state,
        products: state.products.map(item => {
          if (item.id !== productId) return item 
          return { 
          ...item,
          attributes: item.attributes.map((att) => {

            if (attrId === att.id) return { ...att, selectedAttr: value }
            return att;
          }
        )}}),

        productViewData: (productId === product.id) ? {
          ...product,
          attributes: product.attributes.map((att) => {

            if (attrId === att.id) return { ...att, selectedAttr: value }
            return att;
        }),
        } : product.attributes,
      };
    },
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
      .addCase(fetchAndAddToCart.fulfilled, (state, action) => ({
        ...state,
        status: "succeeded",
        error: null,
        products: [...state.products, action.payload],
      }))
      .addCase(fetchAndAddToCart.pending, (state) => ({
        ...state,
        status: "loading",
        error: null,
        products: state.products,
      }))
      .addCase(fetchAndAddToCart.rejected, (state) => ({
        ...state,
        status: "failed",
        error: "Somethin went wrong.",
        products: state.products,
      }))
      .addCase(getProductData.fulfilled, (state, action) => ({
        ...state,
        productViewData: { 
          ...action.payload,
          status: "succeeded",
          error: null,
        },
      }))
      .addCase(getProductData.pending, (state) => ({
        ...state,
        productViewData: { 
          inCart: false, 
          id: null,
          status: "loading",
          error: null,
        },
      }))
      .addCase(getProductData.rejected, (state) => ({
        ...state,
        productViewData: { 
          inCart: false, 
          id: null,
          status: "failed",
          error: null,
        },
      }));
  },
});

export const { increaseProductAmmount, addToCart, selectAttribute, decreaseProductAmmount, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
