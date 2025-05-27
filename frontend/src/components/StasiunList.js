import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

function StasiunList() {
  const [stasiun, setStasiun] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    field: 'namaStasiun',
    direction: 'asc'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchStasiun();
  }, []);

  const fetchStasiun = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/api/stasiun');
      setStasiun(data);
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
    if (window.confirm('Apakah Anda yakin ingin menghapus data stasiun ini?')) {
      try {
        const { data } = await axiosInstance.delete(`/api/stasiun/${id}`);
        alert(data.msg || 'Data stasiun berhasil dihapus');
        fetchStasiun(); // Refresh data
      } catch (err) {
        console.error('Delete error:', err);
        alert('Gagal menghapus data: ' + err.message);
      }
    }
  };

  const handleAdd = () => {
    navigate('/stasiun/add');
  };

  const handleEdit = (id) => {
    navigate(`/stasiun/edit/${id}`);
  };

  const handleSortChange = (event) => {
    const [field, direction] = event.target.value.split('-');
    setSortConfig({ field, direction });
  };

  // Sort the stasiun array based on selected field and direction
  const sortedStasiun = [...stasiun].sort((a, b) => {
    const { field, direction } = sortConfig;
    
    if (field === 'idStasiun') {
      return direction === 'asc' 
        ? a.idStasiun - b.idStasiun
        : b.idStasiun - a.idStasiun;
    } else {
      const comparison = a.namaStasiun.localeCompare(b.namaStasiun);
      return direction === 'asc' ? comparison : -comparison;
    }
  });

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
            <button className="button is-light mt-4" onClick={fetchStasiun}>Coba Lagi</button>
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
            <h1 className="title">Data Stasiun</h1>
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
                <span>Tambah Stasiun</span>
              </button>

              <div className="select">
                <select
                  value={`${sortConfig.field}-${sortConfig.direction}`}
                  onChange={handleSortChange}
                >
                  <option value="idStasiun-asc">ID (Terkecil)</option>
                  <option value="idStasiun-desc">ID (Terbesar)</option>
                  <option value="namaStasiun-asc">Nama (A-Z)</option>
                  <option value="namaStasiun-desc">Nama (Z-A)</option>
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
                <th>Nama Stasiun</th>
                <th className="has-text-centered">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sortedStasiun.length === 0 ? (
                <tr>
                  <td colSpan="3" className="has-text-centered">
                    Tidak ada data stasiun
                  </td>
                </tr>
              ) : (
                sortedStasiun.map((s) => (
                  <tr key={s.idStasiun}>
                    <td className="has-text-centered">{s.idStasiun}</td>
                    <td>{s.namaStasiun}</td>
                    <td className="has-text-centered">
                      <div className="buttons is-centered">
                        <button
                          onClick={() => handleEdit(s.idStasiun)}
                          className="button is-info is-small"
                        >
                          <span className="icon">
                            <i className="fas fa-edit"></i>
                          </span>
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(s.idStasiun)}
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
          <p className="subtitle">Total: {sortedStasiun.length} stasiun</p>
        </div>
      </div>
    </div>
  );
}

export default StasiunList;