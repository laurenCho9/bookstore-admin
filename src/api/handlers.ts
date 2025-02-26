import { http, HttpResponse } from "msw";
import { mockBooks } from "./mockData";
import { TBook } from "../types/book";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const handlers = [
  http.get(`${API_URL}/api/books`, () => {
    return HttpResponse.json(mockBooks);
  }),

  http.get(`${API_URL}/api/books/:id`, ({ params }) => {
    const book = mockBooks.find((b) => b.id === Number(params.id));
    return book ? HttpResponse.json(book) : new Response(null, { status: 404 });
  }),

  http.post(`${API_URL}/api/books`, async ({ request }) => {
    const newBook = (await request.json()) as Partial<TBook>;
    if (!newBook) return new Response(null, { status: 400 }); // newBook이 null이면 에러 반환

    const bookWithId: TBook = {
      id: mockBooks.length + 1,
      title: newBook.title || "Unknown Title",
      author: newBook.author || "Unknown Author",
      publishedDate: newBook.publishedDate || "Unknown Date",
    };

    mockBooks.push(bookWithId);
    return HttpResponse.json(bookWithId, { status: 201 });
  }),

  http.put(`${API_URL}/api/books/:id`, async ({ params, request }) => {
    const updatedBook = (await request.json()) as Partial<TBook>;
    if (!updatedBook || typeof updatedBook !== "object")
      return new Response(null, { status: 400 });

    const index = mockBooks.findIndex((b) => b.id === Number(params.id));
    if (index === -1) return new Response(null, { status: 404 });

    mockBooks[index] = { ...mockBooks[index], ...updatedBook };

    return HttpResponse.json(mockBooks[index]);
  }),

  http.delete(`${API_URL}/api/books/:id`, ({ params }) => {
    const index = mockBooks.findIndex((b) => b.id === Number(params.id));
    if (index === -1) return new Response(null, { status: 404 });
    mockBooks.splice(index, 1);
    return new Response(null, { status: 204 });
  }),
];
