// Routes

// Default
import { Routes, Route } from "react-router-dom";

// Pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import Page404 from "./pages/404/404Page";
import DashboardLayout from "./layout/layout";
import FleetPage from "./pages/fleet/FleetPage";
import AddPlaneComponent from "./components/fleet/AddPlaneComponent";
import PlaneDetailComponent from "./components/fleet/PlaneDetailComponent";

// Protected Routes
import ProtectedRoute from "./protectedroute/ProtectedRoute";

const MainRouter = () => {
  const wrapWithProtectedRoute = (children) => {
    return <ProtectedRoute>{children}</ProtectedRoute>;
  };

  return (
    <Routes>
      <Route path={"register"} element={<SignupPage />} />
      <Route path={"login"} element={<LoginPage />} />
      <Route path={"/"} element={wrapWithProtectedRoute(<DashboardLayout />)}>
        <Route path={"fleet"} element={wrapWithProtectedRoute(<FleetPage />)} />
        <Route
          path={"fleet/add-plane"}
          element={wrapWithProtectedRoute(<AddPlaneComponent />)}
        />
        <Route path={"*"} element={<Page404 />} />
        <Route
          path="/fleet/:id"
          element={wrapWithProtectedRoute(<PlaneDetailComponent />)}
        />
      </Route>
    </Routes>
  );
};
export default MainRouter;
