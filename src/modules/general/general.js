const model = require('./model')

module.exports = {
   GET: async (_, res) => {
      try {
         res.json({
            status: 200,
            uz: await model.ALL_GENERAL(),
            ru: await model.ALL_GENERAL_RU()
         })
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
         const {phone, email, address, locition, work_time, telegram_link, facebook_link, instagram_link} = req.body

        if(lang == 'uz') {

            const UpdateGeneral = await model.UPDATE_GENERAL(phone, email, address, locition, work_time, telegram_link, facebook_link, instagram_link)
         
            if (UpdateGeneral) {
               res.json({
                  status: 200,
                  message: "General Updated"
               })
            }
            else {
                  res.json({
                     status: 500,
                     message: "General UnUpdated"
                  })
            }
        }

        if(lang == 'ru') {

         const UpdateGeneral = await model.UPDATE_GENERAL_RU(phone, email, address, locition, work_time, telegram_link, facebook_link, instagram_link)
      
            if (UpdateGeneral) {
               res.json({
                status: 200,
                message: "General Updated"
               })
            }
            else {
                res.json({
                   status: 500,
                   message: "General UnUpdated"
                })
            }
         }         
      } catch (error) {
         res.json({
            status: 500,
            message: error.message
         })
      }
   }
}