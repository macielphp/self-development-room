import api from '../axiosInstance';

const API_URL = 'http://localhost:3001/admin/languages';

export const getAllLanguages = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

export const createLanguage = async (name) => {
  const response = await api.post(API_URL, { name });
  return response.data;
};

export const updateLanguage = async (oldName, newName) => {
  const response = await api.put(API_URL, { oldName, newName });
  return response.data;
};

export const deleteLanguage = async (name) => {
  const response = await api.delete(API_URL, { data: { name } });
  return response.data;
};
