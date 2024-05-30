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
import AddAirworthinessComponent from "./components/fleet/airworthiness/AddAirworthinessComponent";
import SettingsPage from "./pages/settings/SettingsPage";
import DestinationsPage from "./pages/destinations/DestinationsPage";
import AddDestinationComponent from "./components/destinations/AddDestinationComponent";
import BookingsPage from "./pages/bookings/BookingsPage";
import BookingViewComponent from "./components/bookings/BookingViewComponent";
import PaymentsPage from "./pages/payments/PaymentsPage";
import PaymentViewComponent from "./components/payments/PaymentViewComponent";
import PeoplePage from "./pages/people/PeoplePage";
import AddPeopleComponent from "./components/people/AddPeopleComponent";
import PeopleViewComponent from "./components/people/PeopleViewComponent";
import ProfilePage from "./pages/profile/ProfilePage";

// Protected Routes
import ProtectedRoute from "./protectedroute/ProtectedRoute";
import CalendarPage from "./pages/calendar/CalendarPage";

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
        <Route
          path="/payments"
          element={wrapWithProtectedRoute(<PaymentsPage />)}
        />
        <Route
          path="/payments/:id/"
          element={wrapWithProtectedRoute(<PaymentViewComponent />)}
        />
        <Route path={"/calendar"} element={<CalendarPage />} />
        <Route
          path={"/people"}
          element={wrapWithProtectedRoute(<PeoplePage />)}
        />
        <Route
          path={"/people/add-people"}
          element={wrapWithProtectedRoute(<AddPeopleComponent />)}
        />

        <Route
          path={"/people/:id/"}
          element={wrapWithProtectedRoute(<PeopleViewComponent />)}
        />
        <Route
          path={"/profile"}
          element={wrapWithProtectedRoute(<ProfilePage />)}
        />
      </Route>
    </Routes>
  );
};
export default MainRouter;
