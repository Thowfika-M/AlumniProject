import apiClient from './apiClient';

export const mentorshipService = {
  requestMentorship: async (alumniId) => {
    const response = await apiClient.post('/mentorship/requests', { alumniId });
    return response.data;
  },

  getMyRequests: async () => {
    const response = await apiClient.get('/mentorship/requests');
    return response.data;
  },

  respondToRequest: async (id, status) => {
    const response = await apiClient.put(`/mentorship/${id}/status`, null, { params: { status } });
    return response.data;
  },
};
