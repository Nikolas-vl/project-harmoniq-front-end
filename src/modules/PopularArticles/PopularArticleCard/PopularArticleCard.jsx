import css from './PopularArticleCard.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { selectUserId } from '../../../redux/auth/authSelectors';
import { useSaveArticle } from '../../../api/hooks/users/useSaveArticle';
import { Link } from 'react-router-dom';

const PopularArticleCard = ({ article, isLoading }) => {
  const userId = useSelector(selectUserId);
  const [isSaved, setIsSaved] = useState(false);

  const { saveArticle } = useSaveArticle(userId, article._id);

  const handleSave = async () => {
    try {
      await saveArticle();
      setIsSaved(true);
    } catch (err) {
      console.error('Failed to save article:', err);
    }
  };
  if (isLoading) {
    return <p>✋Loading...✋</p>;
  }
  return (
    <>
      <div className={css.card_container}>
        <img className={css.card_image} src={article.img} alt={article.desc} />
        <div>
          <p className={css.card_author_name}>
            {article?.author || 'Unknown author'}
          </p>
          <h3 className={css.card_title}>{article.title}</h3>
          <p className={css.card_description}>{article.article}</p>
        </div>
        <div className={css.card_button_container}>
          <Link className={css.load_more_link} to={`/article/${article._id}`}>
            Learn more
          </Link>
          <button
            onClick={handleSave}
            className={`${css.save_button} ${isSaved ? css.saved_button : ''}`}
          >
            <svg
              className={css.save_svg}
              width="14"
              height="17"
              viewBox="0 0 14 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.99707 0.5C8.26074 0.500006 9.42058 0.620914 10.3398 0.760742C11.5036 0.937767 12.416 1.7353 12.6758 2.84961C12.9894 4.19485 13.2969 6.24141 13.2441 8.99023C13.1859 12.0233 12.7432 14.2117 12.3164 15.6396C12.201 16.0256 11.9339 16.2243 11.6318 16.2754C11.316 16.3287 10.9263 16.2236 10.6094 15.9082C10.0326 15.334 9.37193 14.7138 8.7627 14.2344C8.45865 13.9951 8.15576 13.7817 7.875 13.626C7.61014 13.4791 7.29955 13.3457 6.99707 13.3457C6.69934 13.3457 6.37833 13.4769 6.09766 13.6211C5.79864 13.7747 5.4675 13.9855 5.12891 14.2246C4.45038 14.7037 3.69895 15.3244 3.03711 15.8994C2.68779 16.2029 2.27644 16.2747 1.95215 16.1865C1.63917 16.1013 1.37522 15.8609 1.29395 15.4424C1.01488 14.0044 0.75 11.8805 0.75 9C0.75 6.12652 1.04615 4.09969 1.34082 2.79492C1.58505 1.71356 2.4671 0.943748 3.60156 0.768555C4.52893 0.625347 5.70912 0.5 6.99707 0.5Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default PopularArticleCard;
