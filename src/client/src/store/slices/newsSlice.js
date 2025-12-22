import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  pageNumber: 0,
  loading: false,
  error: null,
  hasMore: true,
  initialLoad: true,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setNews: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    clearNews: (state) => {
      state.items = [];
      state.pageNumber = 0;
      state.error = null;
      state.hasMore = true;
    },
    incrementPage: (state) => {
      state.pageNumber += 1;
    },
    decrementPage: (state) => {
      state.pageNumber -= 1;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setInitialLoad: (state, action) => {
      state.initialLoad = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setNews,
  clearNews,
  incrementPage,
  decrementPage,
  setHasMore,
  setInitialLoad,
} = newsSlice.actions;

// Selectors
export const selectNews = (state) => state.news.items;
export const selectNewsLoading = (state) => state.news.loading;
export const selectNewsError = (state) => state.news.error;
export const selectNewsPageNumber = (state) => state.news.pageNumber;
export const selectNewsHasMore = (state) => state.news.hasMore;
export const selectNewsInitialLoad = (state) => state.news.initialLoad;

export default newsSlice.reducer;
