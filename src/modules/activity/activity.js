require('dotenv').config()
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
    GET: async (_, res) => {
       try {
          res.json( await model.ALL_ACTIVITY())          
       } catch (error) {
          res.json({
             status: 500,
             message: error.message
          })
       }
    },
    POST: async (req, res) => {
      try {
         const activity_photo = []
         const activity_photo_name = []
         const uploadPhoto = req.files
         uploadPhoto.map(e => {
            activity_photo.push(`${process.env.BACKEND_URL}/${e.originalname}`)
            activity_photo_name.push(e.originalname)
         })
         const { activity_title, activity_status } = req.body
         const createActivity = await model.ADD_ACTIVITY(activity_title, activity_photo, activity_photo_name, activity_status)
         
         if(createActivity) {
            res.json("Activity created")
         }
         else {
            res.json("Activity Uncreated")
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
         const activity_photo = []
         const activity_photo_name = []
         const { activity_id, activity_title, activity_status } = req.body
         
         const selectedActivity = await model.SELECTED__ACTIVITY(activity_id)
         
         const uploadPhoto = req.files
      
         if(uploadPhoto.length) {
            uploadPhoto.map((e, i) => {
               const deleteOld = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images',`${selectedActivity?.activity_photo_name[i]}`)).delete()
               activity_photo.push(`${process.env.BACKEND_URL}/${e.originalname}`)
               activity_photo_name.push(e.originalname)
            })
         }
         else {
            selectedActivity?.activity_photo.map(e => {
               activity_photo.push(e)
            })
            selectedActivity?.activity_photo_name.map(e => {
               activity_photo_name.push(e)
            })
         }

         const updateActivity = await model.UPDATE_ACTIVITY(activity_id, activity_title, activity_photo, activity_photo_name, activity_status)
         
         if(updateActivity) {
            res.json("Activity updated")
         }
         else {
            res.json("Activity Unupdated")
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
         const {activity_id} = req.body
         const deleteAvtivity = await model.DELETE_CERTIFICATE(activity_id)   
         if (deleteAvtivity) {
            res.json('Avtivity deleted')
         }
         else {
            res.json('Avtivity Undeleted')
         }      
      } catch (err) {
	      res.json({
				status: 500,
				message: err.message,
			})
		}
   }
}