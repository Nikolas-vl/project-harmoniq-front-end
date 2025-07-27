import { useState } from 'react';
import ArticleForm from '../../../CreateArticleForm/ArticleForm';
import styles from './CreateArticle.module.css'

const CreateArticle = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);
  
return(
    <>
    <button className={styles.Button} onClick={handleOpen}>Create an article </button>
    {isModalOpen && <ArticleForm onClose={handleClose} />}
    </>
)
}
export default CreateArticle;
