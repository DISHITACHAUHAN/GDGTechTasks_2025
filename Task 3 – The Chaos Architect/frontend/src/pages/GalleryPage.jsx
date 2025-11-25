import { useState, useEffect } from 'react';
import { getAllVideos } from '../services/videoService';
import VideoCard from '../components/VideoCard';
import VideoPlayer from '../components/VideoPlayer';
import '../styles/disco-theme.css';

function GalleryPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const data = await getAllVideos();
      setVideos(data);
      setError('');
    } catch (err) {
      setError('TRANSMISSION ERROR: Failed to load grooves');
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
    fetchVideos(); // Refresh to get updated ratings
  };

  return (
    <div className="page-container">
      <div className="gallery-container">
        <div className="mission-header">
          <h1 className="neon-text">WALL OF FAME</h1>
          <p className="terminal-text">All transmitted grooves to combat the disco glitch</p>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="terminal-text">LOADING GROOVES...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {!loading && !error && videos.length === 0 && (
          <div className="empty-state">
            <p className="terminal-text">NO GROOVES TRANSMITTED YET</p>
            <p className="terminal-text">Be the first agent to upload a dance move!</p>
          </div>
        )}

        {!loading && !error && videos.length > 0 && (
          <div className="video-grid">
            {videos.map((video) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                onClick={handleVideoClick}
              />
            ))}
          </div>
        )}

        {selectedVideo && (
          <VideoPlayer 
            video={selectedVideo} 
            onClose={handleClosePlayer}
          />
        )}
      </div>
    </div>
  );
}

export default GalleryPage;
