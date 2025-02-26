import { useEffect, useState } from "react";
import { getBooks } from "../api/bookApi";
import Pagenation from "../common/Pagenation";

const ITEMS_PER_PAGE = 10; // 한 페이지당 보여줄 개수

const BookListPage = () => {
  const [books, setBooks] = useState<
    { id: number; title: string; author: string }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <p>📚 책 목록을 불러오는 중...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div className="board-container">
      <h3 className="flex">
        <img width="38px" height="32px" src="/bookstore.png" />
        서점 관리자
      </h3>
      {/* 🔍 검색 입력 필드 */}
      <input
        type="text"
        placeholder="책 제목 또는 저자를 검색하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
      />

      {/* 📖 책 리스트 */}
      <div>
        {displayedBooks.length > 0 ? (
          displayedBooks.map((book) => (
            <div key={book.id}>
              <strong>{book.title}</strong> - {book.author}
            </div>
          ))
        ) : (
          <p>🔍 검색 결과가 없습니다.</p>
        )}
      </div>

      {/* 📄 페이지네이션 컴포넌트 */}
      {filteredBooks.length > 0 && (
        <Pagenation
          data={{ currentPage, totalPage }}
          maxPagesToShowNum={3}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default BookListPage;
