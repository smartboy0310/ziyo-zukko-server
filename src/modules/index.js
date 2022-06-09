const express = require("express")
const router = express.Router()
const FileUpload = require('../middleware/multer')

const Admin = require('./admin/admin')
const About = require('./about/about')
const Photo = require('./photo/photo')
const Video = require('./video/video')
const Partner = require('./partner/partner')
const General = require('./general/general')


router
      .post('/login', Admin.LOGIN)

      .get('/about', About.GET)
      .put('/about', About.PUT)

      .get('/photo', Photo.GET)
      .post('/photo', FileUpload.single("photo"), Photo.POST)
      .put('/photo', FileUpload.single("photo"), Photo.PUT)
      .delete('/photo', Photo.DELETE)

      .get('/video', Video.GET)
      .post('/video', Video.POST)
      .put('/video', Video.PUT)
      .delete('/video', Video.DELETE)

      .get('/partner', Partner.GET)
      .post('/partner', FileUpload.single("photo"), Partner.POST)
      .put('/partner', FileUpload.single("photo"), Partner.PUT)
      .delete('/partner', Partner.DELETE)

      .get('/general', General.GET)
      .put('/general', General.PUT)

module.exports = router