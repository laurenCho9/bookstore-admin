import { Route, Routes } from "react-router-dom";

import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Detail from "../pages/Detail";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;
