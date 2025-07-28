import { uploadToCloudinary } from './uploadToCloudinary';

export const validateAndUploadImage = async file => {
  if (!file) return null;

  const imageUrl = await uploadToCloudinary(file);
  return imageUrl;
};
