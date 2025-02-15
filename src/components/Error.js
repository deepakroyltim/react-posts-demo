import { useError } from "../contexts/ErrorContext";

const Error = () => {
  const { error } = useError();
  if (!error) {
    return null;
  }
  return <div className="error">{error}</div>;
};

export default Error;
