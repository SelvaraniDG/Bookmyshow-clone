import { createSlice } from '@reduxjs/toolkit';
import eventServices from '../services/eventServices';

// Initial state
const initialState = {
  events: [],
  selectedEvent: null,
  status: 'idle',
  error: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEventInState: (state, action) => {
      const index = state.events.findIndex(event => event.event_id === action.payload.event_id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEventInState: (state, action) => {
      state.events = state.events.filter(event => event.event_id !== action.payload);
    },
  },
});

export const { setSelectedEvent, setEvents, setStatus, setError, addEvent, updateEventInState, deleteEventInState } = eventSlice.actions;

export default eventSlice.reducer;