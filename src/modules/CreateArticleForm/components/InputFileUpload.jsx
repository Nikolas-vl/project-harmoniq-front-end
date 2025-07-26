import s from '../styles/index.module.css';

const InputFileUpload = ({ error, onChange, photoUrl }) => {
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('The file is too large. Maximum 2MB.');
      return;
    }

    if (onChange) onChange(file);
  };

  return (
    <label className={s.fileLabel} htmlFor="upload-photo">
      <img
        width={361}
        height={233}
        id="photo-preview"
        src={photoUrl}
        alt="Click to upload"
        className={`${s.camera} ${error ? s.errored : ''}`}
      />
      <input
        name="image"
        type="file"
        id="upload-photo"
        accept="image/*"
        className={s.fileInput}
        onChange={handleFileChange}
      />
      {error && <span className={s.error}>{error}</span>}
    </label>
  );
};

export default InputFileUpload;
