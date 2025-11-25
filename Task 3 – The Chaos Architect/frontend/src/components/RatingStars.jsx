import { useState } from 'react';
import { rateVideo } from '../services/ratingService';
import '../styles/disco-theme.css';

function RatingStars({ videoId, averageRating = 0, totalRatings = 0, readOnly = false }) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [currentRating, setCurrentRating] = useState(averageRating);
  const [currentTotal, setCurrentTotal] = useState(totalRatings);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleStarClick = async (stars) => {
    if (readOnly) return;

    try {
      const response = await rateVideo(videoId, stars);
      setCurrentRating(response.averageRating);
      setCurrentTotal(response.totalRatings);
      setSuccess('FUNK-O-METER ACTIVATED!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Rating failed');
      setTimeout(() => setError(''), 3000);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const filled = i <= (hoveredStar || Math.round(currentRating));
      stars.push(
        <span
          key={i}
          className={`star ${filled ? 'filled' : ''} ${readOnly ? 'readonly' : ''}`}
          onMouseEnter={() => !readOnly && setHoveredStar(i)}
          onMouseLeave={() => !readOnly && setHoveredStar(0)}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="rating-stars-container">
      <div className="stars">
        {renderStars()}
      </div>
      <div className="rating-info">
        <span className="rating-average">{currentRating.toFixed(1)}</span>
        <span className="rating-count">({currentTotal} ratings)</span>
      </div>
      {error && <p className="rating-error">{error}</p>}
      {success && <p className="rating-success">{success}</p>}
    </div>
  );
}

export default RatingStars;
