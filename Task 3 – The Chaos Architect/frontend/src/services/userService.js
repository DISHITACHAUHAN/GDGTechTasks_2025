import api from './authService';

export const getUserProfile = async () => {
  const response = await api.get('/profile/me');
  return response.data;
};

export const updateUserProfile = async (username) => {
  const response = await api.put('/profile/me', { username });
  return response.data;
};

export const getUserVideos = async () => {
  const response = await api.get('/profile/me/videos');
  return response.data;
};
