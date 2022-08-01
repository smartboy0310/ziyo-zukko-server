const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/images'));
    },
    filename: function (req, file, cb) {
        cb(null, Data.now() + '-' + file.originalname.split(" ").join(""))
    }
})
const upload = multer({ storage: storage })

module.exports = upload