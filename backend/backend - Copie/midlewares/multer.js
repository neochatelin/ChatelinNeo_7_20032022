const multer = require('multer');

const allowed_ext = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpeg',
    'image/png' : 'png'
}

let index = 0;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/images');
    },
    filename : (req,res,cb) => {
        const ext = allowed_ext[res.mimetype];
        cb(null, Date.now() + index + "." + ext);
        index++;
    }
});
  
const upload = multer({ storage: storage });

module.exports = upload.any();