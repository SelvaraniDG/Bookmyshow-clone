const express = require('express');
const router = express.Router();
const { upload } = require('../utils/upload');
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploads
const app = express();

// Route for uploading files
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Respond with the file URL (you may need to adjust this based on your setup)
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

module.exports = router;