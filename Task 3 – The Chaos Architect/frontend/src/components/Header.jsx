import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, getUsername } from '../services/authService';
import '../styles/disco-theme.css';

function Header() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const username = getUsername();

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1 className="logo-text">🕺 THE GROOVE GALLERY</h1>
        </Link>

        <nav className="nav-menu">
          <Link to="/gallery" className="nav-link">WALL OF FAME</Link>
          
          {authenticated ? (
            <>
              <Link to="/upload" className="nav-link">UPLOAD GROOVE</Link>
              <Link to="/profile" className="nav-link">PROFILE</Link>
              <div className="user-info">
                <span className="username">Agent: {username}</span>
                <button onClick={handleLogout} className="logout-button">
                  LOGOUT
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">LOGIN</Link>
              <Link to="/signup" className="nav-link">REGISTER</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
