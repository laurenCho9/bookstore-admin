import { Route, Routes } from "react-router-dom";

import NotFound from "../pages/NotFound";
import BookListPage from "../pages/BookListPage";
import BookDetailPage from "../pages/BookDetailPage";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BookListPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;
