import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import '../styles/disco-theme.css';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !email || !password) {
      setError('MISSION FAILED: All fields required');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('MISSION FAILED: Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await register(username, email, password);
      console.log('AGENT REGISTERED:', response.message);
      navigate('/gallery');
    } catch (err) {
      setError(err.response?.data?.message || 'MISSION FAILED: Registration error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-container">
        <div className="mission-header">
          <h1 className="neon-text">AGENT REGISTRATION</h1>
          <p className="terminal-text">Join the mission to combat the disco glitch</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Agent Codename</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Agent007"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="agent@groove.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter secure password"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="mission-button"
            disabled={loading}
          >
            {loading ? 'REGISTERING...' : 'INITIATE REGISTRATION'}
          </button>
        </form>

        <div className="auth-footer">
          <p className="terminal-text">
            Already registered? <Link to="/login" className="neon-link">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
