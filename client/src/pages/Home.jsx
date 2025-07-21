import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="page-container">
        <h1>🏫 Welcome to the College Resource Platform</h1>
        <p>Your one-stop solution for sharing and accessing academic materials.</p>

        <div className="cta-buttons">
          <Link to="/upload" className="btn primary">📤 Upload Resource</Link>
          <Link to="/download" className="btn">📥 Download Resources</Link>
        </div>

        <h2 className="mt-2">🔗 Quick Access</h2>
        <ul className="nav-list">
          <li><Link to="/login">🔐 Login to your account</Link></li>
          <li><Link to="/register">📝 Create a new account</Link></li>
          <li><Link to="/contact">📞 Reach out to us</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
