import { Link } from 'react-router-dom';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks';
import s from './ArticlesItem.module.css';
const ArticlesItem = ({
  article_id,
  author,
  title,
  description,
  img,
  handleAdd,
}) => {
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

        <ButtonAddToBookmarks onAdd={handleAdd} />
      </div>
    </article>
  );
};

export default ArticlesItem;
