import { createContext, useContext, useState, useEffect } from "react";

// Create a new context
const AppContext = createContext();

// Custom hook to use the AppContext
const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  // State for theme (light/dark)
  const [theme, setTheme] = useState("light");

  // State for error messages
  const [error, setError] = useState(false);

  // Function to toggle theme between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Effect to apply the theme to the document body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Function to show error message for 3 seconds
  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  // Combined context value containing theme and error state and their corresponding functions
  const contextValue = { theme, toggleTheme, error, showError };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Exporting custom hook and provider
export { useAppContext, AppProvider };
