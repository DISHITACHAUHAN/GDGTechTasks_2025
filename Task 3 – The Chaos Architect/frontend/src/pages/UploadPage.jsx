import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadVideo, validateVideoFile } from '../services/videoService';
import '../styles/disco-theme.css';

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError('');

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file) => {
    try {
      validateVideoFile(file);
      setSelectedFile(file);
      setError('');
    } catch (err) {
      setError(err.message);
      setSelectedFile(null);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('MISSION FAILED: No file selected');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');
    setProgress(0);

    try {
      await uploadVideo(selectedFile, (percent) => {
        setProgress(percent);
      });
      setSuccess('MISSION COMPLETE: Groove transmitted successfully!');
      setSelectedFile(null);
      setTimeout(() => {
        navigate('/gallery');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'TRANSMISSION ERROR: Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="upload-container">
        <div className="mission-header">
          <h1 className="neon-text">GROOVE OVERRIDE</h1>
          <p className="terminal-text">Upload your dance move to combat the disco glitch</p>
        </div>

        <div
          className={`drop-zone ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="drop-zone-content">
            <div className="upload-icon">📹</div>
            <p className="drop-zone-text">
              {selectedFile ? selectedFile.name : 'Drag & drop your video here'}
            </p>
            <p className="drop-zone-subtext">or click to select file</p>
            <p className="terminal-text">Accepted: MP4, MOV, AVI, WEBM (Max 100MB)</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
        </div>

        {selectedFile && !uploading && (
          <button onClick={handleUpload} className="mission-button">
            BEAM GROOVE
          </button>
        )}

        {uploading && (
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="terminal-text">TRANSMITTING: {progress}%</p>
          </div>
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
    </div>
  );
}

export default UploadPage;
