import React from 'react';
import ReactDOM from 'react-dom/client';
import Start from './Start';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";


const theme = createTheme({
  palette: {
      primary: {
          main: '#05445E',
          contrastText: '#D4F1F4',
      },
      secondary: {
          main: '#189AB4',
          contrastText: '#05445E',
      },
      background: {
          paper: "D4F1F4",
          default: "#189AB4"
      },
      text: {
          primary: '#D4F1F4',
          secondary:'#05445E'
      }
  },
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
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
