import axios from 'axios';

const API_URL = 'http://localhost:3001/admin/languages';

export const getAllLanguages = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createLanguage = async (name) => {
  const response = await axios.post(API_URL, { name });
  return response.data;
};

export const updateLanguage = async (oldName, newName) => {
  const response = await axios.put(API_URL, { oldName, newName });
  return response.data;
};

export const deleteLanguage = async (name) => {
  const response = await axios.delete(API_URL, { data: { name } });
  return response.data;
};
