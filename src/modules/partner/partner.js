require('dotenv').config()
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
   GET: async (_, res) => {
      try {
         res.json( await model.All_PARTNER())
      } catch (error) {
         res.json({
            status: 500,
            message: error.message
         })
      }
   },
   POST: async (req, res) => {
      try {
         const uploadPhoto = req.file
         const partner_logo = `${process.env.BACKEND_URL}/${uploadPhoto.originalname}`
         const partner_logo_name = uploadPhoto.originalname
         const {partner_name, partner_status} = req.body

         const createdPartner = await model.ADD_PARTNER(partner_name, partner_logo, partner_logo_name, partner_status)

         if (createdPartner) {
            res.json("Partner Created")
         }
         else {
            res.json("Partner UnCreated")
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
         const uploadPhoto = req.file
         const {partner_id, partner_name, partner_status} = req.body
         let partner_logo = ''
         let partner_logo_name = ''
         const selectedPartner = await model.SELECTED__PARTNER(partner_id)
         const deleteOldLogo = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images',`${selectedPartner.partner_logo_name}`))

         if(uploadPhoto) {
            deleteOldLogo.delete()
            partner_logo = `${process.env.BACKEND_URL}/${uploadPhoto.originalname}`
            partner_logo_name = uploadPhoto.originalname
         }
         else {
            partner_logo = selectedPartner.partner_logo
            partner_logo_name = selectedPartner.partner_logo_name
         }

         const UpdatedPartner = await model.UPDATE_PARTNER(partner_id, partner_name, partner_logo, partner_logo_name, partner_status)
         
         if (UpdatedPartner) {
            res.json("Partner Updated")
         }
         else {
            res.json("Partner UnUpdated")
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
         const {partner_id} = req.body
         const deletePartner = await model.DELETE_PARTNER(partner_id)   
         if (deletePartner) {
            res.json('Partner deleted')
         }
         else {
            res.json('Partner Undeleted')
         }      
      } catch (err) {
	      res.json({
				status: 500,
				message: err.message,
			})
		}
   }
}