import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  const validateToken = async (token) => {
    try {
      const response = await axiosInstance.get('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Token validation failed:', error);
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await validateToken(token);
          if (userData) {
            setAuth({ token, user: userData });
          } else {
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (token) => {
    try {
      localStorage.setItem('token', token);
      const userData = await validateToken(token);
      if (userData) {
        setAuth({ token, user: userData });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      localStorage.removeItem('token');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 