import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await fetch('http://localhost:8001/categories');
  return response.json();
});

export const addCategory = createAsyncThunk('categories/addCategory', async (categoryName) => {
  const response = await fetch('http://localhost:8001/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cat_name: categoryName }),
  });
  return response.json();
});

export const updateCategories = (categories) => {
  return {
    type: 'categories/update',
    payload: categories,
  };
};

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    updateCategories: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default categorySlice.reducer;