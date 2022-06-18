const express = require("express")
const router = express.Router()
const FileUpload = require('../middleware/multer')
const Authorized = require('../middleware/authorized')

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
const Post = require('./posts/posts')


router
      .post('/login', Admin.LOGIN)
      .put('/login', Authorized.AUTH, Admin.PUT_PASS)

      .get('/about', About.GET)
      .put('/about/:lang', Authorized.AUTH, About.PUT)

      .get('/photo', Photo.GET)
      .post('/photo/:lang',  Authorized.AUTH, FileUpload.single("photo"), Photo.POST)
      .put('/photo/:lang',  Authorized.AUTH, FileUpload.single("photo"), Photo.PUT)
      .delete('/photo/:lang',  Authorized.AUTH, Photo.DELETE)

      .get('/post', Post.GET)
      .post('/post/:lang',  Authorized.AUTH, FileUpload.single("photo"), Post.POST)
      .put('/post/:lang',  Authorized.AUTH, FileUpload.single("photo"), Post.PUT)
      .delete('/post/:lang',  Authorized.AUTH, Post.DELETE)

      .get('/video', Video.GET)
      .post('/video/:lang', Authorized.AUTH, Video.POST)
      .put('/video/:lang', Authorized.AUTH, Video.PUT)
      .delete('/video/:lang', Authorized.AUTH, Video.DELETE)

      .get('/partner', Authorized.AUTH, Partner.GET)
      .post('/partner/:lang', Authorized.AUTH, FileUpload.single("photo"), Partner.POST)
      .put('/partner/:lang', Authorized.AUTH, FileUpload.single("photo"), Partner.PUT)
      .delete('/partner/:lang', Authorized.AUTH, Partner.DELETE)

      .get('/general', General.GET)
      .put('/general/:lang', Authorized.AUTH, General.PUT)


      .get('/appeals', Appeals.GET)
      .post('/appeals/:lang', Appeals.POST)
      .put('/appeals/:lang', Authorized.AUTH, Appeals.PUT)
      .delete('/appeals/:lang', Authorized.AUTH, Appeals.DELETE)

      .get('/certificate', Certificate.GET)
      .post('/certificate/:lang', Authorized.AUTH, FileUpload.array("photos"), Certificate.POST)
      .put('/certificate/:lang', Authorized.AUTH, FileUpload.array("photos"), Certificate.PUT)
      .delete('/certificate/:lang', Authorized.AUTH, Certificate.DELETE)

      .get('/activity', Activity.GET)
      .post('/activity/:lang', Authorized.AUTH, FileUpload.array("photos"), Activity.POST)
      .put('/activity/:lang', Authorized.AUTH, FileUpload.array("photos"), Activity.PUT)
      .delete('/activity/:lang', Authorized.AUTH, Activity.DELETE)

      .get('/management', Management.GET)
      .post('/management/:lang', Authorized.AUTH, FileUpload.single("photo"), Management.POST)
      .put('/management/:lang', Authorized.AUTH, FileUpload.single("photo"), Management.PUT)
      .delete('/management/:lang', Authorized.AUTH, Management.DELETE)

      .get('/employees', Employees.GET)
      .post('/employees/:lang', Authorized.AUTH, FileUpload.single("photo"), Employees.POST)
      .put('/employees/:lang', Authorized.AUTH, FileUpload.single("photo"), Employees.PUT)
      .delete('/employees/:lang', Authorized.AUTH, Employees.DELETE)

module.exports = router