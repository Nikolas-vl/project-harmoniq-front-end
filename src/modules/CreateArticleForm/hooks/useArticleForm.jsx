import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getDescription } from '../utils/getDescription';
import { useLocalStorageState } from './useLocalStorageState';
import cameraPlaceholder from '../../../assets/icons/createArticlePage/camera.svg';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../redux/user/userSelectors';

export const useArticleForm = onSubmitSuccess => {
  const ownerId = useSelector(selectUserId);
  const [draft, setDraft] = useLocalStorageState('articleDraft', {
    title: '',
    text: '',
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState(cameraPlaceholder);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const formik = useFormik({
    initialValues: draft,
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Title is required')
        .min(5, 'Title must be at least 5 characters')
        .max(100, 'Title must be at most 100 characters'),
      text: Yup.string()
        .required('Text is required')
        .min(100, 'Text must be at least 100 characters'),
      image: Yup.mixed()
        .required('Image is required')
        .test(
          'fileSize',
          'Maximum file size is 2MB',
          value => !value || (value && value.size <= 2 * 1024 * 1024)
        )
        .test(
          'fileType',
          'Only jpg and png images are allowed',
          value =>
            !value ||
            (value && ['image/jpeg', 'image/png'].includes(value.type))
        ),
    }),
    validateOnBlur: false, // <--- додаємо
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = {
          image: values.image,
          title: values.title,
          desc: getDescription(values.text),
          article: values.text,
          rate: 0,
          ownerId: ownerId,
          date: new Date().toISOString(),
        };

        await onSubmitSuccess(formData);

        setDraft({ title: '', text: '', image: null });
        setPreviewUrl(cameraPlaceholder);
      } catch {
        setErrors({
          submit: 'Помилка при створенні статті. Спробуйте пізніше.',
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFileChange = file => {
    if (!file) {
      setPreviewUrl(cameraPlaceholder);
      formik.setFieldValue('image', null);

      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    formik.setFieldValue('image', file);
  };

  const handleTitleChange = value => {
    setDraft(prev => ({ ...prev, title: value }));
  };

  const handleTextChange = value => {
    setDraft(prev => ({ ...prev, text: value }));
  };

  return {
    formik,
    previewUrl,
    handleFileChange,
    handleTitleChange,
    handleTextChange,
  };
};
