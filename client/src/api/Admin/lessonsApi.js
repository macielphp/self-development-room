import api from '../axiosInstance';

const API_URL = '/admin/lessons';

export const getAllLessons = async () => {
    const res = await api.get(API_URL);
    return res.data;
};

export const getLessonById = async (id) => {
    const res = await api.get(`${API_URL}/${id}`)
    return res.data;
};

export const createLesson = async (season_id, title, lesson_content) => {
    await api.post(API_URL, {season_id, title, lesson_content});
};

export const updateLesson = async (id, language_id, title, lesson_content, lesson_order) => {
    await api.put(API_URL, {id, language_id, title, lesson_content, lesson_order});
};

export const deleteLesson = async (id) => {
    await api.delete(API_URL, {data: { id }});
};