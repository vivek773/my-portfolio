//Entry
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ActiveTabProvider } from "./context/activeTab";

//Css
import "./styles/_index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ActiveTabProvider>
      <App />
    </ActiveTabProvider>
  </React.StrictMode>
);
