import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import '../styles/disco-theme.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('MISSION FAILED: All fields required');
      setLoading(false);
      return;
    }

    try {
      const response = await login(email, password);
      console.log('ACCESS GRANTED:', response.message);
      navigate('/gallery');
    } catch (err) {
      setError(err.response?.data?.message || 'ACCESS DENIED: Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-container">
        <div className="mission-header">
          <h1 className="neon-text">AGENT LOGIN</h1>
          <p className="terminal-text">Enter credentials to access the mission</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="Enter your password"
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
            {loading ? 'AUTHENTICATING...' : 'INITIATE LOGIN SEQUENCE'}
          </button>
        </form>

        <div className="auth-footer">
          <p className="terminal-text">
            New agent? <Link to="/signup" className="neon-link">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
