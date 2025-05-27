import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Form validation
    if (!username || !password || !confirmPassword) {
      setError('Semua field harus diisi');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/api/register', {
        username: username.trim(),
        password: password,
        confirm_password: confirmPassword
      });

      if (response.data) {
        alert('Registrasi berhasil! Silakan login.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Register error:', error);
      if (error.response) {
        // Error dari server
        setError(error.response.data.message || error.response.data.msg || 'Gagal melakukan registrasi');
      } else if (error.request) {
        // Error network
        setError('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
      } else {
        // Error lainnya
        setError('Terjadi kesalahan saat registrasi');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Reset error when user types
    if (error && error.includes('password')) {
      setError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    // Reset error when user types
    if (error && error.includes('password')) {
      setError('');
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
                <p className="subtitle has-text-centered mb-5">Create your account</p>
                
                {error && (
                  <div className="notification is-danger">
                    <button className="delete" onClick={() => setError('')}></button>
                    {error}
                  </div>
                )}

                <form onSubmit={handleRegister}>
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
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="Enter your password again"
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>

                  <div className="field mt-5">
                    <button 
                      type="submit" 
                      className={`button is-primary is-fullwidth ${loading ? 'is-loading' : ''}`}
                      disabled={loading}
                    >
                      Register
                    </button>
                  </div>
                </form>

                <div className="has-text-centered mt-4">
                  <p>
                    Already have an account?{' '}
                    <Link to="/login" className="has-text-primary has-text-weight-bold">
                      Login here
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
}

export default Register; 