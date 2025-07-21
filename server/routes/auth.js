const express = require('express');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const jwt = require('jsonwebtoken'); // add this at top
const SECRET = 'rt3YG3ZA8iiIFJ026AySHpxXt3pFqiThtb75pY0slgg='; // ideally use process.env.JWT_SECRE

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'Email already registered' });

  const token = crypto.randomBytes(32).toString('hex');

  const user = new User({ email, password, verificationToken: token });
  await user.save();

  const verifyURL = `http://localhost:3000/verify-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    html: `<p>Click <a href="${verifyURL}">here</a> to verify your account.</p>`,
  });

  res.status(201).json({ message: 'Check your email to verify.' });
});
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: 'Invalid or missing token' });
  }

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid token or already verified' });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error during verification' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: 'User not found' });

    if (!user.isVerified)
      return res.status(401).json({ message: 'Please verify your email first' });

    if (user.password !== password)
      return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
