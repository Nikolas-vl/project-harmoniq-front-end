import PopularArticles from '../../modules/PopularArticles/PopularArticles';
import Creators from '../../modules/Creators/Creators';
import Hero from '../../modules/Hero/Hero';
import About from '../../modules/About/About';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const authState = useSelector(state => state.auth);

  return (
    <>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {JSON.stringify(authState, null, 2)}
      </pre>
      <Hero />
      <About />
      <PopularArticles />
      <Creators />
    </>
  );
};

export default HomePage;
