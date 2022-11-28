import { createSelector, createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { getProductData } from "./database";

const initialState = {
  products: [],
  productViewData: { 
    id: null,
    status: "loading",
    error: null,
  },
  status: "idle",
  error: null,
};

export const fetchAndAddToCart = createAsyncThunk(
  "cart/addItem",
  async ({ productId }, thunkAPI) => {
    
    const inCart = thunkAPI.getState().cart.products.find((item) => item.id === productId)
    if (inCart)
      return thunkAPI.rejectWithValue("Product already in cart");

    const { product } = await getProductData(productId, ["id", "name", "brand", "gallery"]);
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

export const fetchProductData = createAsyncThunk(
  "store/getProduct",
  async (productId, thunkAPI) => {
    const inCart = thunkAPI.getState().cart.products.find((item) => item.id === productId)
    if (inCart) {
      const { product: product } = await getProductData(productId, ["id", "name", "brand", "gallery", "description"]);
      return {
        ...inCart, 
        description: product.description
      }
    }

    const { product: product } = await getProductData(productId, ["id", "name", "brand", "gallery", "description"]);
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
        products: [...state.products, {id, name, brand, gallery, prices, attributes, amount: 1 } ],
      }
    },
    selectAttribute: (state, action) => {
      const product = state.productViewData;
      const {productId, attrId, value} = action.payload;

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
        } : product,
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
      console.dir(action)
      return { 
        ...state,
        products: state.products.filter((item) => item.id !== action.payload.productId) }
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
      .addCase(fetchProductData.fulfilled, (state, action) => ({
        ...state,
        productViewData: { 
          ...action.payload,
          status: "succeeded",
          error: null,
        },
      }))
      .addCase(fetchProductData.pending, (state) => ({
        ...state,
        productViewData: { 
          inCart: false, 
          id: null,
          status: "loading",
          error: null,
        },
      }))
      .addCase(fetchProductData.rejected, (state) => ({
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

export const checkProductSelector = createSelector(
  [(state) => state.products, (_, productId) => productId],
  (products, productId) => products.find((item) => item.id === productId) !== undefined
)

export const { increaseProductAmmount, addToCart, selectAttribute, decreaseProductAmmount, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
