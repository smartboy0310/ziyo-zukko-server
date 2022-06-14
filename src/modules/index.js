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
const Management = require('./management/management')
const Employees = require('./employees/employees')


router
      .post('/login', Admin.LOGIN)

      .get('/about', About.GET)
      .put('/about/:lang', About.PUT)

      .get('/photo', Photo.GET)
      .post('/photo/:lang', FileUpload.single("photo"), Photo.POST)
      .put('/photo/:lang', FileUpload.single("photo"), Photo.PUT)
      .delete('/photo/:lang', Photo.DELETE)

      .get('/video', Video.GET)
      .post('/video/:lang', Video.POST)
      .put('/video/:lang', Video.PUT)
      .delete('/video/:lang', Video.DELETE)

      .get('/partner', Partner.GET)
      .post('/partner/:lang', FileUpload.single("photo"), Partner.POST)
      .put('/partner/:lang', FileUpload.single("photo"), Partner.PUT)
      .delete('/partner/:lang', Partner.DELETE)

      .get('/general', General.GET)
      .put('/general/:lang', General.PUT)


      .get('/appeals', Appeals.GET)
      .post('/appeals/:lang', Appeals.POST)
      .put('/appeals', Appeals.PUT)
      .delete('/appeals', Appeals.DELETE)

      .get('/certificate', Certificate.GET)
      .post('/certificate/:lang', FileUpload.array("photos"), Certificate.POST)
      .put('/certificate/:lang', FileUpload.array("photos"), Certificate.PUT)
      .delete('/certificate/:lang', Certificate.DELETE)

      .get('/activity', Activity.GET)
      .post('/activity/:lang', FileUpload.array("photos"), Activity.POST)
      .put('/activity/:lang', FileUpload.array("photos"), Activity.PUT)
      .delete('/activity/:lang', Activity.DELETE)

      .get('/management', Management.GET)
      .post('/management/:lang', FileUpload.single("photo"), Management.POST)
      .put('/management/:lang', FileUpload.single("photo"), Management.PUT)
      .delete('/management/:lang', Management.DELETE)

      .get('/employees', Employees.GET)
      .post('/employees/:lang', FileUpload.single("photo"), Employees.POST)
      .put('/employees/:lang', FileUpload.single("photo"), Employees.PUT)
      .delete('/employees/:lang', Employees.DELETE)

module.exports = router