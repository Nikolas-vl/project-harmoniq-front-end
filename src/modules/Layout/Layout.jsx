import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = ({ children }) => {
  return (
    <>
      {<Header />}
      <main>{children}</main>
      {<Footer />}
    </>
  );
};

export default Layout;
