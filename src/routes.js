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
import AddAirworthinessComponent from "./components/fleet/airworthiness/AddAirworthinessComponent"
import SettingsPage from "./pages/settings/SettingsPage";
import DestinationsPage from "./pages/destinations/DestinationsPage";
import AddDestinationComponent from "./components/destinations/AddDestinationComponent";
import BookingsPage from "./pages/bookings/BookingsPage";
import BookingViewComponent from "./components/bookings/BookingViewComponent";

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
        <Route
          path="/fleet/:id/create-airworthiness"
          element={wrapWithProtectedRoute(<AddAirworthinessComponent />)}
        />
        <Route
          path="/settings"
          element={wrapWithProtectedRoute(<SettingsPage />)}
        />
        <Route
          path="/destinations"
          element={wrapWithProtectedRoute(<DestinationsPage />)}
        />
         <Route
          path="/destinations/add-destination"
          element={wrapWithProtectedRoute(<AddDestinationComponent />)}
        />
        <Route
          path="/bookings"
          element={wrapWithProtectedRoute(<BookingsPage />)}
        />
        <Route
          path="/bookings/:id/"
          element={wrapWithProtectedRoute(<BookingViewComponent />)}
        />
      </Route>
    </Routes>
  );
};
export default MainRouter;
