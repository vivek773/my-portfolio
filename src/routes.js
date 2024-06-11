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

import UserPage from "./pages/user/UserPage";
import AddUserComponent from "./components/user/AddUserComponent";
import UserViewComponent from "./components/user/UserViewComponent";
import ProfilePage from "./pages/profile/ProfilePage";
import DestinationViewComponent from "./components/destinations/DestinationViewComponent";
import ScheduledPaymentViewComponent from "./components/scheduled-payments/ScheduledPaymentViewComponent";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";

// Protected Routes
import ProtectedRoute from "./protectedroute/ProtectedRoute";
import CalendarPage from "./pages/calendar/CalendarPage";
import ScheduledPaymentsPage from "./pages/scheduled-payments/ScheduledPaymentsPage";
import CreateBookingPage from "./pages/bookings/CreateBookingPage";

const MainRouter = () => {
  const wrapWithProtectedRoute = (children) => {
    return <ProtectedRoute>{children}</ProtectedRoute>;
  };

  return (
    <Routes>
      <Route path={"register"} element={<SignupPage />} />
      <Route path={"login"} element={<LoginPage />} />
      <Route path={"forgot-password"} element={<ForgetPassword />} />
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
          path="/destinations/:id"
          element={wrapWithProtectedRoute(<DestinationViewComponent />)}
        />
        <Route
          path="/bookings"
          element={wrapWithProtectedRoute(<BookingsPage />)}
        />
        <Route
          path="/bookings/create-booking"
          element={wrapWithProtectedRoute(<CreateBookingPage />)}
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
          path="/schedule-payments"
          element={wrapWithProtectedRoute(<ScheduledPaymentsPage />)}
        />
        <Route
          path="/payments/:id/"
          element={wrapWithProtectedRoute(<PaymentViewComponent />)}
        />
        <Route
          path="/schedule-payments/:id/"
          element={wrapWithProtectedRoute(<ScheduledPaymentViewComponent />)}
        />
        <Route path={"/calendar"} element={<CalendarPage />} />
        <Route path={"/users"} element={wrapWithProtectedRoute(<UserPage />)} />
        <Route
          path={"/users/add-User"}
          element={wrapWithProtectedRoute(<AddUserComponent />)}
        />

        <Route
          path={"/users/:id/"}
          element={wrapWithProtectedRoute(<UserViewComponent />)}
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
