import { Toaster } from 'react-hot-toast';
import Layout from './modules/Layout/Layout';
import AppRoutes from './routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/authOperations';
import { useEffect } from 'react';
import { selectUserToken } from './redux/auth/authSelectors';

function App() {
  const dispatch = useDispatch();
const token = useSelector(selectUserToken)
  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
    
  }, [dispatch, token]);

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
