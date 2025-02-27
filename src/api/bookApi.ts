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

// 책 추가
export const addBook = async (book: {
  title: string;
  author: string;
  quantity: number;
}) => {
  const response = await axios.post(`${API_URL}/api/books`, book);
  return response.data;
};

// 책 정보 수정 (수량 조절)
export const updateBookQuantity = async (id: number, quantity: number) => {
  const response = await axios.put(`${API_URL}/api/books/${id}`, { quantity });
  return response.data;
};

// 책 삭제
export const deleteBook = async (id: number) => {
  const response = await axios.delete(`${API_URL}/api/books/${id}`);
  return response.data;
};
