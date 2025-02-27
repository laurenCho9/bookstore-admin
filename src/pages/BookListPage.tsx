import { useEffect, useState } from "react";
import { addBook, getBooks } from "../api/bookApi";
import Pagenation from "../common/Pagenation";
import { useNavigate } from "react-router-dom";
import Modal from "../common/Modal";

const ITEMS_PER_PAGE = 10; // 한 페이지당 보여줄 개수

const BookListPage = () => {
  // ---------------------------------------------------------------
  // 초기 변수 설정
  // ---------------------------------------------------------------
  // 책 목록 리스트
  const [books, setBooks] = useState<
    { id: number; title: string; author: string }[]
  >([]);
  // 입력 필드 상태
  const [inputSearchTerm, setInputSearchTerm] = useState("");
  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");
  // 모달, 목록 추가 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    quantity: 1,
  });
  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---------------------------------------------------------------
  // API, useEffect
  // ---------------------------------------------------------------
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        console.log("📚 API 응답 데이터:", data); // 🔥 확인용 로그 추가
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // ---------------------------------------------------------------
  // private methods
  // ---------------------------------------------------------------
  // 🔍 검색 필터 적용
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📖 페이지네이션 적용
  const totalPage = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const displayedBooks = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const navigate = useNavigate();

  if (loading) return <p>📚 책 목록을 불러오는 중...</p>;
  if (error) return <p>❌ {error}</p>;

  // ---------------------------------------------------------------
  // Handler
  // ---------------------------------------------------------------
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 검색 버튼 클릭 시 실행될 함수
  const handleSearch = () => {
    setSearchTerm(inputSearchTerm); // 검색어 업데이트
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  // 🔥 Enter 키로 검색 실행
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewBook({ title: "", author: "", quantity: 1 });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author || newBook.quantity < 1) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    try {
      await addBook({
        title: newBook.title,
        author: newBook.author,
        quantity: Number(newBook.quantity),
      });
      alert("📚 책이 추가되었습니다!");
      handleCloseModal(); // 모달 닫기

      const updatedBooks = await getBooks();
      setBooks(updatedBooks);
    } catch (error) {
      alert("❌ 책 추가 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container board-container">
      <div className="flex justify-between">
        <h3 className="flex gap-6">
          <img width="38px" height="32px" src="/bookstore.png" />
          서점 관리자
        </h3>
        <button className="generate-button" onClick={handleOpenModal}>
          추가
        </button>
      </div>
      {/* 🔍 검색 입력 필드 */}
      <div className="search-box">
        <input
          type="text"
          placeholder="책 제목 또는 저자를 검색하세요"
          value={inputSearchTerm}
          onChange={(e) => setInputSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress} // Enter 키 이벤트 추가
        />
        <button onClick={handleSearch}>검색</button>
      </div>

      {/* 📖 책 리스트 */}
      <table className="table-board">
        <thead>
          <tr>
            <th className="no">NO</th>
            <th className="subject">책 제목</th>
            <th className="writer">저자</th>
          </tr>
        </thead>
        <tbody>
          {displayedBooks.length > 0 ? (
            displayedBooks.map((book) => (
              <tr key={book.id}>
                <td className="no">{book.id}</td>
                <td
                  className="subject"
                  onClick={() => navigate(`/books/${book.id}`)}
                >
                  {book.title}
                </td>
                <td className="writer">{book.author}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="no-results">
                🔍 검색 결과가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 📄 페이지네이션 컴포넌트 */}
      {filteredBooks.length > 0 && (
        <Pagenation
          data={{ currentPage, totalPage }}
          maxPagesToShowNum={3}
          onPageChange={handlePageChange}
        />
      )}

      {/* 모달 컴포넌트 */}
      <Modal isOpen={isModalOpen}>
        <h3>📚 새 책 추가</h3>
        <label>
          제목:
          <input
            type="text"
            name="title"
            value={newBook.title}
            onChange={handleChange}
          />
        </label>
        <label>
          저자:
          <input
            type="text"
            name="author"
            value={newBook.author}
            onChange={handleChange}
          />
        </label>
        <label>
          수량:
          <input
            type="number"
            name="quantity"
            value={newBook.quantity}
            onChange={handleChange}
            min="1"
          />
        </label>
        <div className="modal-button-wrap">
          <button className="close-button" onClick={handleCloseModal}>
            취소
          </button>
          <button className="add-book-button" onClick={handleAddBook}>
            추가
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BookListPage;
