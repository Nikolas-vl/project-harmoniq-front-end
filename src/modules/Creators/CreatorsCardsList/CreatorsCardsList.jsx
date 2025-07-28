import CreatorsCard from '../CreatorsCard/CreatorsCard';
import css from './CreatorsCardsList.module.css';

const data = {
    image: '/src/assets/img/Image (25).jpg',
    image_desc: 'Beautiful women is looking at the camera',
    author: 'Naomi',
};

const CreatorsCardsList = () => {
    const articles = Array(6).fill(data);
    
    return (
        <ul className={css.list}>
            {articles.map((item, index) => (
                <li key={index}>
                    <CreatorsCard data={item} />
                </li>
            ))}
        </ul>
    );
};

export default CreatorsCardsList;