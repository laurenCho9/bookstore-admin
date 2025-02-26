import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../api/bookApi";

const BookDetailPage = () => {
  // ---------------------------------------------------------------
  // 초기 변수 설정
  // ---------------------------------------------------------------
  const { id } = useParams();
  const [book, setBook] = useState<{
    id: number;
    title: string;
    author: string;
    quantity: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---------------------------------------------------------------
  // API, useEffect
  // ---------------------------------------------------------------
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(Number(id));
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError("책 정보를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // ---------------------------------------------------------------
  // private methods
  // ---------------------------------------------------------------
  if (loading) return <p>📖 책 정보를 불러오는 중...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div className="container book-detail-container">
      <h3>{book?.title}</h3>
      <p>
        <strong>저자:</strong> {book?.author}
      </p>
      <p>
        <strong>수량:</strong> {book?.quantity}
      </p>
    </div>
  );
};

export default BookDetailPage;
