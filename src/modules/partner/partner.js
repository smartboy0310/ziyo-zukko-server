require('dotenv').config()
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
   GET: async (_, res) => {
      try {
         res.json({
            status: 200,
            data: {
               uz: await model.All_PARTNER(),
               ru: await model.All_PARTNER_RU()
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
         const uploadPhoto = req.file
         const {partner_name, partner_status} = req.body

         const partner_logo = `${process.env.BACKEND_URL}/${uploadPhoto.originalname}`
         const partner_logo_name = uploadPhoto.originalname
         

         if(lang == 'uz') {
            const createdPartner = await model.ADD_PARTNER(partner_name, partner_logo, partner_logo_name, partner_status)

            if (createdPartner) {
               res.json({
                  status: 200,
                  message: "Partner Created"
               })
            }
            else {
               res.json({
                  status: 500,
                  message: "Partner UnCreated"
               })
            }
         }

         if(lang == 'ru') {
            const createdPartner = await model.ADD_PARTNER_RU(partner_name, partner_logo, partner_logo_name, partner_status)

            if (createdPartner) {
               res.json({
                  status: 200,
                  message: "Partner Created"
               })
            }
            else {
               res.json({
                  status: 500,
                  message: "Partner UnCreated"
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
         const uploadPhoto = req.file
         const {partner_id, partner_name, partner_status} = req.body

         let partner_logo = ''
         let partner_logo_name = ''
         let selectedPartner = {}

         if(lang == 'uz') {
            selectedPartner = await model.SELECTED__PARTNER(partner_id)
         }
         if(lang == 'ru') {
            selectedPartner = await model.SELECTED__PARTNER_RU(partner_id)
         }

         const deleteOldLogo = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images',`${selectedPartner?.partner_logo_name}`))

         if(uploadPhoto) {
            deleteOldLogo.delete()
            partner_logo = `${process.env.BACKEND_URL}/${uploadPhoto.originalname}`
            partner_logo_name = uploadPhoto.originalname
         }
         else {
            partner_logo = selectedPartner?.partner_logo
            partner_logo_name = selectedPartner?.partner_logo_name
         }

         if(lang == 'uz') {
            const UpdatedPartner = await model.UPDATE_PARTNER(partner_id, partner_name, partner_logo, partner_logo_name, partner_status)
         
            if (UpdatedPartner) {
               res.json({
                  status: 200,
                  message: "Partner Updated"
               })
            }
            else {
              res.json({
               status: 500,
               message: "Partner UnUpdated"
            })
            }
         }

         if(lang == 'ru') {
            const UpdatedPartner = await model.UPDATE_PARTNER_RU(partner_id, partner_name, partner_logo, partner_logo_name, partner_status)
         
            if (UpdatedPartner) {
               res.json({
                  status: 200,
                  message: "Partner Updated"
               })
            }
            else {
              res.json({
               status: 500,
               message: "Partner UnUpdated"
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
         const {partner_id, partner_status} = req.body
      
         if(lang == 'uz') {
            const editPartner = await model.EDIT_STATUS(partner_id, partner_status) 

            if (editPartner) {
               res.json({
                  status: 200,
                  message: 'Partner edited'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Partner Unedited'
               })
            }  
         } 
         
         if(lang == 'ru') {
            const editPartner = await model.EDIT_STATUS_RU(partner_id, partner_status) 

            if (editPartner) {
               res.json({
                  status: 200,
                  message: 'Partner edited'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Partner Unedited'
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
         const {partner_id} = req.body

        if(lang == 'uz') {
            const deletePartner = await model.DELETE_PARTNER(partner_id) 
              
            if (deletePartner) {
               res.json({
                  status: 200,
                  message: 'Partner deleted'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Partner Undeleted'
               })
            }   
        } 
        
        if(lang == 'ru') {
         const deletePartner = await model.DELETE_PARTNER_RU(partner_id) 

         if (deletePartner) {
            res.json({
               status: 200,
               message: 'Partner deleted'
            })
         }
         else {
            res.json({
               status: 500,
               message: 'Partner Undeleted'
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