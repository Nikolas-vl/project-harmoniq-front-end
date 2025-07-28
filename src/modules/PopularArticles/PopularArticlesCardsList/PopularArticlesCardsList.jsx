import { useEffect, useState } from 'react';
import PopularArticlesCard from '../PopularArticlesCard/PopularArticlesCard';
import css from './PopularArticlesCardsList.module.css';

const PopularArticlesCardsList = () => {
    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setVisibleCount(screenWidth >= 1440 ? 3 : 4);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const article = Array(4).fill(visibleCount);

    return (
        <ul className={css.list}>
            {article.slice(0, visibleCount).map((item, index) => (
                <li key={index}>
                    <PopularArticlesCard articles={item} />
                </li>
            ))}
        </ul>
    );
};

export default PopularArticlesCardsList;