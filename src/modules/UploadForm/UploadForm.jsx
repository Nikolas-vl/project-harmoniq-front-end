import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from './UploadForm.module.css';

import closeIcon from '../../assets/icons/uploadPhoto/close.svg';
import cameraIcon from '../../assets/icons/uploadPhoto/photo.svg';

const UploadForm = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);

  const formik = useFormik({
    initialValues: {
      photo: null,
    },
    validationSchema: Yup.object({
      photo: Yup.mixed().required('Photo is required'),
    }),
    onSubmit: async values => {
      const formData = new FormData();
      formData.append('photo', values.photo);

      try {
        await fakeUploadRequest(formData); // Імітація запиту
        navigate('/home-authorised');
      } catch (err) {
        alert('Upload failed');
      }
    },
  });

  const handleFileChange = e => {
    const file = e.currentTarget.files[0];
    if (file) {
      formik.setFieldValue('photo', file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.closeBtn} onClick={() => navigate(-1)}>
        <img src={closeIcon} alt="close" className={styles.icon} />
      </button>

      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h2 className={styles.mainText}>Upload your photo</h2>

        <label htmlFor="photo" className={styles.fileInputWrapper}>
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className={styles.preview} />
          ) : (
            <img src={cameraIcon} alt="camera" className={styles.icon} />
          )}
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        {formik.touched.photo && formik.errors.photo && (
          <div className={styles.error}>{formik.errors.photo}</div>
        )}

        <button
          type="submit"
          className={styles.saveBtn}
          disabled={!formik.values.photo}
        >
          Save
        </button>
      </form>
    </div>
  );
};

// Імітація бекенду
const fakeUploadRequest = formData =>
  new Promise(resolve => setTimeout(() => resolve({ success: true }), 1000));

export default UploadForm;
