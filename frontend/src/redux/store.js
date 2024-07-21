// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import eventReducer  from './eventSlice'
import categoryReducer from './categorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer,
    category: categoryReducer,
  },
});