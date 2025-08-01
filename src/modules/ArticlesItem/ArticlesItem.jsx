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
          <button className={s.deleteBtn} onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className={s.icon}
            >
              <path d="M3.03919 4.2939C3.01449 4.10866 3.0791 3.92338 3.23133 3.81499C3.9272 3.31953 6.3142 2 12 2C17.6858 2 20.0728 3.31952 20.7687 3.81499C20.9209 3.92338 20.9855 4.10866 20.9608 4.2939L19.2616 17.0378C19.0968 18.2744 18.3644 19.3632 17.2813 19.9821L16.9614 20.1649C13.8871 21.9217 10.1129 21.9217 7.03861 20.1649L6.71873 19.9821C5.6356 19.3632 4.90325 18.2744 4.73838 17.0378L3.03919 4.2939Z" />
              <path d="M3 5C5.57143 7.66666 18.4286 7.66662 21 5" />
            </svg>
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
