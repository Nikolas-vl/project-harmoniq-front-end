import { useSelector } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import styles from './Loader.module.css';
import { selectIsLoading } from '../../redux/loader/loaderSelectors';

const Loader = ({ size = 50, color = '#4fa94d', fullScreen = true }) => {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) return null;

  return (
    <div
      className={fullScreen ? styles.overlay : styles.inline}
      role="status"
      aria-live="polite"
      aria-label="Loading content..."
    >
      <PacmanLoader size={size} color={color} aria-hidden="true" />
    </div>
  );
};

export default Loader;
