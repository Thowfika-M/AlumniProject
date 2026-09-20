import apiClient from './apiClient';

export const eventService = {
  getAllEvents: async (query = '', type = '') => {
    const response = await apiClient.get('/events', { params: { query, type } });
    return response.data;
  },

  createEvent: async (eventData) => {
    const response = await apiClient.post('/events', eventData);
    return response.data;
  },

  registerForEvent: async (eventId) => {
    const response = await apiClient.post(`/events/${eventId}/register`);
    return response.data;
  },
};
