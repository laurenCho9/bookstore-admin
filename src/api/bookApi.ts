import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

// 책 목록 조회
export const getBooks = async () => {
  const response = await axios.get(`${API_URL}/api/books`);
  return response.data;
};

// 개별 책 상세 조회
export const getBookById = async (id: number) => {
  const response = await axios.get(`${API_URL}/api/books/${id}`);
  return response.data;
};
