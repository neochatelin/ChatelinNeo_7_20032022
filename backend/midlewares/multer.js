const multer = require('multer');

const allowed_ext = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpeg',
    'image/png' : 'png'
}
let index = 0;
const storage = multer.diskStorage(
    {
        destination : (req,res,cb) => {
            cb(null, 'images')
        },
        filename : (req,res,cb) => {
            const ext = allowed_ext[res.mimetype];
            cb(null, Date.now() + index + "." + ext);
            index++;
        }
    }
);

var uploadFromDesktop = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var mimeTypeList = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        if (mimeTypeList.indexOf(file.mimetype) <= -1) {
            var cusError = new Error('File type is invalid')
            cusError.code = 'INVALID_FILE_TYPE'
            cusError.field = file.fieldname
            return callback(cusError)
        } else {
            return callback(null, true)
        }
    }
}).single('image');

module.exports = function upload(req, res){
    switch (req.params.provider) {
        case 'desktop':
            uploadFromDesktop(req, res, function (err) {
                if (err) {
                    console.log(err)
                    console.log(err.code)
                    switch (err.code) {
                        case 'LIMIT_UNEXPECTED_FILE':
                            res.end('Number of files choosen for uploading are greater than ' + 2)
                            break
                        case 'LIMIT_FILE_SIZE':
                            res.end('Choosen file size is greater than ' + maxSize)
                            break
                        case 'INVALID_FILE_TYPE':
                            res.end('Choosen file is of invalid type')
                            break
                        case 'ENOENT':
                            res.end('Unable to store the file')
                            break
                    }
                }
                res.end('File is uploaded successfully')
            })
            break;
        default:
            res.send('unable to store the file')
    }
}