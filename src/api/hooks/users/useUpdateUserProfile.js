import { useState } from 'react';
import { updateUserProfile } from '../../services/usersApi';
import { useLoader } from '../../../modules/Loader/useLoader';
import { updateUserData } from '../../../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export const useUpdateUserProfile = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useLoader(isLoading);
  const updateProfile = async (userId, updateData) => {
    setIsLoading(true);

    try {
      const response = await updateUserProfile(userId, updateData);
      setData(response.data);
      dispatch(updateUserData(response.user));
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      console.error('Failed to update profile', err);
    }
  };

  return { updateProfile, isLoading, data };
};
