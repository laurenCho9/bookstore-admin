import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const getBooks = async () => {
  const response = await axios.get(`${API_URL}/api/books`);
  return response.data;
};
