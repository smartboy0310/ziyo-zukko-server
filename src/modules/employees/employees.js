require('dotenv').config();
const model = require('./model');
const path = require('path');
const FS = require('../../lib/fs/fs');

module.exports = {
	GET: async (req, res) => {
      try {
         const { search_data } = req.params
         if(search_data) {
            res.json( {
               status: 200,
               data: {
                  uz: await model.SEARCH_EMPLOYEES(`%${search_data}%`),
                  ru: await model.SEARCH_EMPLOYEES_RU(`%${search_data}%`)
               }
             })
         }
         else{
            res.json( {
               status: 200,
               data: {
                  uz: await model.ALL_EMPLOYEES(),
                  ru: await model.ALL_EMPLOYEES_RU()
               }
             })
         }
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
			const uploadPhoto = req.file;
			const {
				employee_name,
				employee_role,
				employee_winning,
				employee_full_info,
				employee_academic_degree,
				employee_email,
				employee_telegram_link,
				employee_facebook_link,
				employee_instagram_link,
				employee_status
			} = req.body;

			const employee_image = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`;
			const employee_image_name = uploadPhoto.filename;

			if(lang == 'uz') {
				const createdEmployee = await model.ADD_EMPLOYEES(
					employee_name,
					employee_role,
					employee_image,
					employee_image_name,
					employee_winning,
					employee_full_info,
					employee_academic_degree,
					employee_email,
					employee_telegram_link,
					employee_facebook_link,
					employee_instagram_link,
					employee_status
				);
				if (createdEmployee) {
					res.json({
						status: 200,
						message: 'Employee Created'
					});
				} else {
					res.json({
						status: 500,
						message: 'Employee UnCreated'
					});
				}
			}

			if(lang == 'ru') {
				const createdEmployee = await model.ADD_EMPLOYEES_RU(
					employee_name,
					employee_role,
					employee_image,
					employee_image_name,
					employee_winning,
					employee_full_info,
					employee_academic_degree,
					employee_email,
					employee_telegram_link,
					employee_facebook_link,
					employee_instagram_link,
					employee_status
				);
				if (createdEmployee) {
					res.json({
						status: 200,
						message: 'Employee Created'
					});
				} else {
					res.json({
						status: 500,
						message: 'Employee UnCreated'
					});
				}
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
			const { lang } = req.params
			const uploadPhoto = req.file;
			const {
            employee_id,
				employee_name,
				employee_role,
				employee_winning,
				employee_full_info,
				employee_academic_degree,
				employee_email,
				employee_telegram_link,
				employee_facebook_link,
				employee_instagram_link,
				employee_status
			} = req.body;
         
			let selectedEmployee = {}
 			let employee_image = '';
			let employee_image_name = '';

			if (lang == 'uz') {
				selectedEmployee = await model.SELECTED_EMPLOYEES(employee_id);
			}

			if (lang == 'ru') {
				selectedEmployee = await model.SELECTED_EMPLOYEES_RU(employee_id);
			}
			
			const deleteOld = new FS(path.resolve(__dirname,'..','..','..','public','images',`${selectedEmployee.employee_image_name}`));
			
			if (uploadPhoto) {
				deleteOld.delete();
				employee_image = `${process.env.BACKEND_URL}/${uploadPhoto.filename}`;
				employee_image_name = uploadPhoto.filename;
			} else {
				employee_image = selectedEmployee.employee_image;
				employee_image_name = selectedEmployee.employee_image_name;
			}

			if(lang == 'uz') {
				const updatedEmployee = await model.UPDATE_EMPLOYEES(
					employee_id,
					employee_name,
					employee_role,
					employee_image,
					employee_image_name,
					employee_winning,
					employee_full_info,
					employee_academic_degree,
					employee_email,
					employee_telegram_link,
					employee_facebook_link,
					employee_instagram_link,
					employee_status
				);
	
				if (updatedEmployee) {
					res.json({
						status: 200,
						message: 'Employee updated'
					});
				} else {
					res.json({
						status: 500,
						message: 'Employee Unupdated'
					});
				}
			}

			if(lang == 'ru') {
				const updatedEmployee = await model.UPDATE_EMPLOYEES_RU(
					employee_id,
					employee_name,
					employee_role,
					employee_image,
					employee_image_name,
					employee_winning,
					employee_full_info,
					employee_academic_degree,
					employee_email,
					employee_telegram_link,
					employee_facebook_link,
					employee_instagram_link,
					employee_status
				);
	
				if (updatedEmployee) {
					res.json({
						status: 200,
						message: 'Employee updated'
					});
				} else {
					res.json({
						status: 500,
						message: 'Employee Unupdated'
					});
				}
			}
		} catch (error) {
			res.json({
				status: 500,
				message: error.message,
			});
		}
	},

	STATUS_EDIT: async (req, res) => {
      try {
         const { lang } = req.params
         const {employee_id, employee_status} = req.body
      
         if(lang == 'uz') {
            const editEmployee = await model.EDIT_STATUS(employee_id, employee_status) 

            if (editEmployee) {
               res.json({
                  status: 200,
                  message: 'Employee edited'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Employee Unedited'
               })
            }  
         } 
         
         if(lang == 'ru') {
            const editEmployee = await model.EDIT_STATUS_RU(employee_id, employee_status) 

            if (editEmployee) {
               res.json({
                  status: 200,
                  message: 'Employee edited'
               })
            }
            else {
               res.json({
                  status: 500,
                  message: 'Employee Unedited'
               })
            }  
         } 
      } catch (err) {
	      res.json({
				status: 500,
				message: err.message,
			})
		}
   },

	DELETE: async (req, res) => {
		try {
			const { lang } = req.params
			const { employee_id } = req.body;

			if(lang == 'uz') {
				const deleteEmployee = await model.DELETE_EMPLOYEES(employee_id);
				if (deleteEmployee) {
					res.json({
						status: 200,
						message: 'Employee deleted'
					});
				} else {
					res.json({
						status: 500,
						message: 'Employee Undeleted'
					});
				}
			}

			if(lang == 'ru') {
				const deleteEmployee = await model.DELETE_EMPLOYEES_RU(employee_id);
				if (deleteEmployee) {
					res.json({
						status: 200,
						message: 'Employee deleted'
					});
				} else {
					res.json({
						status: 500,
						message: 'Employee Undeleted'
					});
				}
			}
		} catch (err) {
			res.json({
				status: 500,
				message: err.message,
			});
		}
	},
};
