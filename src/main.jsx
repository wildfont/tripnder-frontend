import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./context/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </LocalizationProvider>
  </BrowserRouter>,
);
