

import { Link } from 'react-router-dom';
import styles from './CreateArticleButton.module.css'

const CreateArticle = (onClick) => {
 
  
return(
    <>
       <Link
        to="/create" onClick={onClick}
        className={`${styles.articleButton} `}
      >
        Create an article 
      </Link>

   
    </>
)
}
export default CreateArticle;
