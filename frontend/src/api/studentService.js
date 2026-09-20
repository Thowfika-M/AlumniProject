import apiClient from './apiClient';

export const studentService = {
  getMyProfile: async () => {
    const response = await apiClient.get('/students/me');
    return response.data;
  },

  updateMyProfile: async (profileData) => {
    const response = await apiClient.put('/students/me', profileData);
    return response.data;
  },
};
