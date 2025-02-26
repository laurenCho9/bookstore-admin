import {
  leftArrow,
  leftDoubleArrow,
  rightArrow,
  rightDoubleArrow,
} from "../assets/img/icons";

interface PaginationProps {
  data: {
    currentPage: number;
    totalPage: number;
  };
  maxPagesToShowNum: number;
  onPageChange: (page: number) => void;
}

const Pagenation = ({
  data,
  maxPagesToShowNum,
  onPageChange,
}: PaginationProps) => {
  const { currentPage, totalPage } = data;

  // if (maxPagesToShowNum === undefined || maxPagesToShowNum === 0) {
  //   maxPagesToShowNum = 10;
  // }

  const handlePageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const renderPagination = () => {
    const arrowBtPrev = [];
    const arrowBtNext = [];
    const pagesBt = [];

    const currentGroup = Math.ceil(currentPage / maxPagesToShowNum);
    const startPage = (currentGroup - 1) * maxPagesToShowNum + 1;
    const endPage = Math.min(startPage + maxPagesToShowNum - 1, totalPage);

    // NOTE 리스트가 0개일 때도 페이지네이션에 1페이지로 보이게 처리 및 화살표 비활성화
    if (totalPage === 0) {
      pagesBt.push(
        <button
          key={1}
          className={`page-number ${currentPage === 1 ? "active" : ""}`}
        >
          {1}
        </button>
      );

      // 화살표 버튼 비활성화
      // «
      arrowBtPrev.push(
        <button
          key="first"
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          className="arrow first disabled"
        ></button>
      );
      // ‹
      arrowBtPrev.push(
        <button
          key="prev"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="arrow prev disabled"
        ></button>
      );
      // ›
      arrowBtNext.push(
        <button
          key="next"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPage || totalPage === 0}
          className="arrow next disabled"
        ></button>
      );
      // »
      arrowBtNext.push(
        <button
          key="last"
          onClick={() => handlePageClick(totalPage)}
          disabled={currentPage === totalPage || totalPage === 0}
          className="arrow last disabled"
        ></button>
      );
    } else {
      for (let i = startPage; i <= endPage; i++) {
        // 페이지 번호 버튼 추가
        pagesBt.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`page-number ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }

      // 화살표 버튼 추가
      arrowBtPrev.push(
        <button
          key="first"
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          className={`arrow first ${currentPage === 1 ? "disabled" : ""}`}
        >
          <img src={leftDoubleArrow} alt="First Page" />
        </button>
      );
      arrowBtPrev.push(
        <button
          key="prev"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`arrow prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          <img src={leftArrow} alt="Previous Page" />
        </button>
      );
      arrowBtNext.push(
        <button
          key="next"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPage}
          className={`arrow next ${
            currentPage === totalPage ? "disabled" : ""
          }`}
        >
          <img src={rightArrow} alt="Next Page" />
        </button>
      );
      arrowBtNext.push(
        <button
          key="last"
          onClick={() => handlePageClick(totalPage)}
          disabled={currentPage === totalPage}
          className={`arrow last ${
            currentPage === totalPage ? "disabled" : ""
          }`}
        >
          <img src={rightDoubleArrow} alt="Last Page" />
        </button>
      );
    }

    return (
      <div className="pagenation">
        {arrowBtPrev}
        <div className="num">{pagesBt}</div>
        {arrowBtNext}
      </div>
    );
  };

  return <>{renderPagination()}</>;
};

export default Pagenation;
