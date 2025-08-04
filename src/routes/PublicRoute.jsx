import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../redux/auth/authSelectors';

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsLoggedIn);

  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
