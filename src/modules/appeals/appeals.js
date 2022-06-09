const model = require('./model')

module.exports = {
   GET: async (_, res) => {
      try {
         res.json( await model.ALL_APPEALS())
      } catch (error) {
         res.json({
            status: 500,
            message: error.message
         })
      }
   },
   POST: async (req, res) => {
      try {
         const {applicant_name, applicant_phone, applicant_class, applicant_content} = req.body
         const createdAppeals = await model.ADD_APPEALS(applicant_name, applicant_phone, applicant_class, applicant_content)
         if(createdAppeals) {
            res.json("Appleals created")
         } 
         else {
            res.json("Appleals Uncreated")
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
         const {applicant_id, applicant_status} = req.body
         const updatedAppeals = await model.UPDATE_APPEALS(applicant_id, applicant_status)
         if(updatedAppeals) {
            res.json("Appleals updated")
         } 
         else {
            res.json("Appleals Unupdated")
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
         const {applicant_id} = req.body
         const deleteAppeals = await model.DELETE_APPEALS(applicant_id)   
         if (deleteAppeals) {
            res.json('Appeals deleted')
         }
         else {
            res.json('Appeals Undeleted')
         }      
      } catch (err) {
	      res.json({
				status: 500,
				message: err.message,
			})
		}
   }
}