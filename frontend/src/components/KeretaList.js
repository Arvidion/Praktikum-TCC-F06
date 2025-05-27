import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function KeretaList() {
  const [kereta, setKereta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJenis, setSelectedJenis] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchKereta();
  }, []);

  const fetchKereta = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/api/kereta');
      setKereta(data);
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
    if (window.confirm('Apakah Anda yakin ingin menghapus data kereta ini?')) {
      try {
        const { data } = await axiosInstance.delete(`/api/kereta/${id}`);
        alert(data.msg || 'Data kereta berhasil dihapus');
        fetchKereta(); // Refresh data
      } catch (err) {
        console.error('Delete error:', err);
        alert('Gagal menghapus data: ' + err.message);
      }
    }
  };

  const handleAdd = () => {
    navigate('/kereta/add');
  };

  const handleEdit = (id) => {
    navigate(`/kereta/edit/${id}`);
  };

  // Get unique jenis kereta for dropdown
  const jenisKeretaOptions = [...new Set(kereta.map(k => k.jenisKereta))];

  // Filter kereta based on selected jenis
  const filteredKereta = selectedJenis
    ? kereta.filter(k => k.jenisKereta === selectedJenis)
    : kereta;

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
            <button className="button is-light mt-4" onClick={fetchKereta}>Coba Lagi</button>
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
            <h1 className="title">Data Kereta</h1>
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
                <span>Tambah Kereta</span>
              </button>

              <div className="select">
                <select 
                  value={selectedJenis} 
                  onChange={(e) => setSelectedJenis(e.target.value)}
                >
                  <option value="">Semua Jenis Kereta</option>
                  {jenisKeretaOptions.map((jenis) => (
                    <option key={jenis} value={jenis}>
                      {jenis}
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
                <th>Jenis Kereta</th>
                <th className="has-text-centered">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredKereta.length === 0 ? (
                <tr>
                  <td colSpan="4" className="has-text-centered">
                    {selectedJenis ? 'Tidak ada kereta dengan jenis ini' : 'Tidak ada data kereta'}
                  </td>
                </tr>
              ) : (
                filteredKereta.map((k) => (
                  <tr key={k.idKereta}>
                    <td className="has-text-centered">{k.idKereta}</td>
                    <td>{k.nomorKereta}</td>
                    <td>{k.jenisKereta}</td>
                    <td className="has-text-centered">
                      <div className="buttons is-centered">
                        <button
                          onClick={() => handleEdit(k.idKereta)}
                          className="button is-info is-small"
                        >
                          <span className="icon">
                            <i className="fas fa-edit"></i>
                          </span>
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(k.idKereta)}
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
          <p className="subtitle">Total: {filteredKereta.length} kereta</p>
        </div>
      </div>
    </div>
  );
}

export default KeretaList;