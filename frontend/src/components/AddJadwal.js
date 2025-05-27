import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function AddJadwal() {
  const [formData, setFormData] = useState({
    idStasiunAwal: '',
    idStasiunAkhir: '',
    idKereta: '',
    namaRute: '',
    waktuKeberangkatan: '',
    waktuTiba: ''
  });
  const [stasiun, setStasiun] = useState([]);
  const [kereta, setKereta] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStasiun();
    fetchKereta();
  }, []);

  const fetchStasiun = async () => {
    try {
      const { data } = await axiosInstance.get('/api/stasiun');
      setStasiun(data);
    } catch (err) {
      console.error('Error fetching stasiun:', err);
      setError('Gagal mengambil data stasiun: ' + err.message);
    }
  };

  const fetchKereta = async () => {
    try {
      const { data } = await axiosInstance.get('/api/kereta');
      setKereta(data);
    } catch (err) {
      console.error('Error fetching kereta:', err);
      setError('Gagal mengambil data kereta: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.idStasiunAwal || !formData.idStasiunAkhir || !formData.idKereta || 
        !formData.namaRute || !formData.waktuKeberangkatan || !formData.waktuTiba) {
      alert('Semua field harus diisi');
      return;
    }

    if (formData.idStasiunAwal === formData.idStasiunAkhir) {
      alert('Stasiun awal dan tujuan tidak boleh sama');
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await axiosInstance.post('/api/jadwal', formData);
      alert(data.msg || 'Jadwal berhasil ditambahkan');
      navigate('/jadwal');
    } catch (err) {
      console.error('Submit error:', err);
      alert('Error: ' + (err.response?.data?.msg || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/jadwal');
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
            <button className="button is-light mt-4" onClick={() => {
              fetchStasiun();
              fetchKereta();
            }}>Coba Lagi</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Tambah Jadwal Baru</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Stasiun Awal</label>
            <div className="control">
              <div className="select">
                <select
                  value={formData.idStasiunAwal}
                  onChange={(e) => setFormData({...formData, idStasiunAwal: e.target.value})}
                  required
                >
                  <option value="">Pilih stasiun awal</option>
                  {stasiun.map((s) => (
                    <option key={s.idStasiun} value={s.idStasiun}>
                      {s.namaStasiun}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="field">
            <label className="label">Stasiun Tujuan</label>
            <div className="control">
              <div className="select">
                <select
                  value={formData.idStasiunAkhir}
                  onChange={(e) => setFormData({...formData, idStasiunAkhir: e.target.value})}
                  required
                >
                  <option value="">Pilih stasiun tujuan</option>
                  {stasiun.map((s) => (
                    <option key={s.idStasiun} value={s.idStasiun}>
                      {s.namaStasiun}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Nomor Kereta</label>
            <div className="control">
              <div className="select">
                <select
                  value={formData.idKereta}
                  onChange={(e) => setFormData({...formData, idKereta: e.target.value})}
                  required
                >
                  <option value="">Pilih Nomor kereta</option>
                  {kereta.map((k) => (
                    <option key={k.idKereta} value={k.idKereta}>
                      {k.nomorKereta} - {k.jenisKereta}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Nama Rute</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={formData.namaRute}
                onChange={(e) => setFormData({...formData, namaRute: e.target.value})}
                placeholder="Contoh: Jakarta - Bandung"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Waktu Keberangkatan</label>
            <div className="control">
              <input
                className="input"
                type="time"
                value={formData.waktuKeberangkatan}
                onChange={(e) => setFormData({...formData, waktuKeberangkatan: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Waktu Tiba</label>
            <div className="control">
              <input
                className="input"
                type="time"
                value={formData.waktuTiba}
                onChange={(e) => setFormData({...formData, waktuTiba: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="field is-grouped mt-5">
            <div className="control">
              <button 
                type="submit" 
                className={`button is-primary ${submitting ? 'is-loading' : ''}`}
                disabled={submitting}
              >
                Simpan
              </button>
            </div>
            <div className="control">
              <button 
                type="button" 
                className="button is-light"
                onClick={handleCancel}
              >
                Batal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddJadwal;