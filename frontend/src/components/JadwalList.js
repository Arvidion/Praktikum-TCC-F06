import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function JadwalList() {
  const [jadwal, setJadwal] = useState([]);
  const [kereta, setKereta] = useState([]);
  const [selectedKereta, setSelectedKereta] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJadwal();
    fetchKereta();
  }, []);

  const fetchKereta = async () => {
    try {
      const { data } = await axiosInstance.get('/api/kereta');
      setKereta(data);
    } catch (err) {
      console.error('Error fetching kereta:', err);
      setError('Gagal mengambil data kereta');
    }
  };

  const fetchJadwal = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/api/jadwal');
      console.log('Fetched jadwal data:', JSON.stringify(data, null, 2));
      setJadwal(data);
      setError(null);
    } catch (err) {
      console.error('Detailed error:', err);
      if (err.name === 'TypeError') {
        setError('Tidak bisa terhubung ke server. Pastikan backend berjalan.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data jadwal ini?')) {
      try {
        const { data } = await axiosInstance.delete(`/api/jadwal/${id}`);
        alert(data.msg || 'Data jadwal berhasil dihapus');
        fetchJadwal(); // Refresh data
      } catch (err) {
        console.error('Delete error:', err);
        alert('Gagal menghapus data: ' + err.message);
      }
    }
  };

  const handleAdd = () => {
    navigate('/jadwal/add');
  };

  const handleEdit = (id) => {
    navigate(`/jadwal/edit/${id}`);
  };

  const filteredJadwal = selectedKereta 
    ? jadwal.filter(j => j.Kereta && j.Kereta.idKereta.toString() === selectedKereta)
    : jadwal;

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
            <button className="button is-light mt-4" onClick={fetchJadwal}>Coba Lagi</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <h1 className="title">Data Jadwal</h1>
          </div>
          <div className="column is-narrow">
            <div className="buttons">
              <button 
                onClick={handleAdd} 
                className="button is-primary"
              >
                <span className="icon">
                  <i className="fas fa-plus"></i>
                </span>
                <span>Tambah Jadwal</span>
              </button>

              <div className="select">
                <select 
                  value={selectedKereta} 
                  onChange={(e) => setSelectedKereta(e.target.value)}
                >
                  <option value="">Semua Kereta</option>
                  {kereta.map((k) => (
                    <option key={k.idKereta} value={k.idKereta}>
                      {k.nomorKereta}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="table-container">
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th className="has-text-centered">ID</th>
                <th>Nomor Kereta</th>
                <th>Nama Rute</th>
                <th>Stasiun Awal</th>
                <th>Stasiun Tujuan</th>
                <th>Waktu Berangkat</th>
                <th>Waktu Tiba</th>
                <th className="has-text-centered">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredJadwal.length === 0 ? (
                <tr>
                  <td colSpan="8" className="has-text-centered">
                    {selectedKereta ? 'Belum ada jadwal untuk kereta ini' : 'Tidak ada data jadwal'}
                  </td>
                </tr>
              ) : (
                filteredJadwal.map((j) => (
                  <tr key={j.idJadwal}>
                    <td className="has-text-centered">{j.idJadwal}</td>
                    <td>{j.Kereta ? j.Kereta.nomorKereta : 'N/A'}</td>
                    <td>{j.namaRute}</td>
                    <td>{j.StasiunAwal ? j.StasiunAwal.namaStasiun : 'N/A'}</td>
                    <td>{j.StasiunAkhir ? j.StasiunAkhir.namaStasiun : 'N/A'}</td>
                    <td>{j.waktuKeberangkatan}</td>
                    <td>{j.waktuTiba}</td>
                    <td className="has-text-centered">
                      <div className="buttons is-centered">
                        <button
                          onClick={() => handleEdit(j.idJadwal)}
                          className="button is-info is-small"
                        >
                          <span className="icon">
                            <i className="fas fa-edit"></i>
                          </span>
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(j.idJadwal)}
                          className="button is-danger is-small"
                        >
                          <span className="icon">
                            <i className="fas fa-trash"></i>
                          </span>
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="has-text-centered mt-5">
          <p className="subtitle">Total: {filteredJadwal.length} jadwal</p>
        </div>
      </div>
    </div>
  );
}

export default JadwalList;