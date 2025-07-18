import React, { useEffect, useState } from 'react';
import { getStats } from '../utils/api';
import './UrlStatsPage.css';

function UrlStatsPage() {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getStats();
        setStats(data);
        setError('');
      } catch (err) {
        setError(err.message);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="stats-container">
      <h2>URL Statistics</h2>
      {error && <p className="error-text">{error}</p>}

      <ul className="stats-list">
        {stats.map((item, index) => (
          <li key={index} className="stats-item">
            <p className="stats-url">
              <strong>{item.shortUrl}</strong><br />
              <small>Created: {item.createdAt} | Expires: {item.expiry}</small>
            </p>
            <p>Total Clicks: {item.clicks}</p>
            <div className="click-details">
              <p>Click Details:</p>
              {item.clickDetails?.map((click, i) => (
                <div key={i} className="click-entry">
                  ⏱ {click.timestamp} | 🖥 {click.source} | 🌍 {click.location}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UrlStatsPage;
