import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = true;

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
