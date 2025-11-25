import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all auth data
    logout();
    localStorage.clear();
    
    // Redirect to login
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }, [navigate]);

  return (
    <div className="page-container">
      <div className="auth-container">
        <div className="mission-header">
          <h1 className="neon-text">LOGGING OUT...</h1>
          <p className="terminal-text">Clearing mission credentials</p>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
