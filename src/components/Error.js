import { useAppContext } from "../contexts/AppContext";

const Error = () => {
  const { error } = useAppContext();
  if (!error) {
    return null;
  }
  return <div className="error">{error}</div>;
};

export default Error;
