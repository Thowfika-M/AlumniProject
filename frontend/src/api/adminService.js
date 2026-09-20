import api from './apiClient';

export const getAdminStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

export const getAdminUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const toggleUserStatus = async (userId) => {
  const response = await api.put(`/admin/users/${userId}/toggle-status`);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};

export const getAdminJobs = async () => {
  const response = await api.get('/admin/jobs');
  return response.data;
};

export const deleteJob = async (jobId) => {
  const response = await api.delete(`/admin/jobs/${jobId}`);
  return response.data;
};

export const getAdminAuditLogs = async () => {
  const response = await api.get('/admin/audit-logs');
  return response.data;
};
