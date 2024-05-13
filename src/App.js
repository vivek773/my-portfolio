// App Component

// Default
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// MUI theme
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

// Utils
import theme from "./utils/Theme";
import { LOGIN, SIGNUP, DASHBOARD } from "./utils/Constants";

// Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Page404 from "./pages/404";
import DashboardLayout from "./layout/index";

// Custom
import ToastAlert from "./components/toast";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={{
            body: {
              fontFamily: theme.typography.fontFamily,
              margin: 0,
              padding: 0,
              boxSizing: "border-box",
            },
          }}
        />
        <ToastAlert />
        <Router>
          <Routes>
            <Route path={SIGNUP} element={<Signup />} />
            <Route path={LOGIN} element={<Login />} />
            <Route path={"*"} element={<Page404 />} />
            <Route path={DASHBOARD} element={<DashboardLayout />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
