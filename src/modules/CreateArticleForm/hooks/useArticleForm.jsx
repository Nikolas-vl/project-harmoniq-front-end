import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { validateAndUploadImage } from '../utils/validateImage';
import { getDescription } from '../utils/getDescription';
import { useLocalStorageState } from './useLocalStorageState';
import cameraPlaceholder from '../../../assets/icons/createArticlePage/camera.svg';
export const useArticleForm = onSubmitSuccess => {
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
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const ownerId = 'User id from store';

      const imageUrl = await validateAndUploadImage(values.image);
      if (!imageUrl) {
        setErrors({
          image: 'Failed to upload image. Please try again.',
        });
        setSubmitting(false);
        return;
      }

      const desc = getDescription(values.text);

      const articleObject = {
        img: imageUrl,
        title: values.title,
        desc,
        article: values.text,
        rate: 0,
        ownerId,
        date: new Date().toISOString(),
      };

      await onSubmitSuccess(articleObject);

      setDraft({ title: '', text: '', image: null });
      setPreviewUrl(null);
      setSubmitting(false);
    },
  });

  const handleFileChange = file => {
    if (!file) {
      setPreviewUrl(null);
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
