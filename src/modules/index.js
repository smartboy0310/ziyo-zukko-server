const express = require("express")
const router = express.Router()
const FileUpload = require('../middleware/multer')

const Admin = require('./admin/admin')
const About = require('./about/about')
const Photo = require('./photo/photo')
const Video = require('./video/video')
const Partner = require('./partner/partner')
const General = require('./general/general')
const Appeals = require('./appeals/appeals')
const Certificate = require('./certificate/certificate')
const Activity = require('./activity/activity')


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


      .get('/appeals', Appeals.GET)
      .post('/appeals', Appeals.POST)
      .put('/appeals', Appeals.PUT)
      .delete('/appeals', Appeals.DELETE)

      .get('/certificate', Certificate.GET)
      .post('/certificate', FileUpload.array("photos"), Certificate.POST)
      .put('/certificate', FileUpload.array("photos"), Certificate.PUT)
      .delete('/certificate', Certificate.DELETE)

      .get('/activity', Activity.GET)
      .post('/activity', FileUpload.array("photos"), Activity.POST)
      .put('/activity', FileUpload.array("photos"), Activity.PUT)
      .delete('/activity', Activity.DELETE)

module.exports = router