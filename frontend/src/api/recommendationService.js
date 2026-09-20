import apiClient from './apiClient';

export const recommendationService = {
  getCareerTemplates: async () => {
    const response = await apiClient.get('/recommendations/career-templates');
    return response.data;
  },

  analyzeSkillGap: async (careerTemplateId) => {
    const response = await apiClient.post('/recommendations/skill-gap', null, {
      params: { careerTemplateId },
    });
    return response.data;
  },

  getRecommendedJobs: async () => {
    const response = await apiClient.get('/recommendations/jobs');
    return response.data;
  },

  getRecommendedAlumni: async () => {
    const response = await apiClient.get('/recommendations/alumni');
    return response.data;
  },
};
