import React from "react";
import ReactDOM from "react-dom";

import "./index.css"; // Importing the CSS file for styling
import App from "./App"; // Importing the main App component
import { AppProvider } from "./contexts/AppContext"; // Importing the context provider for state management

// Rendering the App component wrapped in the AppProvider context provider
ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root") // Mounting the app to the root DOM element
);
