const model = require('./model')

module.exports = {
   GET: async (_, res) => {
      try {
         res.json( await model.ALL_ABOUT)         
      } catch (err) {
	      res.json({
				status: 500,
				message: err.message,
			})
		}
   },

   PUT: async (req, res) => {
      try {
         const {about_id, about_title, about_count} = req.body
         res.json( model.UPDATE_ABOUT(about_id, about_title, about_count))         
      } catch (err) {
	      res.json({
				status: 500,
				message: err.message,
			})
		}
   }
}
