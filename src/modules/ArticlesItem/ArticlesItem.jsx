import { Link } from 'react-router-dom';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks';
import s from './ArticlesItem.module.css';

import { deleteArticle } from '../../api/services/articlesApi';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

const ArticlesItem = ({
  article_id,
  author,
  title,
  description,
  img,
  handleAdd,
  isSaved,
  isOwnProfile,
}) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(async () => {
    try {
      await deleteArticle(article_id);
      dispatch({ type: 'auth/removeUserArticle', payload: article_id });
    } catch (error) {
      console.error('Failed to delete article:', error);
    }
  }, [article_id, dispatch]);

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

        {isOwnProfile ? (
          <button
            type="button"
            className={s.deleteBtn}
            onClick={handleDelete}
          >
            🗑 Delete
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
