

import { Link } from 'react-router-dom';
import styles from './CreateArticleButton.module.css'

const CreateArticle = () => {
 
  
return(
    <>
       <Link
        to="/create"
        className={`${styles.articleButton} `}
      >
        Create an article 
      </Link>
    {/* <button className={styles.Button} >Create an article </button> */}
   
    </>
)
}
export default CreateArticle;
