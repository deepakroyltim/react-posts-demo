import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ErrorProvider } from "./contexts/ErrorContext";

ReactDOM.render(
  <ThemeProvider>
    <ErrorProvider>
      <App />
    </ErrorProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
