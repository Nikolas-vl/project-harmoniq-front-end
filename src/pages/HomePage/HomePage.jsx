import PopularArticles from '../../modules/PopularArticles/PopularArticles';
import Creators from '../../modules/Creators/Creators';
import Hero from '../../modules/Hero/Hero';
import About from '../../modules/About/About';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <PopularArticles />
      <Creators />
    </>
  );
};

export default HomePage;
