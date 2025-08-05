import UploadForm from '../../modules/UploadForm/UploadForm';
import s from './UploadPhoto.module.css';
const UploadPhoto = () => {
  return (
    <section className={`container ${s.uploadPhotoWrapper}`}>
      <UploadForm />
    </section>
  );
};

export default UploadPhoto;
