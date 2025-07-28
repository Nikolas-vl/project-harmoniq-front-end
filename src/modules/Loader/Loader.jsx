import { useSelector } from 'react-redux';
import { PacmanLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import styles from './Loader.module.css';

const Loader = ({ size = 50, color = '#4fa94d', fullScreen = true }) => {
  const isLoading = useSelector(state => state.global.isLoading);

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

Loader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default Loader;
