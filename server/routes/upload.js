const express = require('express');
const router = express.Router();
const multer = require('multer');
const Resource = require('../models/Resource');
const { storage } = require('../utils/cloudinary'); // cloudinary storage
const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  const { title, description, department, semester, subject } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileUrl = req.file.path;
  const fileName = req.file.originalname;

  try {
    const newResource = new Resource({
      title,
      description,
      department,
      semester,
      subject,
      fileUrl,
      fileName,
      uploadedBy: req.body.uploadedBy || 'anonymous'
    });

    await newResource.save();

    res.status(200).json({
      message: 'File uploaded and metadata saved',
      fileUrl,
      resource: newResource
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving resource' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ uploadedAt: -1 });
    res.json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch resources' });
  }
});


module.exports = router;
