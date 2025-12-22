import { configureStore } from '@reduxjs/toolkit';
import currencyReducer from './slices/currencySlice';
import newsReducer from './slices/newsSlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    news: newsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
