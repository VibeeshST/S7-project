import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Verifying...');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');

      try {
        const res = await axios.get(`http://localhost:5000/api/auth/verify-email?token=${token}`);
        setMessage(res.data.message);

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (err) {
        console.error(err);
        if (err.response?.data?.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage('Verification failed. Please try again.');
        }
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Email Verification</h2>
      <p>{message}</p>
      <p>You’ll be redirected shortly...</p>
    </div>
  );
};

export default VerifyEmail;
