import api from "../axiosInstance";

export const getAlternativesByQuestion = (questionId) => api.get(`/admin/alternatives/question/${questionId}`);
export const createAlternative = (questionId, data) => api.post(`/admin/alternatives`, { question_id: questionId, ...data });
export const updateAlternative = (id, data) => api.put(`/admin/alternatives/${id}`, data);
export const deleteAlternative = (id) => api.delete(`/admin/alternatives/${id}`);
export const markAsCorrect = (id) => api.put(`/admin/alternatives/${id}`, { correct: true });
