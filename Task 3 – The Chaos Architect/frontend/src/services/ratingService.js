import api from './authService';

const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

export const rateVideo = async (videoId, stars) => {
  const sessionId = getSessionId();
  const response = await api.post(`/ratings/video/${videoId}`, {
    stars,
    sessionId,
  });
  return response.data;
};

export const getVideoRating = async (videoId) => {
  const response = await api.get(`/ratings/video/${videoId}`);
  return response.data;
};
