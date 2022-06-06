const express = require("express")
const router = express.Router()

const Admin = require('./admin/admin')
const About = require('./about/about')

router
      .post('/login', Admin.LOGIN)

      .get('/about', About.GET)
      .put('/about', About.PUT)

module.exports = router