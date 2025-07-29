import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Layout from './modules/Layout/Layout';
import AppRoutes from './routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/authOperations';
import { useEffect } from 'react';
// import { selectUserToken } from './redux/auth/authSelectors';
import Loader from './modules/Loader/Loader';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.global.isLoading);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isLoading) {
    return <Loader fullScreen size={50} color="#4fa94d" />;
  }

  return (
    <>
      <Toaster position="top-center" />
      <Layout>
        <AppRoutes />
      </Layout>
    </>
  );
}

export default App;
