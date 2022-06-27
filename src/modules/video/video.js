require('dotenv').config()
const model = require('./model')

module.exports = {
   GET: async (_, res) => {
      try {
         res.json({
            status: 200,
            data: {
               uz: await model.ALL_VIDEO(),
               ru: await model.ALL_VIDEO_RU()
            }
         })
      } catch (error) {
         res.json({
            status: 500,
            message: error.message
         })
      }
   },
   POST: async(req, res) => {
      try {
         const { lang } = req.params
         const {video_title, video_url, video_status} = req.body

        if(lang == 'uz') {
            const createdVideo = await model.ADD_VIDEO(video_title, video_url, video_status)

            if(createdVideo) {
               res.json({
                  status: 200,
                  message: 'Video created'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Video Uncreated'
               })
            }
        }

        if(lang == 'ru') {
         const createdVideo = await model.ADD_VIDEO_RU(video_title, video_url, video_status)

         if(createdVideo) {
            res.json({
               status: 200,
               message: 'Video created'
            })
         }
         else {
            res.json({
               status: 500,
               message: 'Video Uncreated'
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
   PUT: async(req, res) => {
      try {
         const { lang } = req.params
         const {video_id, video_title, video_url, video_status} = req.body

         if(lang == 'uz') {
            const updateVideo = await model.UPDATE_VIDEO(video_id, video_title, video_url, video_status)

            if(updateVideo) {
               res.json({
                  status: 200,
                  message: 'Video updated'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Video Unupdated'
               })
            }
         }

         if(lang == 'ru') {
            const updateVideo = await model.UPDATE_VIDEO_RU(video_id, video_title, video_url, video_status)

            if(updateVideo) {
               res.json({
                  status: 200,
                  message: 'Video updated'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Video Unupdated'
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
         const {video_id, video_status} = req.body
      
         if(lang == 'uz') {
            const editVideo = await model.EDIT_STATUS(video_id, video_status) 

            if (editVideo) {
               res.json({
                  status: 200,
                  message: 'Video edited'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Video Unedited'
               })
            }  
         } 
         
         if(lang == 'ru') {
            const editVideo = await model.EDIT_STATUS_RU(video_id, video_status) 

            if (editVideo) {
               res.json({
                  status: 200,
                  message: 'Video edited'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Video Unedited'
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
         const {video_id} = req.body
         
         if(lang == 'uz') {
            const deleteVideo = await model.DELETE_VIDEO(video_id) 

            if (deleteVideo) {
               res.json({
                  status: 200,
                  message: 'Video deleted'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Video Undeleted'
               })
            } 
         }

         if(lang == 'ru') {
            const deleteVideo = await model.DELETE_VIDEO_RU(video_id) 

            if (deleteVideo) {
               res.json({
                  status: 200,
                  message: 'Video deleted'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Video Undeleted'
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