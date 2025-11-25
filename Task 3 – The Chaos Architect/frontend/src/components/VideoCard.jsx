import { getVideoStreamUrl } from '../services/videoService';
import RatingStars from './RatingStars';
import '../styles/disco-theme.css';

function VideoCard({ video, onClick }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="video-card" onClick={() => onClick(video)}>
      <div className="video-thumbnail">
        <div className="play-button">▶</div>
        <video 
          src={getVideoStreamUrl(video.id)} 
          className="thumbnail-video"
          preload="metadata"
        />
      </div>
      
      <div className="video-info">
        <h3 className="video-title">{video.originalFilename}</h3>
        <p className="video-uploader">Agent: {video.uploaderUsername}</p>
        <p className="video-date">{formatDate(video.uploadedAt)}</p>
        
        <div className="video-rating">
          <RatingStars 
            videoId={video.id}
            averageRating={video.averageRating}
            totalRatings={video.totalRatings}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
