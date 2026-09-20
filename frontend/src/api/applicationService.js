import apiClient from './apiClient';

export const applicationService = {
  applyForJob: async (jobId, applicationData) => {
    const response = await apiClient.post(`/jobs/${jobId}/applications`, applicationData);
    return response.data;
  },

  getMyApplications: async () => {
    const response = await apiClient.get('/applications/me');
    return response.data;
  },

  getJobApplications: async (jobId) => {
    const response = await apiClient.get(`/jobs/${jobId}/applications`);
    return response.data;
  },

  getAlumniAllApplications: async () => {
    const response = await apiClient.get('/applications/alumni/all');
    return response.data;
  },

  updateStatus: async (applicationId, status) => {
    const response = await apiClient.put(`/applications/${applicationId}/status`, { status });
    return response.data;
  },
};
