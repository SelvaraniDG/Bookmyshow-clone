import axios from 'axios';

const baseURL = 'http://localhost:8001';

const eventServices = {
  createEvent: async (eventData) => {
    const response = await axios.post(`${baseURL}/events`, eventData);
    return response.data;
  },
  fetchEventById: async (eventId) => {
    const response = await axios.get(`${baseURL}/events/${eventId}`);
    return response.data;
  },
  fetchAllEvents: async () => {
    const response = await axios.get(`${baseURL}/events`);
    return response.data;
  },
  fetchEventsByUserId: async (userId) => {
    const response = await axios.get(`${baseURL}/events/user/${userId}`);
    return response.data;
  },
  fetchEventsByCategoryId: async (categoryId) => {
    const response = await axios.get(`${baseURL}/events/category/${categoryId}`);
    return response.data;
  },
  updateEvent: async (eventId, eventData) => {
    const response = await axios.put(`${baseURL}/events/${eventId}`, eventData);
    return response.data;
  },
  deleteEvent: async (eventId) => {
    const response = await axios.delete(`${baseURL}/events/${eventId}`);
    return response.data;
  },
  fetchCategoryById: async (categoryId) => {
    const response = await axios.get(`${baseURL}/categories/${categoryId}`);
    return response.data;
  },
  fetchUserById: async (userId) => {
    const response = await axios.get(`${baseURL}/users/${userId}`);
    return response.data;
  },
};

export default eventServices;