import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function UpdateStasiun() {
  const [formData, setFormData] = useState({
    namaStasiun: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchStasiun();
  }, [id]);

  const fetchStasiun = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axiosInstance.get(`/api/stasiun/${id}`);
      setFormData({
        namaStasiun: data.namaStasiun
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Gagal mengambil data stasiun: ' + (err.response?.data?.msg || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.namaStasiun) {
      alert('Nama stasiun harus diisi');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await axiosInstance.patch(`/api/stasiun/${id}`, formData);
      alert(data.msg || 'Data stasiun berhasil diperbarui');
      navigate('/stasiun');
    } catch (err) {
      console.error('Submit error:', err);
      alert('Error: ' + (err.response?.data?.msg || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/stasiun');
  };

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <progress className="progress is-primary" max="100">Loading...</progress>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section">
        <div className="container">
          <div className="notification is-danger">
            <h2 className="title is-4">Error</h2>
            <p>{error}</p>
            <div className="field is-grouped mt-4">
              <div className="control">
                <button className="button is-light" onClick={fetchStasiun}>
                  Coba Lagi
                </button>
              </div>
              <div className="control">
                <button className="button is-light" onClick={() => navigate('/stasiun')}>
                  Kembali ke List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Update Stasiun</h1>
        <div className="box">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Nama Stasiun</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  value={formData.namaStasiun}
                  onChange={(e) => setFormData({...formData, namaStasiun: e.target.value})}
                  placeholder="Contoh: Stasiun Gambir"
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-building"></i>
                </span>
              </div>
              <p className="help">Masukkan nama stasiun dengan lengkap</p>
            </div>

            <div className="field is-grouped mt-5">
              <div className="control">
                <button 
                  type="submit" 
                  className={`button is-primary ${submitting ? 'is-loading' : ''}`}
                  disabled={submitting}
                >
                  <span className="icon">
                    <i className="fas fa-save"></i>
                  </span>
                  <span>Simpan</span>
                </button>
              </div>
              <div className="control">
                <button 
                  type="button" 
                  className="button is-light"
                  onClick={handleCancel}
                >
                  <span className="icon">
                    <i className="fas fa-times"></i>
                  </span>
                  <span>Batal</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateStasiun;