import { useEffect, useState } from 'react';
import PopularArticlesCard from '../PopularArticlesCard/PopularArticlesCard';
import css from './PopularArticlesCardsList.module.css';

const data = {
    image: '/src/assets/img/Image (24).jpg',
    image_desc: 'Hands on the fence of a terrace with the view to the lake.',
    author: 'Clark',
    topic: 'When Anxiety Feels Like a Room With No Doors',
    desc: 'A deeply personal reflection on living with generalized anxiety and the small rituals tha..',
};

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

    const articles = Array(4).fill(data);
    
    return (
        <ul className={css.list}>
            {articles.slice(0, visibleCount).map((item, index) => (
                <li key={index}>
                    <PopularArticlesCard data={item} />
                </li>
            ))}
        </ul>
    );
};

export default PopularArticlesCardsList;