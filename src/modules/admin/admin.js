require('dotenv').config()
const model = require('./model');
const JWT = require('../../lib/jwt/jwt')


module.exports = {
	LOGIN: async (req, res) => {
		try {
			
			const { login, pass } = req.body;   			    
			const foundAdmin = await model.ADMIN(login, pass);
			const token = new JWT({id: foundAdmin.id}).sign()

			if (foundAdmin) {
				res.json({
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
	}
};
