import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showLoader } from '../../redux/loader/loaderSlice';

export const useLoader = isLoading => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showLoader(isLoading));
  }, [dispatch, isLoading]);
};
