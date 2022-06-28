const model = require('./model')

module.exports = {
   GET: async (_, res) => {
      try {
         res.json( {
            status: 200,
            data: {
               uz: await model.ALL_ABOUT(),
               ru: await model.ALL_ABOUT_RU()
            }
         })         
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
         const {about_id, about_title, about_count} = req.body

         if(lang == 'uz') {            
            const updateAbout = await model.UPDATE_ABOUT(about_id, about_title, about_count)
            
            if(updateAbout) {
               res.json({
                  status: 200,
                  message: "About Updated"
               })
            }
            else {
               res.json({
                  status: 500,
                  message: "About UnUpdated"
               })
            }
         }
         if(lang == 'ru') {
            const updateAbout = await model.UPDATE_ABOUT_RU(about_id, about_title, about_count)

            if(updateAbout) {
               res.json({
                  status: 200,
                  message: "About Updated"
               })
            }
            else {
               res.json({
                  status: 500,
                  message: "About UnUpdated"
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
