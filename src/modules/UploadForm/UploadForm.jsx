import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UploadForm.module.css';

import closeIcon from '../../assets/icons/uploadPhoto/close.svg';
import cameraIcon from '../../assets/icons/uploadPhoto/photo.svg';

import { useUpdateUserProfile } from '../../api/hooks/users/useUpdateUserProfile';
import { selectUserId } from '../../redux/auth/authSelectors';
import { useSelector } from 'react-redux';

const UploadForm = () => {
  const navigate = useNavigate();
  const userId = useSelector(selectUserId);
  const { updateProfile, isLoading } = useUpdateUserProfile();

  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('The file is too large. Maximum 2MB.');
      return;
    }

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Only JPG and PNG images are allowed.');
      return;
    }

    setError('');
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Please select a photo');
      return;
    }

    try {
      await updateProfile(userId, { image: selectedFile });
      navigate('/');
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={() => navigate(-1)}
        >
          <img src={closeIcon} alt="close" className={styles.icon} />
        </button>

        <h2 className={styles.mainText}>Upload your photo</h2>

        <label htmlFor="photo" className={styles.fileInputWrapper}>
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className={styles.preview} />
          ) : (
            <img src={cameraIcon} alt="camera" className={styles.icon} />
          )}
          <input
            id="photo"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        </label>

        {error && <div className={styles.error}>{error}</div>}

        <button
          type="submit"
          className={styles.saveBtn}
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? <span className="loading"></span> : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
