import { Hero } from './modules/Hero/Hero';
import Layout from './modules/Layout/Layout';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Layout>
      <AppRoutes />
      <Hero />
    </Layout>
  );
}

export default App;
