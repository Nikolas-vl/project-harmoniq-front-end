import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './UploadForm.module.css';

import closeIcon from '../../assets/icons/uploadPhoto/close.svg';
import cameraIcon from '../../assets/icons/uploadPhoto/photo.svg';
import editor from '../../assets/icons/uploadPhoto/editor.svg';
import eye from '../../assets/icons/eye.svg';
import eyeCrossed from '../../assets/icons/eye-crossed.svg';

import { useUpdateUserProfile } from '../../api/hooks/users/useUpdateUserProfile';
import { selectUserId } from '../../redux/auth/authSelectors';
import { useGetUserInfo } from '../../api/hooks/users/useGetUserInfo';

const UploadForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isNewUser = location.state?.isNew === true;

  const userId = useSelector(selectUserId);
  const { updateProfile, loading } = useUpdateUserProfile();
  const { user } = useGetUserInfo(userId);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);


  useEffect(() => {
    if (user) {
      if (user.avatarUrl) {
        setPreviewUrl(user.avatarUrl);
      }
      if (user.name) {
        setName(user.name);
      }
    }
  }, [user]);

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

  const isNameChanged = name.trim() !== user?.name;
  const isPasswordChanged = oldPassword.trim() !== '' && newPassword.trim() !== '';
  const hasChanges = isNameChanged || isPasswordChanged || selectedFile;

  const handleSubmit = async e => {
    e.preventDefault();

    const updateData = {}; 

    if (!selectedFile && !previewUrl) {
      setError('Please select a photo');
      return;
    }
    
    if (selectedFile) {
      updateData.image = selectedFile;
    };

    if (!isNewUser) {
      if (isNameChanged) {
        updateData.name = name.trim();
      }
      if (isPasswordChanged) {
        updateData.oldPassword = oldPassword;
        updateData.newPassword = newPassword;
      }
    }

    if (Object.keys(updateData).length === 0) {
      setError('Please make changes before saving.');
      return;
    }



    try {
      await updateProfile(userId, updateData);
      navigate('/authors/:id');
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error(err);
    }
  };

  const handleClose = () => {
    selectedFile(null);
    setPreviewUrl(user?.avatarUrl || null);
    setName(user?.name || '');
    setOldPassword('');
    setNewPassword('');
    setError('');
    navigate('/');
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={handleClose}
        >
          <img src={closeIcon} alt="close" className={styles.icon} />
        </button>

        <h2 className={styles.mainText}>{isNewUser ? "Upload your photo" : "Update your profile" }</h2>

        <label htmlFor="photo" className={styles.fileInputWrapper}>
          {previewUrl ? (
            <div className={styles.previewWrapper}>
              <img src={previewUrl} alt="Preview" className={styles.preview} />
              {userId && (
                <img src={editor} alt="Change photo" className={styles.editIcon} />
              )}
            </div>
            
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
        {!isNewUser && (
          <>
        <label className={styles.labelChangeInfo  }>
          New name:
          <input type='text' value={name} onChange={e => setName(e.target.value)} className={styles.inputChangeInfo} />
        </label>
        <label className={styles.labelChangeInfo  }>
              Old password:
              <div className={styles.inputWrapper}>
                <input type={showOldPassword ? 'text' : 'password'} value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder='Enter old password' className={styles.inputChangeInfo} />
                <span onClick={() => setShowOldPassword(prev => !prev)} className={styles.seePass}>
                  <img src={showOldPassword ? eye : eyeCrossed} alt={showOldPassword ? "Show password" : "Hide password"} width={24} height={24}/>
                </span>
              </div>
          
        </label>
        <label className={styles.labelChangeInfo  }>
          New password:
          <div className={styles.inputWrapper}>
                <input type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder='Enter new password' className={styles.inputChangeInfo} />
                <span onClick={() => setShowNewPassword(prev => !prev)} className={styles.seePass}>
                  <img src={showNewPassword ? eye : eyeCrossed} alt={showNewPassword ? "Show password" : "Hide password"} width={24} height={24}/>
                </span>
              </div>
            </label>
           </>
          )}

        {error && <div className={styles.error}>{error}</div>}

        <button
          type="submit"
          className={styles.saveBtn}
          disabled={!hasChanges || loading}
        >
          {loading ? 'Uploading...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
