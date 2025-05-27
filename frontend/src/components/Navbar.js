import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import config from '../utils/config.js';

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      // Call backend logout endpoint to clear refresh token
      const response = await fetch(`${config.BASE_URL}/api/logout`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok && response.status !== 204) {
        throw new Error('Logout failed');
      }

      // Clear local auth state
      logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to logout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation" style={{ minHeight: '100px', alignItems: 'center' }}>
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item has-text-weight-bold is-size-4" to="/dashboard">
            YOJO Train
          </Link>

          <a
            role="button"
            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setIsActive(!isActive)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link className="navbar-item" to="/dashboard">
              Home
            </Link>
            <Link className="navbar-item" to="/kereta">
              Kereta
            </Link>
            <Link className="navbar-item" to="/stasiun">
              Stasiun
            </Link>
            <Link className="navbar-item" to="/jadwal">
              Jadwal
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button 
                  className={`button is-light ${isLoading ? 'is-loading' : ''}`}
                  onClick={handleLogout}
                  disabled={isLoading}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 