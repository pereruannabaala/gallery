const multer = require('multer');
const path = require('path');




// Set Storage engine
const storage = multer.diskStorage({
    destination: './public/images/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

// Init upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req,file, cb){
        checkFileType(file, cb);
    }
}).single('image');

export default upload;
