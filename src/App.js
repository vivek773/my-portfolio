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

// Schedule
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-schedule/styles/schedule/material.css";

import { SYNC_FUSION_SCHEDULER_KEY } from "./utils/Constants";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(SYNC_FUSION_SCHEDULER_KEY);

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
