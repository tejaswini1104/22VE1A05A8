import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UrlShortenerForm from './components/UrlShortenerForm';
import UrlStatsPage from './components/UrlStatsPage';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="nav">
        <Link to="/">Shorten URLs</Link>
        <Link to="/stats">Statistics</Link>
      </div>
      <Routes>
        <Route path="/" element={<UrlShortenerForm />} />
        <Route path="/stats" element={<UrlStatsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
