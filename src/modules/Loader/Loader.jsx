import { Puff } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderBackdrop}>
      <div className={styles.loaderContent}>
        <Puff
          height={100}
          width={100}
          radius={1}
          color="#6C63FF"
          ariaLabel="puff-loading"
          visible={true}
        />
        <p className={styles.loaderText}>Loading Harmoniq...</p>
      </div>
    </div>
  );
};

export default Loader;
