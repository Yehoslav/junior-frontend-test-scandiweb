import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrencies } from "./database";

const initialState = {
  globalCurrency: { symbol: "$", label: "USD" },
  currencies: [],
  status: "idle",
  error: null,
};

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
      .addCase(fetchCurrencies.rejected, (state, action) => ({
        ...state, 
        status: "failed",
        currencies: [],
        error: action.error
      }))
  }
});

export const { updateCurrency } = currencySlice.actions;

export default currencySlice.reducer;
