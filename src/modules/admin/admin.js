require('dotenv').config()
const model = require('./model');
const JWT = require('../../lib/jwt/jwt')


module.exports = {
	LOGIN: async (req, res) => {
		try {
			
			const { login, pass } = req.body;   			    
			const foundAdmin = await model.ADMIN(login, pass);
			

			if (foundAdmin) {
				const token = new JWT({id: foundAdmin.id}).sign()
				res.json({
					status: 200,
					token: token
				});
			} else {
				res.json({
						status: 401,
						message: 'Unauthorized'
					})
			}
		} catch (err) {
	      res.json({
				status: 500,
				message: err.message,
			})
		}
	},
	PUT_PASS: async (req, res) => {
		try {
			const {login, old_pass, new_pass} = req.body

			const oldPassword = await model.ADMIN(login, old_pass) 
			
			if(oldPassword) {
				await model.UPADTE_PASS(new_pass)
				res.json({
					status: 200, 
					message: "Password Updated"
				})
			}
			else {
				res.json({
					status: 500, 
					message: "Password UnUpdated"
				})
			}
			
		} catch (err) {
	      res.json({
				status: 500,
				message: err.message,
			})
		}
	}
};
