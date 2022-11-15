import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  symbol: "$"
}

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    updateCurrency(state, action) {
      return {
        ...state,
        symbol: action.payload
      }
    }
  }
})

export const {updateCurrency} = currencySlice.actions;

export default currencySlice.reducer;
