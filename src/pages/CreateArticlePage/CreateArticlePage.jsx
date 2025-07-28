import ArticleForm from '../../modules/CreateArticleForm/ArticleForm';
import * as s from './styles/index.module.css';

const CreateArticlePage = () => {
  return (
    <section className={`container ${s.section}`}>
      <h1 className={s.title}>Create an article</h1>
      <ArticleForm />
    </section>
  );
};

export default CreateArticlePage;
