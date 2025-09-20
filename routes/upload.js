// routes/upload.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set storage engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/images/'),
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Check file type
function checkFileType(file, cb) {
  const fileType = /jpeg|jpg|png|gif/;
  const extname = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileType.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only!'));
  }
}

// Init upload
const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('image');

export default upload;
