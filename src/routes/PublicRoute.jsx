import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isAuthenticated = false;

  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
