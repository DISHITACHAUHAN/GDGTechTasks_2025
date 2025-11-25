import api from './authService';

const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const validateVideoFile = (file) => {
  if (!file) {
    throw new Error('MISSION FAILED: No file selected');
  }

  if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
    throw new Error('MISSION FAILED: Invalid file type. Only video files allowed (mp4, mov, avi, webm)');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('MISSION FAILED: File size exceeds 100MB limit');
  }

  return true;
};

export const uploadVideo = async (file, onProgress) => {
  validateVideoFile(file);

  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/videos/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      if (onProgress) {
        onProgress(percentCompleted);
      }
    },
  });

  return response.data;
};

export const getAllVideos = async () => {
  const response = await api.get('/videos');
  return response.data;
};

export const getVideoById = async (id) => {
  const response = await api.get(`/videos/${id}`);
  return response.data;
};

export const deleteVideo = async (id) => {
  const response = await api.delete(`/videos/${id}`);
  return response.data;
};

export const getVideoStreamUrl = (id) => {
  return `http://localhost:8080/api/videos/${id}/stream`;
};
