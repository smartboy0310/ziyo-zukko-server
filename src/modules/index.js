const express = require("express")
const router = express.Router()
const FileUpload = require('../middleware/multer')

const Admin = require('./admin/admin')
const About = require('./about/about')
const Photo = require('./photo/photo')

router
      .post('/login', Admin.LOGIN)

      .get('/about', About.GET)
      .put('/about', About.PUT)

      .get('/photo', Photo.GET)
      .post('/photo', FileUpload.single("photo"), Photo.POST)
      .put('/photo', FileUpload.single("photo"), Photo.PUT)
      .delete('/photo', Photo.DELETE)

module.exports = router