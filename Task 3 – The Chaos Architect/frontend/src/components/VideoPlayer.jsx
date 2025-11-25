import { getVideoStreamUrl } from '../services/videoService';
import RatingStars from './RatingStars';
import '../styles/disco-theme.css';

function VideoPlayer({ video, onClose }) {
  if (!video) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="video-player-modal" onClick={onClose}>
      <div className="video-player-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✕</button>
        
        <div className="video-player-wrapper">
          <video 
            src={getVideoStreamUrl(video.id)} 
            controls 
            autoPlay
            className="video-player"
          />
        </div>

        <div className="video-details">
          <h2 className="neon-text">{video.originalFilename}</h2>
          <p className="terminal-text">Agent: {video.uploaderUsername}</p>
          <p className="terminal-text">Transmitted: {formatDate(video.uploadedAt)}</p>
          
          <div className="video-rating-section">
            <h3 className="rating-title">FUNK-O-METER</h3>
            <RatingStars 
              videoId={video.id}
              averageRating={video.averageRating}
              totalRatings={video.totalRatings}
              readOnly={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
