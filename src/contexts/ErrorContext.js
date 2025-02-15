import { createContext, useContext, useState } from "react";

const ErrorContext = createContext();
export const useError = () => useContext(ErrorContext);
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(false);

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  return (
    <ErrorContext.Provider value={{ error, showError }}>
      {children}
    </ErrorContext.Provider>
  );
};
