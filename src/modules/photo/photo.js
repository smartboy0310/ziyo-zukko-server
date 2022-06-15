require('dotenv').config()
const model = require('./model')
const FS = require('../../lib/fs/fs')
const path = require('path');

module.exports = {
   GET: async (_, res) => {
      try {
         res.json({
            status: 200,
            uz: await model.ALL_PHOTO(),
            ru: await model.ALL_PHOTO_RU()
         })
      } catch (err) {
	      res.json({
				status: 500,
				message: err.message,
			})
		}
   },
   POST: async (req, res) => {
      try {    
         const { lang } = req.params              
         const uploadPhoto = req.file;
         const {photo_title, photo_category, photo_status} = req.body

         const photo_name = uploadPhoto.originalname;
         const photo_url = `${process.env.BACKEND_URL}/${uploadPhoto.originalname}`;         

         if(lang == 'uz') {
            const addPhoto = await model.ADD_PHOTO(photo_title, photo_url, photo_category, photo_name, photo_status)
   
             if (addPhoto) {
                res.json({
                  status: 200,
                  message: 'Photo Uploaded'
                })
             }
             else {
                res.json({
                  status: 500,
                  message: 'Photo UnUploaded'
                })
             }
         }

         if(lang == 'ru') {
            const addPhoto = await model.ADD_PHOTO_RU(photo_title, photo_url, photo_category, photo_name, photo_status)
   
             if (addPhoto) {
                res.json({
                  status: 200,
                  message: 'Photo Uploaded'
                })
             }
             else {
                res.json({
                  status: 500,
                  message: 'Photo UnUploaded'
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
   PUT: async (req, res) => {
      try {
         const { lang } = req.params
         const uploadPhoto = req.file; 
         const {photo_id, photo_title, photo_category, photo_status} = req.body
         
         let photo_name = '' 
         let photo_url = ''
         let selectedPhoto = {}

         if(lang == 'uz') {
            selectedPhoto = await model.SELECTED__PHOTO(photo_id)
         }
         
         if(lang == 'ru') {
            selectedPhoto = await model.SELECTED__PHOTO_RU(photo_id)
         }

         const deleteOldPhoto = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images',`${selectedPhoto?.photo_name}`))                     
         
         if (uploadPhoto) {
            photo_name = uploadPhoto.originalname;
            photo_url = `${process.env.BACKEND_URL}/${uploadPhoto.originalname}`;
            deleteOldPhoto.delete()
         } 
         else {
            photo_name = selectedPhoto?.photo_name;
            photo_url = selectedPhoto?.photo_url;
         }
         
         if(lang == 'uz') {
            const updatePhoto = await model.UPDATE_PHOTO(photo_id, photo_title, photo_url, photo_category, photo_name, photo_status)

            if (updatePhoto) {
               res.json({
                  status: 200,
                  message: 'Photo update'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Photo Unupdate'
               })
            }
         }

         if(lang == 'ru') {
            const updatePhoto = await model.UPDATE_PHOTO_RU(photo_id, photo_title, photo_url, photo_category, photo_name, photo_status)

            if (updatePhoto) {
               res.json({
                  status: 200,
                  message: 'Photo update'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Photo Unupdate'
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
         const {photo_id} = req.body
      
         if(lang == 'uz') {
            const deletePhoto = await model.DELETE_PHOTO(photo_id) 

            if (deletePhoto) {
               res.json({
                  status: 200,
                  message: 'Photo deleted'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Photo Undeleted'
               })
            }  
         } 
         
         if(lang == 'ru') {
            const deletePhoto = await model.DELETE_PHOTO_RU(photo_id) 

            if (deletePhoto) {
               res.json({
                  status: 200,
                  message: 'Photo deleted'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Photo Undeleted'
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