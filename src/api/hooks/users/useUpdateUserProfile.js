import { useState } from 'react';
import { updateUserProfile } from '../../services/usersApi';
import { useLoader } from '../../../modules/Loader/useLoader';

export const useUpdateUserProfile = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useLoader(isLoading);
  const updateProfile = async (userId, updateData) => {
    setIsLoading(true);

    try {
      const response = await updateUserProfile(userId, updateData);
      setData(response.data);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      console.error('Failed to update profile', err);
    }
  };

  return { updateProfile, isLoading, data };
};
