import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, getUserVideos } from '../services/userService';
import { getVideoStreamUrl } from '../services/videoService';
import '../styles/disco-theme.css';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const [profileData, videosData] = await Promise.all([
        getUserProfile(),
        getUserVideos()
      ]);
      setProfile(profileData);
      setVideos(videosData);
      setNewUsername(profileData.username);
    } catch (err) {
      setError('TRANSMISSION ERROR: Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await updateUserProfile(newUsername);
      setSuccess('MISSION COMPLETE: Profile updated');
      setEditing(false);
      fetchProfileData();
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="terminal-text">LOADING AGENT PROFILE...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="profile-container">
        <div className="mission-header">
          <h1 className="neon-text">AGENT PROFILE</h1>
          <p className="terminal-text">Your mission credentials and transmitted grooves</p>
        </div>

        <div className="profile-info">
          <div className="profile-field">
            <label className="profile-label">Agent Codename:</label>
            {editing ? (
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="form-input"
              />
            ) : (
              <span className="profile-value">{profile?.username}</span>
            )}
          </div>

          <div className="profile-field">
            <label className="profile-label">Email:</label>
            <span className="profile-value">{profile?.email}</span>
          </div>

          <div className="profile-field">
            <label className="profile-label">Registered:</label>
            <span className="profile-value">{formatDate(profile?.registeredAt)}</span>
          </div>

          {editing ? (
            <div className="profile-actions">
              <button onClick={handleUpdateProfile} className="mission-button">
                SAVE CHANGES
              </button>
              <button onClick={() => setEditing(false)} className="cancel-button">
                CANCEL
              </button>
            </div>
          ) : (
            <button onClick={() => setEditing(true)} className="mission-button">
              EDIT PROFILE
            </button>
          )}

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              <span className="success-icon">✓</span>
              {success}
            </div>
          )}
        </div>

        <div className="profile-videos">
          <h2 className="section-title">YOUR TRANSMITTED GROOVES</h2>
          {videos.length === 0 ? (
            <p className="terminal-text">No grooves transmitted yet</p>
          ) : (
            <div className="video-grid">
              {videos.map((video) => (
                <div key={video.id} className="profile-video-card">
                  <video 
                    src={getVideoStreamUrl(video.id)} 
                    className="profile-video-thumbnail"
                    controls
                  />
                  <div className="profile-video-info">
                    <p className="video-title">{video.originalFilename}</p>
                    <p className="video-date">{formatDate(video.uploadedAt)}</p>
                    <p className="video-rating">
                      ⭐ {video.averageRating.toFixed(1)} ({video.totalRatings} ratings)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
