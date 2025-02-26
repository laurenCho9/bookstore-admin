import { Route, Routes } from "react-router-dom";

import NotFound from "../pages/NotFound";
import Home from "../pages/BookListPage";
import Detail from "../pages/Detail";
import BookListPage from "../pages/BookListPage";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BookListPage />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;
