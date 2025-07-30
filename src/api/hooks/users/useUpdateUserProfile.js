import { useState } from 'react';
import { updateUserProfile } from '../../services/usersApi';

export const useUpdateUserProfile = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(null);

  const updateProfile = async (userId, updateData) => {
    setLoading(true);

    try {
      const response = await updateUserProfile(userId, updateData);
      setData(response.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      console.error('Failed to update profile', err);
    }
  };

  return { updateProfile, loading, data };
};
