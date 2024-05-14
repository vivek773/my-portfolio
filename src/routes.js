// Routes

// Default
import { Routes, Route } from "react-router-dom";

// Utils
import { LOGIN, SIGNUP, DASHBOARD } from "./utils/Constants";

// Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Page404 from "./pages/404";
import DashboardLayout from "./layout/index";
import Fleet from "./pages/fleet";

const MainRouter = () => {
  return (
    <Routes>
      <Route path={SIGNUP} element={<Signup />} />
      <Route path={LOGIN} element={<Login />} />
      <Route path={"*"} element={<Page404 />} />
      <Route path={"/"} element={<DashboardLayout />}>
        <Route path={DASHBOARD} element={<Fleet />} />
      </Route>
    </Routes>
  );
};
export default MainRouter;
