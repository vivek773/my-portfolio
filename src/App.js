// App Component

// Default
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";

// MUI theme
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

// Utils
import theme from "./utils/Theme";

// Custom
import ToastAlertComponent from "./components/toast/ToastComponent";

// Main router
import MainRouter from "./routes";

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
        <ToastAlertComponent />
        <Router>
          <MainRouter />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
