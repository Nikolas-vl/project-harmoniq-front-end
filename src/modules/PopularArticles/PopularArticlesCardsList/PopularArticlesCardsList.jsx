import { useEffect, useState } from 'react';
import PopularArticlesCard from '../PopularArticlesCard/PopularArticlesCard';
import { useGetArticles } from '../../../api/hooks/articles/useGetArticles';
import css from './PopularArticlesCardsList.module.css';

const PopularArticlesCardsList = () => {
    const [visibleCount, setVisibleCount] = useState(4);
    const { articles, isLoading } = useGetArticles();

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setVisibleCount(screenWidth >= 1440 ? 3 : 4);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isLoading) {
        return <p>✋Loading...✋</p>
    }

    return (
        <ul className={css.list}>
            {articles.slice(0, visibleCount).map((item, index) => (
                <li key={index}>
                    <PopularArticlesCard articles={item} />
                </li>
            ))}
        </ul>
    );
};

export default PopularArticlesCardsList;