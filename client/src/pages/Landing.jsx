import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div style={styles.hero}>
        <h1>Welcome to the College Resource Sharing Platform</h1>
        <p>Share, download, and manage academic resources easily.</p>
        <div>
          <Link to="/register" style={styles.button}>Get Started</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  hero: {
    padding: '4rem',
    textAlign: 'center',
    backgroundColor: '#ecf0f1',
    minHeight: '90vh'
  },
  button: {
    marginTop: '1.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2980b9',
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2rem',
    borderRadius: '8px'
  }
};

export default Landing;
