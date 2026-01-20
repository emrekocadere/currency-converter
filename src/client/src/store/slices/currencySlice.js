import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  baseCurrency: 'AUD',
  targetCurrency: 'CAD',
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
    setTargetCurrency: (state, action) => {
      state.targetCurrency = action.payload;
    },
    setCurrencies: (state, action) => {
      state.baseCurrency = action.payload.baseCurrency;
      state.targetCurrency = action.payload.targetCurrency;
    },
    swapCurrencies: (state) => {
      const temp = state.baseCurrency;
      state.baseCurrency = state.targetCurrency;
      state.targetCurrency = temp;
    },
  },
});

export const { setBaseCurrency, setTargetCurrency, setCurrencies, swapCurrencies } = currencySlice.actions;


export const selectBaseCurrency = (state) => state.currency.baseCurrency;
export const selectTargetCurrency = (state) => state.currency.targetCurrency;
export const selectCurrencies = (state) => ({
  baseCurrency: state.currency.baseCurrency,
  targetCurrency: state.currency.targetCurrency,
});

export default currencySlice.reducer;
