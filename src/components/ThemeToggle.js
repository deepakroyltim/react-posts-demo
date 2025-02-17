import React from "react";
import { useAppContext } from "../contexts/AppContext";

const ThemeToggle = () => {
  // Destructure theme and toggleTheme from the custom context hook
  const { theme, toggleTheme } = useAppContext();

  return (
    // Button to toggle the theme between light and dark
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
};

export default ThemeToggle;
