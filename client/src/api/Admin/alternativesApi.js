import api from "../axiosInstance";

const API_URL = "/admin/alternatives";

export const getAlternativesByQuestion = async (questionId) => {
  const response = await api.get(`${API_URL}/question/${questionId}`);
  return response.data;
};

export const createAlternatives = async (questionId, data) => {
  const response = await api.post(API_URL, { question_id: questionId, ...data });
  return response.data;
};

export const updateAlternative = async (id, data) => {
  const response = await api.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteAlternative = async (id) => {
  const response = await api.delete(`${API_URL}/${id}`);
  return response.data;
};

export const markAsCorrect = async (id) => {
  const response = await api.put(`${API_URL}/${id}/correct`);
  return response.data;
};
