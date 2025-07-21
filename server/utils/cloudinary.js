const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'college-resources', // Keep civic-report in separate folder
    allowed_formats: ['jpg', 'png', 'pdf', 'docx', 'pptx', 'xlsx'],
    resource_type: 'auto',
  },
});

module.exports = { cloudinary, storage };
