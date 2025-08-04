import { Link } from 'react-router-dom';
import styles from './CreateArticleButton.module.css';

const CreateArticle = () => {
  return (
    <>
      <Link to="/create" className={`${styles.articleButton} `}>
        Create an article
      </Link>
    </>
  );
};
export default CreateArticle;
