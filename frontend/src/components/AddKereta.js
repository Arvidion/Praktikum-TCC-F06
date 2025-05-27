import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function AddKereta() {
  const [formData, setFormData] = useState({
    nomorKereta: '',
    jenisKereta: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nomorKereta || !formData.jenisKereta) {
      alert('Semua field harus diisi');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await axiosInstance.post('/api/kereta', formData);
      alert(data.msg || 'Kereta berhasil ditambahkan');
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

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Tambah Kereta Baru</h1>
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

export default AddKereta;