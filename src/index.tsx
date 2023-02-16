import React from "react";
import ReactDOM from "react-dom/client";
import Start from "./Start";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#48443f",
      contrastText: "#48443f",
    },
    secondary: {
      main: "#fbb484",
      contrastText: "#48443f",
    },
    background: {
      paper: "#transparent",
      default: "transparent",
    },
    text: {
      primary: "#48443f",
      secondary: "#48443f",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Start></Start>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
