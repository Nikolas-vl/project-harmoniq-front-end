import ArticlesList from '../../modules/ArticlesList/ArticlesList';
import '../../assets/styles/container.css';
import SectionTitle from '../../modules/SectionTitle/SectionTitle';
import { useState } from 'react';
const ArticlesPage = () => {
  const [filter, setFilter] = useState('All');
  return (
    <div className="container">
      <SectionTitle>Articles</SectionTitle>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          marginTop: '20px',
          width: '100%',
        }}
      >
        {/* // todo replace N to number of articles from back */}
        <p
          style={{
            fontWeight: 700,
            fontSize: '18px',
            color: 'var(--color--black)',
          }}
        >
          N articles
        </p>
        <select
          value={filter}
          name="select"
          onChange={e => setFilter(e.target.value)}
          style={{
            width: '169px',
            height: '33px',
            padding: '4px 8px',
            fontSize: '16px',
            border: '1px solid #9F9F9F',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          <option value="All">All</option>
          <option value="Popular">Popular</option>
        </select>
      </div>
      <ArticlesList />
      {/* // todo pagination */}
    </div>
  );
};

export default ArticlesPage;
