import api from './apiClient';

export const sendChatMessage = async (prompt, conversationId = null, mode = 'CAREER_GUIDANCE') => {
  const response = await api.post('/ai/chat', {
    prompt,
    conversationId,
    mode,
  });
  return response.data;
};

export const getUserConversations = async () => {
  const response = await api.get('/ai/conversations');
  return response.data;
};

export const getConversationDetails = async (conversationId) => {
  const response = await api.get(`/ai/conversations/${conversationId}`);
  return response.data;
};

export const deleteConversation = async (conversationId) => {
  const response = await api.delete(`/ai/conversations/${conversationId}`);
  return response.data;
};

export const getAICareerAdvice = async (targetRole) => {
  const response = await api.post('/ai/career-advice', { targetRole });
  return response.data;
};

export const getAIResumeFeedback = async (resumeText, targetRole = 'Software Engineer') => {
  const response = await api.post('/ai/resume-feedback', { resumeText, targetRole });
  return response.data;
};
