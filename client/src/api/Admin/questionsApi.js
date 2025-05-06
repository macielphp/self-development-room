import api from "../axiosInstance";

export const getQuestionsByLesson = (lessonId) => api.get(`/admin/questions/lesson/${lessonId}`);
export const createQuestion = (lessonId, data) => api.post(`/admin/questions/questions`, { lesson_id: lessonId, ...data });
export const updateQuestion = (id, data) => api.put(`/admin/questions/${id}`, data);
export const deleteQuestion = (id) => api.delete(`/admin/questions/${id}`);
