require('dotenv').config()
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
    GET: async (_, res) => {
       try {
          res.json( await model.ALL_CERTIFICATE())          
       } catch (error) {
          res.json({
             status: 500,
             message: error.message
          })
       }
    },
    POST: async (req, res) => {
      try {
         const certificate_photo = []
         const certificate_photo_name = []
         const uploadPhoto = req.files
         uploadPhoto.map(e => {
            certificate_photo.push(`${process.env.BACKEND_URL}/${e.originalname}`)
            certificate_photo_name.push(e.originalname)
         })
         const { certificate_title, certificate_status } = req.body
         const createCertificate = await model.ADD_CERTIFICATE(certificate_title, certificate_photo, certificate_photo_name, certificate_status)
         
         if(createCertificate) {
            res.json("Certificate created")
         }
         else {
            res.json("Certificate Uncreated")
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
         const certificate_photo = []
         const certificate_photo_name = []
         const { certificate_id, certificate_title, certificate_status } = req.body
         
         const selectedCertificate = await model.SELECTED__CERTIFICATE(certificate_id)
        
         const uploadPhoto = req.files

         if(uploadPhoto.length) {
            uploadPhoto.map((e, i) => {
               const deleteOld = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images',`${selectedCertificate.certificate_photo_name[i]}`)).delete()
               certificate_photo.push(`${process.env.BACKEND_URL}/${e.originalname}`)
               certificate_photo_name.push(e.originalname)
            })
         }  {
            selectedCertificate?.certificate_photo.map(e => {
               certificate_photo.push(e)
            })
            selectedCertificate?.certificate_photo_name.map(e => {
               certificate_photo_name.push(e)
            })
         }

         const updateCertificate = await model.UPDATE_CERTIFICATE(certificate_id, certificate_title, certificate_photo, certificate_photo_name, certificate_status)
         
         if(updateCertificate) {
            res.json("Certificate updated")
         }
         else {
            res.json("Certificate Unupdated")
         }
      } catch (error) {
         res.json({
            status: 500,
            message: error.message
         })
      }
   },
   DELETE: async (req, res) => {
      try {         
         const {certificate_id} = req.body
         const deleteCertificate = await model.DELETE_CERTIFICATE(certificate_id)   
         if (deleteCertificate) {
            res.json('Certificate deleted')
         }
         else {
            res.json('Certificate Undeleted')
         }      
      } catch (err) {
	      res.json({
				status: 500,
				message: err.message,
			})
		}
   }
}