import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import config from '../utils/config.js';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch(`${config.BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const success = await login(data.accessToken);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Failed to validate login. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.message || 'Failed to login');
    }
  };

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <div className="box">
                <h1 className="title has-text-centered has-text-primary">YOJO Train System</h1>
                <p className="subtitle has-text-centered mb-5">Welcome back! Please login to your account.</p>
                
                {error && (
                  <div className="notification is-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>

                  <div className="field mt-5">
                    <button type="submit" className="button is-primary is-fullwidth">
                      Login
                    </button>
                  </div>
                </form>

                <div className="has-text-centered mt-4">
                  <p>
                    Don't have an account?{' '}
                    <Link to="/register" className="has-text-primary has-text-weight-bold">
                      Register here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
