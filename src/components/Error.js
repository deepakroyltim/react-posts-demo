import { useAppContext } from "../contexts/AppContext";

const Error = () => {
  // Destructure the error state from the custom context hook
  const { error } = useAppContext();

  // If there is no error, return null to render nothing
  if (!error) {
    return null;
  }

  // If there is an error, display it in a div with the class 'error'
  return <div className="error">{error}</div>;
};

export default Error;
