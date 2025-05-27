import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function UpdateKereta() {
  const [formData, setFormData] = useState({
    nomorKereta: '',
    jenisKereta: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchKereta();
  }, [id]);

  const fetchKereta = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axiosInstance.get(`/api/kereta/${id}`);
      setFormData({
        nomorKereta: data.nomorKereta,
        jenisKereta: data.jenisKereta
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Gagal mengambil data kereta: ' + (err.response?.data?.msg || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nomorKereta || !formData.jenisKereta) {
      alert('Semua field harus diisi');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await axiosInstance.patch(`/api/kereta/${id}`, formData);
      alert(data.msg || 'Data kereta berhasil diperbarui');
      navigate('/kereta');
    } catch (err) {
      console.error('Submit error:', err);
      alert('Error: ' + (err.response?.data?.msg || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/kereta');
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
                <button className="button is-light" onClick={fetchKereta}>
                  Coba Lagi
                </button>
              </div>
              <div className="control">
                <button className="button is-light" onClick={() => navigate('/kereta')}>
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
        <h1 className="title">Update Kereta</h1>
        <div className="box">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Nomor Kereta</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={formData.nomorKereta}
                  onChange={(e) => setFormData({...formData, nomorKereta: e.target.value})}
                  placeholder="Contoh: KA-001"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Jenis Kereta</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={formData.jenisKereta}
                    onChange={(e) => setFormData({...formData, jenisKereta: e.target.value})}
                    required
                  >
                    <option value="">Pilih jenis kereta</option>
                    <option value="KRL Yogyakarta">KRL Yogyakarta</option>
                    <option value="Prameks">Prameks</option>
                    <option value="KA Bandara">KA Bandara</option>
                    <option value="KA Jarak Jauh">KA Jarak Jauh</option>
                    <option value="KA Lokal">KA Lokal</option>
                  </select>
                </div>
              </div>
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

export default UpdateKereta;