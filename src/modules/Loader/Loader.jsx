import { useSelector } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import styles from './Loader.module.css';
import { selectIsLoading } from '../../redux/loader/loaderSelectors';

const Loader = () => {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) return null;

  return (
    <>
      <div
        className={styles.overlay}
        role="status"
        aria-live="polite"
        aria-label="Loading content..."
      ></div>
      <div className={styles.fixedCenter}>
        <PacmanLoader size={50} color={'#4fa94d'} aria-hidden="true" />
      </div>
    </>
  );
};

export default Loader;
