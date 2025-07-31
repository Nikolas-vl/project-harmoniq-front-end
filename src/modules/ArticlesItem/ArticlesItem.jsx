import { Link } from 'react-router-dom';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks';
import s from './ArticlesItem.module.css';

import { deleteArticle } from '../../api/services/articlesApi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';

const ArticlesItem = ({
  article_id,
  author,
  title,
  description,
  img,
  handleAdd,
  isSaved,
  isOwnProfile,
  activeTab,
}) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await deleteArticle(article_id);
      dispatch({ type: 'auth/removeUserArticle', payload: article_id });
      toast.success('Article deleted!');
    } catch (error) {
      console.error('Failed to delete:', error);
      toast.error('Failed to delete article');
    }
  };

  return (
    <article className={s.articleContainer}>
      <picture>
        <source
          media="(min-width: 1440px)"
          srcSet={img}
          width="368"
          height="233"
        />

        <img
          src={img}
          alt="photo here"
          width={337}
          height={233}
          className={s.articleImg}
        />
      </picture>

      <div className={s.textWrap}>
        <h3 className={s.authorInfo}>{author}</h3>
        <h3 className={s.titleInfo}>{title}</h3>
        <p className={s.description}>{description}</p>
      </div>

      <div className={s.buttonWrap}>
        <Link to={`/articles/${article_id}`} className={s.learnMoreBtn}>
          Learn more
        </Link>

        {isOwnProfile && activeTab === 'my' ? (
          <button onClick={handleDelete} className={s.deleteBtn}>
            Delete
          </button>
        ) : (
          <ButtonAddToBookmarks
            onAdd={() => handleAdd(article_id)}
            isSaved={isSaved}
          />
        )}
      </div>
    </article>
  );
};

export default ArticlesItem;
