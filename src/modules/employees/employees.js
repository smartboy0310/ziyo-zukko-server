require('dotenv').config();
const model = require('./model');
const path = require('path');
const FS = require('../../lib/fs/fs');

module.exports = {
	GET: async (_, res) => {
		try {
			res.json(await model.ALL_EMPLOYEES());
		} catch (error) {
			res.json({
				status: 500,
				message: error.message,
			});
		}
	},
	POST: async (req, res) => {
		try {
			const uploadPhoto = req.file;
			const {
				employee_name,
				employee_role,
				employee_winning,
				employee_full_info,
				employee_academic_degree,
				employee_telegram_link,
				employee_facebook_link,
				employee_instagram_link,
				employee_status
			} = req.body;
			const employee_image = `${process.env.BACKEND_URL}/${uploadPhoto.originalname}`;
			const employee_image_name = uploadPhoto.originalname;

			const createdEmployee = await model.ADD_EMPLOYEES(
				employee_name,
				employee_role,
				employee_image,
				employee_image_name,
				employee_winning,
				employee_full_info,
				employee_academic_degree,
				employee_telegram_link,
				employee_facebook_link,
				employee_instagram_link,
				employee_status
			);
			if (createdEmployee) {
				res.json('Employee Created');
			} else {
				res.json('Employee UnCreated');
			}
		} catch (error) {
			res.json({
				status: 500,
				message: error.message,
			});
		}
	},
	PUT: async (req, res) => {
		try {
			const uploadPhoto = req.file;
			const {
            employee_id,
				employee_name,
				employee_role,
				employee_winning,
				employee_full_info,
				employee_academic_degree,
				employee_telegram_link,
				employee_facebook_link,
				employee_instagram_link,
				employee_status
			} = req.body;
         
			const selectedEmployee = await model.SELECTED_EMPLOYEES(employee_id);
			const deleteOld = new FS(path.resolve(__dirname,'..','..','..','public','images',`${selectedEmployee.employee_image_name}`));
			
         let employee_image = '';
			let employee_image_name = '';

			if (uploadPhoto) {
				deleteOld.delete();
				employee_image = `${process.env.BACKEND_URL}/${uploadPhoto.originalname}`;
				employee_image_name = uploadPhoto.originalname;
			} else {
				employee_image = selectedEmployee.employee_image;
				employee_image_name = selectedEmployee.employee_image_name;
			}

			const updatedEmployee = await model.UPDATE_EMPLOYEES(
            employee_id,
				employee_name,
				employee_role,
				employee_image,
				employee_image_name,
				employee_winning,
				employee_full_info,
				employee_academic_degree,
				employee_telegram_link,
				employee_facebook_link,
				employee_instagram_link,
				employee_status
			);

			if (updatedEmployee) {
				res.json('Employee updated');
			} else {
				res.json('Employee Unupdated');
			}
		} catch (error) {
			res.json({
				status: 500,
				message: error.message,
			});
		}
	},
	DELETE: async (req, res) => {
		try {
			const { employee_id } = req.body;
			const deleteEmployee = await model.DELETE_EMPLOYEES(
				employee_id,
			);
			if (deleteEmployee) {
				res.json('Employee deleted');
			} else {
				res.json('Employee Undeleted');
			}
		} catch (err) {
			res.json({
				status: 500,
				message: err.message,
			});
		}
	},
};
