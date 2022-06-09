const model = require('./model')

module.exports = {
   GET: async (_, res) => {
      try {
         res.json( await model.ALL_GENERAL())
      } catch (error) {
         res.json({
            status: 500,
            message: error.message
         })
      }
   },
   PUT: async (req, res) => {
      try {
         const {phone, email, address, locition, work_time, telegram_link, facebook_link, instagram_link} = req.body
         const UpdateGeneral = await model.UPDATE_GENERAL(phone, email, address, locition, work_time, telegram_link, facebook_link, instagram_link)
         
         if (UpdateGeneral) {
            res.json("General Updated")
         }
         else {
            res.json("General UnUpdated")
         }
         
      } catch (error) {
         res.json({
            status: 500,
            message: error.message
         })
      }
   }
}