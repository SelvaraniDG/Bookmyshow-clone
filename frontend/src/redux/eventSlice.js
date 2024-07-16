// eventSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for creating an event
export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      // Get user data from local storage
      const user = JSON.parse(localStorage.getItem('user'));
      const user_id = user ? user.user_id : null;

      if (!user_id) {
        return rejectWithValue('User is not logged in');
      }

      // Add the created_by field to the event data
      const dataToSend = { ...eventData, created_by: user_id };

      const response = await axios.post('http://localhost:8001/events', dataToSend);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;