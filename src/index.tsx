import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeChanger } from "./Theme/ThemeProvider";
import { StoreProvider } from "./Redux/StoreProvider";

ReactDOM.render(
  // <React.StrictMode>
  <StoreProvider>
    <ThemeChanger>
      <App />
    </ThemeChanger>
  </StoreProvider>,
  /* </React.StrictMode> */
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
