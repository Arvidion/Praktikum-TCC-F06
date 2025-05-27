import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function AddStasiun() {
  const [formData, setFormData] = useState({
    namaStasiun: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.namaStasiun) {
      alert('Nama stasiun harus diisi');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await axiosInstance.post('/api/stasiun', formData);
      alert(data.msg || 'Stasiun berhasil ditambahkan');
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

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Tambah Stasiun Baru</h1>
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

export default AddStasiun;