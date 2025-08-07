import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from './modules/Layout/Layout';
import AppRoutes from './routes/AppRoutes';
import Loader from './modules/Loader/Loader';
import { setNavigateHandler } from './utils/navigationService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refreshUser } from './redux/auth/authOperations';
import { ScrollToTop } from './utils/scrollToTop';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    setNavigateHandler(navigate);
  }, [navigate]);

  return (
    <>
      <Toaster position="top-center" />
      <ScrollToTop />

      <Layout>
        <Loader />
        <AppRoutes />
      </Layout>
    </>
  );
}

export default App;
