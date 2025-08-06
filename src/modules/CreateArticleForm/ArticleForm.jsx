import s from './styles/index.module.css';
import InputFileUpload from './components/InputFileUpload';
import CustomTextArea from './components/CustomTextArea';
import { InputWithScroll } from './components/InputWithScroll';
import { useArticleForm } from './hooks/useArticleForm';
import { useCreateArticle } from '../../api/hooks/articles/useCreateArticle';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ArticleForm = () => {
  const { create, isLoading } = useCreateArticle();
  const navigate = useNavigate();
  const {
    formik,
    previewUrl,
    handleFileChange,
    handleTitleChange,
    handleTextChange,
  } = useArticleForm(async articleObject => {
    try {
      const result = await create(articleObject);
      const articleId = result._id;
      navigate(`/articles/${articleId}`);
    } catch (err) {
      toast.error('An error occurred when creating an article!');
      console.error(err);
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    formik.setFieldTouched('image', true, true);
    formik.handleSubmit();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <InputFileUpload
        onChange={handleFileChange}
        photoUrl={previewUrl}
        error={formik.errors.image}
        touched={formik.touched.image}
      />
      <InputWithScroll
        value={formik.values.title}
        onChange={value => {
          formik.setFieldValue('title', value);
          handleTitleChange(value);
        }}
        error={formik.errors.title}
        touched={formik.touched.title}
      />
      <CustomTextArea
        value={formik.values.text}
        onChange={value => {
          formik.setFieldValue('text', value);
          handleTextChange(value);
        }}
        error={formik.errors.text}
        touched={formik.touched.text}
      />
      <button
        disabled={formik.isSubmitting || isLoading}
        type="submit"
        className={s.button}
      >
        {formik.isSubmitting || isLoading ? (
          <span className="loading"></span>
        ) : (
          'Publish Article'
        )}
      </button>
    </form>
  );
};

export default ArticleForm;
