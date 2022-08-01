require('dotenv').config()
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
    GET: async (_, res) => {
       try {
          res.json( {
            status: 200,
            data: {
               uz: await model.ALL_CERTIFICATE(),
               ru: await model.ALL_CERTIFICATE_RU()
            }
         })          
       } catch (error) {
          res.json({
             status: 500,
             message: error.message
          })
       }
    },
    POST: async (req, res) => {
      try {
         const { lang } = req.params
         const { certificate_title, certificate_status } = req.body
         const uploadPhoto = req.files

         const certificate_photo = []
         const certificate_photo_name = []
         
         
         uploadPhoto.map(e => {
            certificate_photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
            certificate_photo_name.push(e.filename)
         })
         
         if(lang == 'uz') {
            const createCertificate = await model.ADD_CERTIFICATE(certificate_title, certificate_photo, certificate_photo_name, certificate_status)
         
            if(createCertificate) {
               res.json({
                  status: 200,
                  message: "Certificate created"
               })
            }
            else {
             res.json({
               status: 500,
               message: "Certificate Uncreated"
            })
            }
         }

         if(lang == 'ru') {
            const createCertificate = await model.ADD_CERTIFICATE_RU(certificate_title, certificate_photo, certificate_photo_name, certificate_status)
         
            if(createCertificate) {
               res.json({
                  status: 200,
                  message: "Certificate created"
               })
            }
            else {
             res.json({
               status: 500,
               message: "Certificate Uncreated"
            })
            }
         }
      } catch (error) {
         res.json({
            status: 500,
            message: error.message
         })
      }
   },
   PUT: async (req, res) => {
      try {
         const { lang } = req.params
         const { certificate_id, certificate_title, certificate_status } = req.body
         const uploadPhoto = req.files
         let selectedCertificate = {}

         if(lang == 'uz') {
            selectedCertificate = await model.SELECTED__CERTIFICATE(certificate_id)
         } 
         if (lang == 'ru') {
            selectedCertificate = await model.SELECTED__CERTIFICATE_RU(certificate_id)
         }        

         const certificate_photo = []
         const certificate_photo_name = []

         if(uploadPhoto.length) {

            selectedCertificate?.certificate_photo_name.forEach(e => {
                FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images',`${e}`)).delete()
            })

            uploadPhoto.forEach(e => {
               certificate_photo.push(`${process.env.BACKEND_URL}/${e.filename}`)
               certificate_photo_name.push(e.filename)
            })
         }  
         else{
            selectedCertificate?.certificate_photo.forEach(e => {
               certificate_photo.push(e)
            })
            selectedCertificate?.certificate_photo_name.forEach(e => {
               certificate_photo_name.push(e)
            })
         }

         if (lang == 'uz') {
            const updateCertificate = await model.UPDATE_CERTIFICATE(certificate_id, certificate_title, certificate_photo, certificate_photo_name, certificate_status)
         
               if(updateCertificate) {
                  res.json({
                     status: 200,
                     message: "Certificate updated"
                  })
               }
               else {
                  res.json({
                     status: 500,
                     message: "Certificate Unupdated"
                  })
               }
         }

         if (lang == 'ru') {
            const updateCertificate = await model.UPDATE_CERTIFICATE_RU(certificate_id, certificate_title, certificate_photo, certificate_photo_name, certificate_status)
         
               if(updateCertificate) {
                  res.json({
                     status: 200,
                     message: "Certificate updated"
                  })
               }
               else {
                  res.json({
                     status: 500,
                     message: "Certificate Unupdated"
                  })
               }
         }
      } catch (error) {
         res.json({
            status: 500,
            message: error.message
         })
      }
   },

   STATUS_EDIT: async (req, res) => {
      try {
         const { lang } = req.params
         const {certificate_id, certificate_status} = req.body
      
         if(lang == 'uz') {
            const editCertificate = await model.EDIT_STATUS(certificate_id, certificate_status) 

            if (editCertificate) {
               res.json({
                  status: 200,
                  message: 'Certificate edited'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Certificate Unedited'
               })
            }  
         } 
         
         if(lang == 'ru') {
            const editCertificate = await model.EDIT_STATUS_RU(certificate_id, certificate_status) 

            if (editCertificate) {
               res.json({
                  status: 200,
                  message: 'Certificate edited'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Certificate Unedited'
               })
            }  
         } 
      } catch (err) {
	      res.json({
				status: 500,
				message: err.message,
			})
		}
   },

   DELETE: async (req, res) => {
      try {   
         const { lang } = req.params      
         const {certificate_id} = req.body

         if(lang == 'uz') {
            const deleteCertificate = await model.DELETE_CERTIFICATE(certificate_id)
            
            if (deleteCertificate) {
               res.json({
                  status: 200,
                  message: 'Certificate deleted'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Certificate Undeleted'
               })
            }
         }      

         if(lang == 'ru') {
            const deleteCertificate = await model.DELETE_CERTIFICATE_RU(certificate_id)
            
            if (deleteCertificate) {
               res.json({
                  status: 200,
                  message: 'Certificate deleted'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Certificate Undeleted'
               })
            }
         }
      } catch (err) {
	      res.json({
				status: 500,
				message: err.message,
			})
		}
   }
}