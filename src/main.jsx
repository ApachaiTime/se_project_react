import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./vendor/font.css";
import App from "../src/components/App/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/se_project_react/">
      <App />
    </BrowserRouter>
  </StrictMode>
);
