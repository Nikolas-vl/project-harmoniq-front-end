import PopularArticles from '../../modules/PopularArticles/PopularArticles';
import Authors from '../../modules/Authors/Authors';
import Hero from '../../modules/Hero/Hero';
import About from '../../modules/About/About';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <PopularArticles />
      <Authors />
    </>
  );
};

export default HomePage;
