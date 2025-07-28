import PopularArticles from '../../modules/PopularArticles/PopularArticles';
import Creators from '../../modules/Creators/Creators';
import Hero from "../../modules/Hero/Hero"

const HomePage = () => {
  return (
    <>
      <Hero />
      <PopularArticles />
      <Creators />
    </>
  );
};

export default HomePage;