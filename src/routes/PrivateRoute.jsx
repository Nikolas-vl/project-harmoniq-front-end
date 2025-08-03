import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../redux/auth/authSelectors';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsLoggedIn);

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
