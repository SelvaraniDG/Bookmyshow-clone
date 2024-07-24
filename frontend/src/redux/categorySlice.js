import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    setLoading(state) {
      state.status = 'loading';
    },
    setSucceeded(state) {
      state.status = 'succeeded';
    },
    setFailed(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  setCategories,
  addCategory,
  setLoading,
  setSucceeded,
  setFailed,
} = categorySlice.actions;

export default categorySlice.reducer;