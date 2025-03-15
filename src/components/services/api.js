import axios from 'axios';

const API_URL = 'http://localhost:5000/api/news'; 

export const fetchNews = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addNews = async (newsData) => {
  const response = await axios.post(API_URL, newsData);
  return response.data;
};

export const updateNews = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('API Error updating news:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteNews = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
