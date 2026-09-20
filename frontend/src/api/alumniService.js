import apiClient from './apiClient';

export const alumniService = {
  getAllAlumni: async (query = '') => {
    const response = await apiClient.get('/alumni', { params: { query } });
    return response.data;
  },

  getAlumniById: async (id) => {
    const response = await apiClient.get(`/alumni/${id}`);
    return response.data;
  },

  getMyProfile: async () => {
    const response = await apiClient.get('/alumni/me');
    return response.data;
  },

  updateMyProfile: async (profileData) => {
    const response = await apiClient.put('/alumni/me', profileData);
    return response.data;
  },
};
