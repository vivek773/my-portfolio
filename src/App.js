// App Component

// Default
import { HelmetProvider } from "react-helmet-async";

// MUI theme
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

// Utils
import theme from "./utils/Theme";

// Pages
import Login from "./pages/auth/Login";

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
        <Login />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
