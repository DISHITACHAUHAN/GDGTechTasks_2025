import { Link } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';
import '../styles/disco-theme.css';

function HomePage() {
  const authenticated = isAuthenticated();

  return (
    <div className="page-container">
      <div className="home-container">
        <div className="mission-briefing">
          <h1 className="home-title neon-flicker">🕺 THE GROOVE GALLERY 🕺</h1>
          <h2 className="mission-subtitle">MISSION BRIEFING</h2>
          
          <div className="briefing-content">
            <p className="terminal-text briefing-text">
              ALERT: The Great Disco Glitch of 2025 has struck!
            </p>
            <p className="terminal-text briefing-text">
              Smart mirrors worldwide are malfunctioning, displaying only static disco balls.
            </p>
            <p className="terminal-text briefing-text">
              Your mission: Upload authentic dance moves to restore order through pure human groove energy.
            </p>
            <p className="terminal-text briefing-text">
              Only authorized agents can transmit grooves to the infected mirrors.
            </p>
          </div>

          <div className="mission-objectives">
            <h3 className="objectives-title">MISSION OBJECTIVES:</h3>
            <ul className="objectives-list">
              <li className="terminal-text">✓ Register as an authorized agent</li>
              <li className="terminal-text">✓ Upload your best dance moves</li>
              <li className="terminal-text">✓ Rate other agents' grooves</li>
              <li className="terminal-text">✓ Combat the disco glitch together</li>
            </ul>
          </div>

          <div className="cta-buttons">
            {authenticated ? (
              <>
                <Link to="/upload" className="mission-button">
                  INITIATE GROOVE UPLOAD
                </Link>
                <Link to="/gallery" className="mission-button">
                  VIEW WALL OF FAME
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="mission-button">
                  REGISTER AS AGENT
                </Link>
                <Link to="/login" className="mission-button">
                  AGENT LOGIN
                </Link>
                <Link to="/gallery" className="mission-button">
                  VIEW GALLERY
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="disco-animation">
          <div className="disco-ball pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
