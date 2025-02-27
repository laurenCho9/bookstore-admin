import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById, updateBookQuantity } from "../api/bookApi";
import Modal from "../common/Modal";

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
  // 모달, 목록 수정 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuantity, setNewQuantity] = useState(0);
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
        setNewQuantity(data.quantity); // 현재 수량으로 초기값 설정
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

  // ---------------------------------------------------------------
  // Handler
  // --------------
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewQuantity(book?.quantity || 0);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuantity(Number(e.target.value));
  };

  const handleSave = async () => {
    if (book) {
      try {
        await updateBookQuantity(book.id, newQuantity);
        setBook((prev) => (prev ? { ...prev, quantity: newQuantity } : prev));
        alert("✅ 수량이 수정되었습니다.");
        handleCloseModal();
      } catch (error) {
        alert("❌ 수량 수정 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="container board-container">
      <div className="flex justify-between">
        <h3>
          <img width="38px" height="32px" src="/bookstore.png" />
          {book?.title}
        </h3>
        <button className="generate-button" onClick={handleOpenModal}>
          수정
        </button>
      </div>
      <p>
        <strong>저자:</strong> {book?.author}
      </p>
      <p>
        <strong>수량:</strong> {book?.quantity}
      </p>
      {/* ✅ 모달 컴포넌트 */}
      <Modal isOpen={isModalOpen}>
        <h3>📖 책 정보 수정</h3>
        <label>
          제목:
          <input type="text" value={book?.title} disabled />
        </label>
        <label>
          저자:
          <input type="text" value={book?.author} disabled />
        </label>
        <label>
          수량:
          <input
            type="number"
            value={newQuantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </label>
        <div className="modal-button-wrap">
          <button className="close-button" onClick={handleCloseModal}>
            취소
          </button>
          <button className="add-book-button" onClick={handleSave}>
            저장
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BookDetailPage;
