import { uploadToCloudinary } from './uploadToCloudinary';

export const validateAndUploadImage = async fileRef => {
  if (!fileRef.current) return null;

  const imageUrl = await uploadToCloudinary(fileRef.current);
  fileRef.current = null;

  return imageUrl;
};
