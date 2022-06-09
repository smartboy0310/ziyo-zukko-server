require('dotenv').config()
const model = require('./model')
const FS = require('../../lib/fs/fs')
const path = require('path');

module.exports = {
   GET: async (_, res) => {
      try {
         res.json( await model.ALL_PHOTO())
      } catch (err) {
	      res.json({
				status: 500,
				message: err.message,
			})
		}
   },
   POST: async (req, res) => {
      try {                  
         const uploadPhoto = req.file;
         const {photo_title, photo_category, photo_status} = req.body
         const photo_name = uploadPhoto.originalname;
         const photo_url = `${process.env.BACKEND_URL}/${uploadPhoto.originalname}`;         
         const addPhoto = await model.ADD_PHOTO(photo_title, photo_url, photo_category, photo_name, photo_status)
   
         if (addPhoto) {
            res.json('Photo Uploaded')
         }
         else {
            res.json('Photo Unuploaded')
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
         const {photo_id, photo_title, photo_category, photo_status} = req.body
         const selectedPhoto = await model.SELECTED__PHOTO(photo_id)
         const deleteOldPhoto = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images',`${selectedPhoto.photo_name}`))
         let photo_name = '' 
         let photo_url = ''                         
         const uploadPhoto = req.file; 

         if (uploadPhoto) {
            photo_name = uploadPhoto.originalname;
            photo_url = `${process.env.BACKEND_URL}/${uploadPhoto.originalname}`;
            deleteOldPhoto.delete()
         } 
         else {
            photo_name = selectedPhoto.photo_name;
            photo_url = selectedPhoto.photo_url;
         }
         
         const updatePhoto = await model.UPDATE_PHOTO(photo_id, photo_title, photo_url, photo_category, photo_name, photo_status)

         if (updatePhoto) {
            res.json('Photo update')
         }
         else {
            res.json('Photo Unupdate')
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
         
         const {photo_id} = req.body
         // const selectedPhoto = await model.SELECTED__PHOTO(photo_id)
         // const deleteName = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images',`${selectedPhoto.photo_name}`))
         const deletePhoto = await model.DELETE_PHOTO(photo_id)   
         if (deletePhoto) {
            res.json('Photo deleted')
         }
         else {
            res.json('Photo Undeleted')
         }      
      } catch (err) {
	      res.json({
				status: 500,
				message: err.message,
			})
		}
   }
}