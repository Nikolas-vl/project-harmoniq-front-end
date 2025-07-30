import PopularArticles from '../../modules/PopularArticles/PopularArticles';
import Creators from '../../modules/Creators/Creators';
import Hero from '../../modules/Hero/Hero';
import About from '../../modules/About/About';
import NothingFoundCard from '../../modules/NothingFoundCard/NothingFoundCard';

const HomePage = () => {
  return (
    <>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
      <Hero />
      <About />
      <PopularArticles />
      <Creators />
      <NothingFoundCard />
      </div>
    </>
  );
};

export default HomePage;
