import React, { useState } from 'react';
import { shortenUrl } from '../utils/api';
import './UrlShortenerForm.css';

function UrlShortenerForm() {
  const [urls, setUrls] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: '', validity: '', shortcode: '' }]);
    }
  };

  const handleSubmit = async () => {
    try {
      const newResults = [];
      for (const entry of urls) {
        const data = await shortenUrl(entry);
        newResults.push(data);
      }
      setResults(newResults);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="shortener-container">
      <h2>URL Shortener</h2>

      {urls.map((entry, index) => (
        <div className="url-input-row" key={index}>
          <input
            type="text"
            placeholder="Original URL"
            value={entry.url}
            onChange={(e) => handleChange(index, 'url', e.target.value)}
            className="input original-url"
          />
          <input
            type="number"
            placeholder="Validity (min)"
            value={entry.validity}
            onChange={(e) => handleChange(index, 'validity', e.target.value)}
            className="input validity"
          />
          <input
            type="text"
            placeholder="Custom Shortcode"
            value={entry.shortcode}
            onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
            className="input shortcode"
          />
        </div>
      ))}

      <div className="button-group">
        <button onClick={addUrlField} disabled={urls.length >= 5} className="btn secondary">Add URL</button>
        <button onClick={handleSubmit} className="btn primary">Shorten</button>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="results">
        {results.map((r, idx) => (
          <div key={idx} className="result-item">
            <p><strong>Shortened:</strong> {r.shortUrl}</p>
            <p><small>Expires: {r.expiry}</small></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UrlShortenerForm;
