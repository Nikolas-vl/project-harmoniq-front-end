import UploadForm from '../../modules/UploadForm/UploadForm';
import s from './UploadPhoto.module.css';
const UploadPhoto = () => {
  return (
    <div className={`container ${s.uploadPhotoWrapper}`}>
      <UploadForm />
    </div>
  );
};

export default UploadPhoto;
