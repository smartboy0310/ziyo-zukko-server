const model = require('./model')

module.exports = {
   GET: async (_, res) => {
      try {
         res.json( {
            status: 200,
            uz: await model.ALL_APPEALS(),
            ru: await model.ALL_APPEALS_RU()
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
         const { lang } = req.params
         const {applicant_name, applicant_phone, applicant_class, applicant_content} = req.body

         if (lang == 'uz') {
            const createdAppeals = await model.ADD_APPEALS(applicant_name, applicant_phone, applicant_class, applicant_content)

            if(createdAppeals) {
               res.json({
                  status: 200,
                  message: "Appleals created"
               })
            } 
            else {
               res.json({
                  status: 500,
                  message: "Appleals Uncreated"
               })
            }
         }

         if (lang == 'ru') {
            const createdAppeals = await model.ADD_APPEALS_RU(applicant_name, applicant_phone, applicant_class, applicant_content)

            if(createdAppeals) {
               res.json({
                  status: 200,
                  message: "Appleals created"
               })
            } 
            else {
               res.json({
                  status: 500,
                  message: "Appleals Uncreated"
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
         const {applicant_id, applicant_status} = req.body

         if (lang == 'uz') {
            const updatedAppeals = await model.UPDATE_APPEALS(applicant_id, applicant_status)

            if(updatedAppeals) {
               res.json({
                  status: 200,
                  message: "Appleals updated"
               })
            } 
            else {
               res.json({
                  status: 500,
                  message: "Appleals Unupdated"
               })
            }
         }
         if (lang == 'ru') {
            const updatedAppeals = await model.UPDATE_APPEALS_RU(applicant_id, applicant_status)

            if(updatedAppeals) {
               res.json({
                  status: 200,
                  message: "Appleals updated"
               })
            } 
            else {
               res.json({
                  status: 500,
                  message: "Appleals Unupdated"
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

   DELETE: async (req, res) => {
      try {    
         const { lang } = req.params      
         const {applicant_id} = req.body

         if(lang = 'uz') {
            const deleteAppeals = await model.DELETE_APPEALS(applicant_id)   
         
            if (deleteAppeals) {
               res.json({
                  status: 200,
                  message: 'Appeals deleted'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Appeals Undeleted'
               })
            }
         }
         if(lang = 'ru') {
            const deleteAppeals = await model.DELETE_APPEALS_RU(applicant_id)   
         
            if (deleteAppeals) {
               res.json({
                  status: 200,
                  message: 'Appeals deleted'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Appeals Undeleted'
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