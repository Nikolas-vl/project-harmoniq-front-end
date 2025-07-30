import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Layout from './modules/Layout/Layout';
import AppRoutes from './routes/AppRoutes';
import { refreshUser } from './redux/auth/authOperations';
<<<<<<< HEAD
import Loader from './modules/Loader/Loader';
=======
>>>>>>> origin/main

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-center" />
      <Loader /> {}
      <Layout>
        <AppRoutes />
      </Layout>
    </>
  );
}

export default App;
