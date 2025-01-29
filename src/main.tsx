import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const theme = createTheme({
  typography: {
    fontSize: 12
  },
  palette: {
    mode: "dark",
  },
});
createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
