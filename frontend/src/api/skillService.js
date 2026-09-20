import apiClient from './apiClient';

export const skillService = {
  getAllSkills: async () => {
    const response = await apiClient.get('/skills');
    return response.data;
  },

  createSkill: async (name) => {
    const response = await apiClient.post('/skills', null, { params: { name } });
    return response.data;
  },
};
