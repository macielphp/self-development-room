import api from "../axiosInstance";

const API_URL = "/admin/questions";

export const getQuestionsByLesson = async (lessonId) => {
  const response = await api.get(`${API_URL}/lesson/${lessonId}`);
  return response.data;
};

export const getQuestionById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

export const createQuestion = async (lessonId, data) => {
  const response = await api.post(API_URL, { lesson_id: lessonId,
  question: data.question });
  return response.data;
};

export const updateQuestion = async (id, data) => {
  const response = await api.put(`/admin/alternatives/${id}`, data);
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await api.delete(`/admin/questions/${id}`);
  return response.data;
};