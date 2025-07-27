import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Layout from './modules/Layout/Layout';
import AppRoutes from './routes/AppRoutes';
import Loader from './modules/Loader/Loader';

import { refreshUser } from './redux/auth/authOperations';

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(state => state.auth.isRefreshing);
  const isLoading = useSelector(state => state.global.isLoading);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const showLoader = isRefreshing || isLoading;

  return (
    <>
      <Toaster position="top-center" />
      {showLoader && <Loader />}
      {!showLoader && (
        <Layout>
          <AppRoutes />
        </Layout>
      )}
    </>
  );
}

export default App;
