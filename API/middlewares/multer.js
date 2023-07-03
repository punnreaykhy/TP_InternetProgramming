const multer = require('multer');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create Multer upload instance
// const upload = multer({ dest: "uploads/" });
const upload = multer({
  storage: storage, 
  // limits: {
  //   fileSize: 10 * 1024 * 1024, // Increase the limit as per your requirement (10MB in this example)
  // },
});

module.exports = {
  upload
}