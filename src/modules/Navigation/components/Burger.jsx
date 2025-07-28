import styles from '../Navigation.module.css';

const Burger = ({ onClick, isOpen }) => {
  return (
    <button className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={onClick}>
      <span className={styles.hamburgerLine}></span>
      <span className={styles.hamburgerLine}></span>
      <span className={styles.hamburgerLine}></span>
    </button>
  );
};

export default Burger;
