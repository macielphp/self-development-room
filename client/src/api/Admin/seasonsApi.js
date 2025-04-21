import axios from 'axios';

const API_URL = 'http://localhost:3001/admin/seasons/'

export const getAllSeasons = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const createSeason = async (title, language_id) => {
    await axios.post(API_URL, { title, language_id });
};

export const updateSeason = async (id, title) => {
    await axios.put(API_URL, { id, title });
}

export const deleteSeason = async (id) => {
    await axios.delete(API_URL, { data: { id } })
};