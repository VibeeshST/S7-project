const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: String,
  description: String,
  department: String,
  semester: String,
  subject: String,
  fileUrl: String,
  fileName: String,
  uploadedBy: String, // optional: email or userId
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', resourceSchema);
