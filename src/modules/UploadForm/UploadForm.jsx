import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { refreshUser } from '../../redux/auth/authOperations';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isNewUser = location.state?.isNew === true;

  const userId = useSelector(selectUserId);
  const { updateProfile, loading } = useUpdateUserProfile();
  const { user } = useGetUserInfo(userId);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    if (user?.avatarUrl) setPreviewUrl(user.avatarUrl);
  }, [user]);

  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'At least 2 characters').max(32).trim(),
    oldPassword: Yup.string().min(6, 'At least 6 characters'),
    newPassword: Yup.string()
      .min(6, 'At least 6 characters')
      .when('oldPassword', {
        is: val => val && val.length > 0,
        then: schema => schema.required('New password required'),
      }),
  });

  const handleFileChange = (e, setFieldError) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setFieldError('image', 'The file is too large. Max 2MB.');
      return;
    }

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setFieldError('image', 'Only JPG and PNG images allowed.');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setFieldError('image', '');
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl(user?.avatarUrl || null);
    navigate(-1);
  };

  return (
    <div className={`container ${styles.wrapper}`}>
      <Formik
        enableReinitialize
        initialValues={{
          name: user?.name || '',
          oldPassword: '',
          newPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const isNameChanged = values.name.trim() !== user?.name;
          const isPasswordChanged =
            values.oldPassword.trim().length > 0 &&
            values.newPassword.trim().length > 0;
          const hasChanges = isNameChanged || isPasswordChanged || selectedFile;

          if (isNewUser && !selectedFile) {
            toast.error('Please select a photo');
            return;
          }

          if (!hasChanges) {
            toast.error('No changes made.');
            return;
          }

          const updateData = {};
          if (selectedFile) updateData.image = selectedFile;
          if (isNameChanged) updateData.newName = values.name.trim();
          if (isPasswordChanged) {
            updateData.oldPassword = values.oldPassword;
            updateData.newPassword = values.newPassword;
          }

          try {
            await updateProfile(userId, updateData);
            dispatch(refreshUser());
            toast.success('Profile updated');
            navigate(`/authors/${userId}`);
          } catch (err) {
            toast.error('Upload failed');
            console.error(err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldError, isSubmitting }) => (
          <Form className={styles.form}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={handleClose}
            >
              <img src={closeIcon} alt="close" className={styles.icon} />
            </button>

            <h2 className={styles.mainText}>
              {isNewUser ? 'Upload your photo' : 'Update your profile'}
            </h2>

            <label htmlFor="photo" className={styles.fileInputWrapper}>
              {previewUrl ? (
                <div className={styles.previewWrapper}>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className={styles.preview}
                  />
                  {userId && (
                    <img
                      src={editor}
                      alt="Change photo"
                      className={styles.editIcon}
                    />
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
                onChange={e => handleFileChange(e, setFieldError)}
                className={styles.fileInput}
              />
            </label>
            <ErrorMessage
              name="image"
              component="div"
              className={styles.error}
            />

            {!isNewUser && (
              <>
                <label className={styles.labelChangeInfo}>
                  New name:
                  <Field
                    type="text"
                    name="name"
                    className={styles.inputChangeInfo}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={styles.error}
                  />
                </label>

                <label className={styles.labelChangeInfo}>
                  Old password:
                  <div className={styles.inputWrapper}>
                    <Field
                      type={showOldPassword ? 'text' : 'password'}
                      name="oldPassword"
                      placeholder="Enter old password"
                      className={styles.inputChangeInfo}
                    />
                    <span
                      onClick={() => setShowOldPassword(prev => !prev)}
                      className={styles.seePass}
                    >
                      <img
                        src={showOldPassword ? eye : eyeCrossed}
                        alt={
                          showOldPassword ? 'Show password' : 'Hide password'
                        }
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                  <ErrorMessage
                    name="oldPassword"
                    component="div"
                    className={styles.error}
                  />
                </label>

                <label className={styles.labelChangeInfo}>
                  New password:
                  <div className={styles.inputWrapper}>
                    <Field
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      placeholder="Enter new password"
                      className={styles.inputChangeInfo}
                    />
                    <span
                      onClick={() => setShowNewPassword(prev => !prev)}
                      className={styles.seePass}
                    >
                      <img
                        src={showNewPassword ? eye : eyeCrossed}
                        alt={
                          showNewPassword ? 'Show password' : 'Hide password'
                        }
                        width={24}
                        height={24}
                      />
                    </span>
                  </div>
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className={styles.error}
                  />
                </label>
              </>
            )}

            <button
              type="submit"
              className={styles.saveBtn}
              disabled={isSubmitting || loading}
            >
              {loading ? 'Uploading...' : 'Save'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadForm;
