import api from '../axiosInstance';

const API_URL = 'http://localhost:3001/admin/seasons/'

export const getAllSeasons = async () => {
    const res = await api.get(API_URL);
    return res.data;
};

export const createSeason = async (title, language_id) => {
    await api.post(API_URL, { title, language_id });
};

export const updateSeason = async (id, title) => {
    await api.put(API_URL, { id, title });
}

export const deleteSeason = async (id) => {
    await api.delete(API_URL, { data: { id } })
};