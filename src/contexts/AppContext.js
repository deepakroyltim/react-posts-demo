import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme == "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, error, showError }}>
      {children}
    </AppContext.Provider>
  );
};

export { useAppContext, AppProvider };
