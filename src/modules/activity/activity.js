require('dotenv').config()
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
    GET: async (_, res) => {
       try {
          res.json( {
            status: 200,
            uz: await model.ALL_ACTIVITY(),
            ru: await model.ALL_ACTIVITY_RU()
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
         
         const uploadPhoto = req.files
         const { activity_title, activity_status } = req.body
         const { lang } = req.params
         
         const activity_photo = []
         const activity_photo_name = []

         uploadPhoto.map(e => {
            activity_photo.push(`${process.env.BACKEND_URL}/${e.originalname}`)
            activity_photo_name.push(e.originalname)
         })
         
         if (lang == 'uz') {
            const createActivity = await model.ADD_ACTIVITY(activity_title, activity_photo, activity_photo_name, activity_status)
         
               if(createActivity) {
                     res.json({
                        status: 200,
                        message: "Activity created"
                     })
               }
               else {
                     res.json({
                        status: 500,
                        message: "Activity Uncreated"
                     })
               }
         }

         if (lang == 'ru') {
            const createActivity = await model.ADD_ACTIVITY_RU(activity_title, activity_photo, activity_photo_name, activity_status)
         
               if(createActivity) {
                     res.json({
                        status: 200,
                        message: "Activity created"
                     })
               }
               else {
                     res.json({
                        status: 500,
                        message: "Activity Uncreated"
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
         const { activity_id, activity_title, activity_status } = req.body
         const uploadPhoto = req.files
         
         let selectedActivity = {}
         const activity_photo = []
         const activity_photo_name = []
         
         if(lang == 'uz') {
            selectedActivity = await model.SELECTED__ACTIVITY(activity_id)
         }
         if(lang == 'ru') {
            selectedActivity = await model.SELECTED__ACTIVITY_RU(activity_id)
         }                 
               
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

         if(lang == 'uz') {
            const updateActivity = await model.UPDATE_ACTIVITY(activity_id, activity_title, activity_photo, activity_photo_name, activity_status)
         
               if(updateActivity) {
                  res.json({
                     status: 200,
                     message: "Activity updated"
                  })
               }
               else {
                  res.json({
                     status: 500,
                     message: "Activity Unupdated"
                  })
               }
         }
         
         if(lang == 'ru') {
            const updateActivity = await model.UPDATE_ACTIVITY_RU(activity_id, activity_title, activity_photo, activity_photo_name, activity_status)
         
               if(updateActivity) {
                  res.json({
                     status: 200,
                     message: "Activity updated"
                  })
               }
               else {
                  res.json({
                     status: 500,
                     message: "Activity Unupdated"
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
         const {activity_id, activity_status} = req.body
      
         if(lang == 'uz') {
            const editActivity = await model.EDIT_STATUS(activity_id, activity_status) 

            if (editActivity) {
               res.json({
                  status: 200,
                  message: 'Activity edited'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Activity Unedited'
               })
            }  
         } 
         
         if(lang == 'ru') {
            const editActivity = await model.EDIT_STATUS_RU(activity_id, activity_status) 

            if (editActivity) {
               res.json({
                  status: 200,
                  message: 'Activity edited'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Activity Unedited'
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
         const {activity_id} = req.body
         if (lang == 'uz') {
            const deleteAvtivity = await model.DELETE_ACTIVITY(activity_id)   

                  if (deleteAvtivity) {
                     res.json({
                        status: 200,
                        message: 'Avtivity deleted'
                     })
                  }
                  else {
                   res.json({
                     status: 500,
                     message: 'Avtivity Undeleted'
                  })
                  }      
         }
         if (lang == 'ru') {
            const deleteAvtivity = await model.DELETE_ACTIVITY_RU(activity_id)   

            if (deleteAvtivity) {
               res.json({
                  status: 200,
                  message: 'Avtivity deleted'
               })
            }
            else {
             res.json({
               status: 500,
               message: 'Avtivity Undeleted'
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