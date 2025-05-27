import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="section">
      <div className="container">
        <div className="has-text-centered mb-6">
          <h1 className="title is-2 has-text-primary">YOJO Train System</h1>
          <p className="subtitle is-4">Manage your train schedules, stations, and more</p>
        </div>

        <div className="columns is-centered is-multiline">
          <div className="column is-one-third">
            <div className="card h-100">
              <div className="card-content" style={{ height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="has-text-centered mb-4">
                  <span className="icon is-large">
                    <i className="fas fa-train fa-3x has-text-primary"></i>
                  </span>
                </div>
                <p className="title is-4 has-text-centered">Kereta</p>
                <p className="subtitle is-6 has-text-centered">Manage train information and details</p>
              </div>
              <footer className="card-footer">
                <Link to="/kereta" className="card-footer-item button is-primary is-light">
                  <span className="icon">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                  <span>View Trains</span>
                </Link>
              </footer>
            </div>
          </div>

          <div className="column is-one-third">
            <div className="card h-100">
              <div className="card-content" style={{ height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="has-text-centered mb-4">
                  <span className="icon is-large">
                    <i className="fas fa-building fa-3x has-text-info"></i>
                  </span>
                </div>
                <p className="title is-4 has-text-centered">Stasiun</p>
                <p className="subtitle is-6 has-text-centered">Manage station locations and information</p>
              </div>
              <footer className="card-footer">
                <Link to="/stasiun" className="card-footer-item button is-info is-light">
                  <span className="icon">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                  <span>View Stations</span>
                </Link>
              </footer>
            </div>
          </div>

          <div className="column is-one-third">
            <div className="card h-100">
              <div className="card-content" style={{ height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="has-text-centered mb-4">
                  <span className="icon is-large">
                    <i className="fas fa-clock fa-3x has-text-success"></i>
                  </span>
                </div>
                <p className="title is-4 has-text-centered">Jadwal</p>
                <p className="subtitle is-6 has-text-centered">Manage train schedules and routes</p>
              </div>
              <footer className="card-footer">
                <Link to="/jadwal" className="card-footer-item button is-success is-light">
                  <span className="icon">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                  <span>View Schedules</span>
                </Link>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home; 