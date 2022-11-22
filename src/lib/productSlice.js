import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { act } from "react-dom/test-utils";
import { getProduct } from "./database";

const initialState = {
  productData: {},
  status: "idle",
  error: null,
};

/* Creates an asyncThunk to fetch tasks from a remote endpoint.
 * You can read more about Redux Toolkit's thunks in the docs:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 */
export const fetchProduct = createAsyncThunk(
  "store/getProduct",
  async (productId) => {
    const { product: product } = await getProduct(productId, ["description"]);
    return {
      ...product,
      attributes: product.attributes.map((att) => ({
        ...att,
        selectedAttr: att.items[0].id,
      })),
    };
  });

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    selectAttribute(state, action) {
      const product = state.productData;
      const {attrId, value} = action.payload;

            console.log("selectAttribute")
            console.dir(attrId, value)
      return {
        ...state,
        productData: {
          ...product,
          attributes: product.attributes.map((att) => {
            console.dir(att)
            // HACK:

            if (attrId === att.id) return { ...att, selectedAttr: value }
            return att;
        }),
        }
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.fulfilled, (_, action) => ({
        error: null,
        status: "succeeded",
        productData: action.payload
      }))
      .addCase(fetchProduct.pending, () => ({
        status: "loading",
        currencies: {},
        error: null,
      }))
      .addCase(fetchProduct.rejected, () => ({
        status: "failed",
        currencies: {},
        // HACK: return a more explicit error message.
        error: "Something went wrong"
      }))
  }
});

export const { selectAttribute } = currencySlice.actions;

export default currencySlice.reducer;
