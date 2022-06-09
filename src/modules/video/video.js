require('dotenv').config()
const model = require('./model')

module.exports = {
   GET: async (_, res) => {
      try {
         res.json( await model.ALL_VIDEO())
      } catch (error) {
         res.json({
            status: 500,
            message: error.message
         })
      }
   },
   POST: async(req, res) => {
      try {

         const {video_title, video_url, video_status} = req.body
         const newVideo = await model.ADD_VIDEO(video_title, video_url, video_status)

         if(newVideo) {
            res.json('New video created')
         }
         else {
            res.json('New video uncreated')
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

         const {video_id, video_title, video_url, video_status} = req.body
         const updateVideo = await model.UPDATE_VIDEO(video_id, video_title, video_url, video_status)

         if(updateVideo) {
            res.json('Video updated')
         }
         else {
            res.json('Video unupdated')
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
         
         const {video_id} = req.body
         // const selectedPhoto = await model.SELECTED__PHOTO(photo_id)
         // const deleteName = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images',`${selectedPhoto.photo_name}`))
         const deleteVideo = await model.DELETE_VIDEO(video_id)   
         if (deleteVideo) {
            res.json('Video deleted')
         }
         else {
            res.json('Video Undeleted')
         }      
      } catch (err) {
	      res.json({
				status: 500,
				message: err.message,
			})
		}
   }
}