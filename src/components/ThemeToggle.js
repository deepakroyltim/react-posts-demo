import React from "react";

import { useAppContext } from "../contexts/AppContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
};

export default ThemeToggle;
