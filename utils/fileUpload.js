const multer = require("multer");
const path = require("path");

// Set storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "..","public", "uploads");
    cb(null, uploadPath); // Fayl saqlanadigan papkani ko'rsating
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Fayl nomini ko'rsating
  },
});

// upload
const upload = multer({
  storage,
  limits: { fileSize: 10000000 },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});

// check file types
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    cb(null, true); // Fayl turi to'g'ri
  } else {
    cb(new Error("Only images (jpeg, jpg, png, gif) are allowed!")); // Fayl turi noto'g'ri
  }
}

module.exports = upload;
