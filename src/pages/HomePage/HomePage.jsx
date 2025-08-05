import PopularArticles from '../../modules/PopularArticles/PopularArticles';
import Authors from '../../modules/Authors/Authors';
import Hero from '../../modules/Hero/Hero';
import About from '../../modules/About/About';

const HomePage = () => {
  return (
    <section>
      <Hero />
      <About />
      <PopularArticles />
      <Authors />
    </section>
  );
};

export default HomePage;
