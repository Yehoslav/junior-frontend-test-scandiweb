import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrencies } from "./database";

const initialState = {
  globalCurrency: { symbol: "$", label: "USD" },
  currencies: [],
  status: "idle",
  error: null,
};

/* Creates an asyncThunk to fetch tasks from a remote endpoint.
 * You can read more about Redux Toolkit's thunks in the docs:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 */
export const fetchCurrencies = createAsyncThunk(
  "store/getCurrencies",
  async () => await getCurrencies()
);

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    updateCurrency(state, action) {
      return {
        ...state,
        globalCurrency: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.fulfilled, (state, action) => ({
        ...state, 
        status: "succeeded",
        currencies: action.payload.currencies,
      }))
      .addCase(fetchCurrencies.pending, (state) => ({
        ...state, 
        status: "loading",
        currencies: [],
      }))
      .addCase(fetchCurrencies.rejected, (state) => ({
        ...state, 
        status: "failed",
        currencies: [],
        // HACK: return a more explicit error message.
        error: "Something went wrong"
      }))
  }
});

export const { updateCurrency } = currencySlice.actions;

export default currencySlice.reducer;
