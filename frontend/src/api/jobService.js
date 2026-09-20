import apiClient from './apiClient';

export const jobService = {
  getAllJobs: async (query = '', jobType = '', status = 'OPEN') => {
    const response = await apiClient.get('/jobs', {
      params: { query, jobType, status },
    });
    return response.data;
  },

  getJobById: async (id) => {
    const response = await apiClient.get(`/jobs/${id}`);
    return response.data;
  },

  getMyPostedJobs: async () => {
    const response = await apiClient.get('/jobs/my-posted');
    return response.data;
  },

  createJob: async (jobData) => {
    const response = await apiClient.post('/jobs', jobData);
    return response.data;
  },

  updateJob: async (id, jobData) => {
    const response = await apiClient.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  deleteJob: async (id) => {
    const response = await apiClient.delete(`/jobs/${id}`);
    return response.data;
  },
};
