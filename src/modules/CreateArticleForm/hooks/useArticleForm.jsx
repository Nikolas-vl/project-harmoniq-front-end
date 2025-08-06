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
  const [touchedFields, setTouchedFields] = useState({ image: false });
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
        .min(2000, 'Text must be at least 2000 characters')
        .max(10000, 'Text must be at most 10000 characters'),
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
    validateOnBlur: false,
    validateOnChange: true,
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
    setTouchedFields(prev => ({ ...prev, image: true }));
    formik.setFieldTouched('image', true, false);
    if (!file) {
      setPreviewUrl(cameraPlaceholder);
      formik.setFieldValue('image', null);
      formik.validateField('image');
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    formik.setFieldValue('image', file);
    formik.validateField('image');
  };

  const handleTitleChange = value => {
    formik.setFieldTouched('title', true, false);
    formik.setFieldValue('title', value);
    setDraft(prev => ({ ...prev, title: value }));
  };

  const handleTextChange = value => {
    formik.setFieldTouched('text', true, false);
    formik.setFieldValue('text', value);
    setDraft(prev => ({ ...prev, text: value }));
  };

  return {
    formik,
    previewUrl,
    handleFileChange,
    handleTitleChange,
    handleTextChange,
    touchedFields,
  };
};
