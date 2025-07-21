import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      setMessage(res.data.message);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setMessage(err.response.data.message);
      } else {
        setMessage('Something went wrong.');
      }
    }
  };

  return (
    <div className="register-wrapper">
      <style>
        {`
          .register-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #f4f6f9;
          }

          .register-box {
            background: #ffffff;
            padding: 3rem 2rem;
            border-radius: 14px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
            max-width: 400px;
            width: 100%;
            text-align: top;
          }

          .register-box h2 {
            font-size: 1.8rem;
            color: #2c3e50;
            margin-bottom: 1.5rem;
          }

          .register-box form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .register-box input {
            padding: 0.8rem 1rem;
            border-radius: 8px;
            border: 2px solid #dcdfe3;
            font-size: 1rem;
            transition: border 0.3s ease, box-shadow 0.3s ease;
            background: #fcfcfd;
          }

          .register-box input:focus {
            border-color: #3498db;
            box-shadow: 0 0 8px #3498db44;
            outline: none;
          }

          .register-box button {
            background: linear-gradient(to right, #3498db, #2ecc71);
            color: white;
            padding: 0.75rem;
            font-size: 1rem;
            font-weight: 600;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(52, 152, 219, 0.2);
          }

          .register-box button:hover {
            background: white;
            color: #3498db;
            border: 2px solid #3498db;
          }

          .form-message {
            margin-top: 1.5rem;
            font-size: 1rem;
            color: #e74c3c;
            font-weight: 500;
          }
        `}
      </style>

      <div className="register-box">
        <h2> Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <button type="submit">Register</button>
        </form>
        <p className="form-message">{message}</p>
      </div>
    </div>
  );
};

export default Register;
