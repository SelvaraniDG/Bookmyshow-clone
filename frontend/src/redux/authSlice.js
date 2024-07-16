// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!localStorage.getItem('user'), // Initialize state based on localStorage
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('user'); // Clear user data on logout
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;