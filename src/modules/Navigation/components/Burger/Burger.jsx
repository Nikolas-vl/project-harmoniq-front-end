// import styles from './Burger.module.css';

// const Burger = ({ onClick, isOpen }) => {
//   return (
//     <button
//       className={`${styles.hamburger} ${isOpen ? styles.hamburger.open : ''}`}
//       onClick={onClick}
//       type="button"
//     >
//       {isOpen ? (
//         <span className={styles.closeButton}>&#x2715;</span> 
//       ) : (
//         <>
//           <span className={styles.hamburgerLine}></span>
//           <span className={styles.hamburgerLine}></span>
//           <span className={styles.hamburgerLine}></span>
//         </>
//       )}
//     </button>
//   );
// };

// export default Burger;
import styles from './Burger.module.css';

const Burger = ({ onClick, isOpen }) => {
  return (
    <button
      className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
      onClick={onClick}
      type="button"
    >
      <span className={styles.hamburgerLine}></span>
      <span className={styles.hamburgerLine}></span>
      <span className={styles.hamburgerLine}></span>
    </button>
  );
};

export default Burger;