require('dotenv').config()
const model = require('./model')
const FS = require('../../lib/fs/fs')
const path = require('path');

module.exports = {
   GET: async (req, res) => {
      try {
         const {lang, search_data} = req.params
         if(search_data && lang == 'uz') {
            res.json( {
               status: 200,
               data: {
                  uz: await model.SEARCH_POST(`%${search_data}%`),
                  ru: await model.ALL_POST_RU()
               }
             })
         }
         else if (search_data && lang == 'ru') {
            res.json( {
               status: 200,
               data: {
                  uz: await model.ALL_POST(),
                  ru: await model.SEARCH_POST_RU(`%${search_data}%`)
               }
             })
         }
         else{
            res.json( {
               status: 200,
               data: {
                  uz: await model.ALL_POST(),
                  ru: await model.ALL_POST_RU()
               }
             })
         }
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
         const uploadPhoto = req.file;
         const {post_name, post_title, post_discription, post_type, post_created_by, post_status} = req.body

         const post_img_name = uploadPhoto.originalname;
         const post_img = `${process.env.BACKEND_URL}/${uploadPhoto.originalname}`;         

         if(lang == 'uz') {
            const addPost = await model.ADD_POST(post_name, post_title, post_discription, post_img, post_img_name, post_type, post_created_by, post_status)
   
             if (addPost) {
                res.json({
                  status: 200,
                  message: 'Post Upcreated'
                })
             }
             else {
                res.json({
                  status: 500,
                  message: 'Post UnUpcreated'
                })
             }
         }

         if(lang == 'ru') {
            const addPost = await model.ADD_POST_RU(post_name, post_title, post_discription, post_img, post_img_name, post_type, post_created_by, post_status)
   
             if (addPost) {
                res.json({
                  status: 200,
                  message: 'Photo Upcreated'
                })
             }
             else {
                res.json({
                  status: 500,
                  message: 'Photo UnUpcreated'
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
         const {post_id, post_name, post_title, post_discription, post_type, post_created_by, post_status} = req.body
         
         let post_img = '' 
         let post_img_name = ''
         let selectedPost = {}

         if(lang == 'uz') {
            selectedPost = await model.SELECTED_POST(post_id)
         }
         
         if(lang == 'ru') {
            selectedPost = await model.SELECTED_POST_RU(post_id)
         }

         const deleteOldPost = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images',`${selectedPost?.photo_name}`))                     
         
         if (uploadPhoto) {
            post_img_name = uploadPhoto.originalname;
            post_img = `${process.env.BACKEND_URL}/${uploadPhoto.originalname}`;
            deleteOldPost.delete()
         } 
         else {
            post_img_name = selectedPost?.post_img_name;
            post_img = selectedPost?.post_img;
         }
         
         if(lang == 'uz') {
            const updatePost = await model.UPDATE_POST(post_id, post_name, post_title, post_discription, post_img, post_img_name, post_type, post_created_by, post_status)

            if (updatePost) {
               res.json({
                  status: 200,
                  message: 'Post update'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Post Unupdate'
               })
            }
         }

         if(lang == 'ru') {
            const updatePost = await model.UPDATE_POST_RU(post_id, post_name, post_title, post_discription, post_img, post_img_name, post_type, post_created_by, post_status)

            if (updatePost) {
               res.json({
                  status: 200,
                  message: 'Post update'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Post Unupdate'
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

   STATUS_EDIT: async (req, res) => {
      try {
         const { lang } = req.params
         const {post_id, post_status} = req.body
      
         if(lang == 'uz') {
            const editPost = await model.EDIT_STATUS(post_id, post_status) 

            if (editPost) {
               res.json({
                  status: 200,
                  message: 'Post edited'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Post Unedited'
               })
            }  
         } 
         
         if(lang == 'ru') {
            const editPost = await model.EDIT_STATUS_RU(post_id, post_status) 

            if (editPost) {
               res.json({
                  status: 200,
                  message: 'Post edited'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Post Unedited'
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
         const {post_id} = req.body
      
         if(lang == 'uz') {
            const deletePost = await model.DELETE_POST(post_id) 

            if (deletePost) {
               res.json({
                  status: 200,
                  message: 'Post deleted'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Post Undeleted'
               })
            }  
         } 
         
         if(lang == 'ru') {
            const deletePost = await model.DELETE_POST_RU(post_id) 

            if (deletePost) {
               res.json({
                  status: 200,
                  message: 'Post deleted'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Post Undeleted'
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