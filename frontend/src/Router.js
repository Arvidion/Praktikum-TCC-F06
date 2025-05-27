import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/useAuth';
import Navbar from './components/Navbar';
import Home from './components/Home';
import KeretaList from './components/KeretaList';
import AddKereta from './components/AddKereta';
import UpdateKereta from './components/UpdateKereta';
import StasiunList from './components/StasiunList';
import AddStasiun from './components/AddStasiun';
import UpdateStasiun from './components/UpdateStasiun';
import JadwalList from './components/JadwalList';
import AddJadwal from './components/AddJadwal';
import UpdateJadwal from './components/UpdateJadwal';
import Login from './components/Login';
import Register from './components/Register';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
};

const Router = () => {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      <div className="App">
        {auth && <Navbar />}
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={!auth ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!auth ? <Register /> : <Navigate to="/login" />} />
          
          {/* Protected routes */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kereta"
            element={
              <ProtectedRoute>
                <KeretaList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kereta/add"
            element={
              <ProtectedRoute>
                <AddKereta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kereta/edit/:id"
            element={
              <ProtectedRoute>
                <UpdateKereta />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stasiun"
            element={
              <ProtectedRoute>
                <StasiunList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stasiun/add"
            element={
              <ProtectedRoute>
                <AddStasiun />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stasiun/edit/:id"
            element={
              <ProtectedRoute>
                <UpdateStasiun />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jadwal"
            element={
              <ProtectedRoute>
                <JadwalList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jadwal/add"
            element={
              <ProtectedRoute>
                <AddJadwal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jadwal/edit/:id"
            element={
              <ProtectedRoute>
                <UpdateJadwal />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router; 