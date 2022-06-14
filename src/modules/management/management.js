require('dotenv').config();
const model = require('./model');
const path = require('path');
const FS = require('../../lib/fs/fs');

module.exports = {
   GET: async (_, res) => {
      try {
         res.json({
            status: 200,
            uz: await model.ALL_MANAGEMENT(),
            ru: await model.ALL_MANAGEMENT_RU()
         });
      } catch (error) {
         res.json({
            status: 500,
            message: error.message,
         });
      }
   },
   POST: async (req, res) => {
      try {
         const { lang } = req.params
         const uploadPhoto = req.file;
         const {
            management_name,
            management_role,
            management_phone,
            management_reception_time,
            management_winning,
            management_full_info,
            management_academic_degree,
            management_telegram_link,
            management_facebook_link,
            management_instagram_link,
            management_status,
         } = req.body;

         const management_image = `${process.env.BACKEND_URL}/${uploadPhoto.originalname}`;
         const management_image_name = uploadPhoto.originalname;

         if (lang == 'uz') {
            const createdManagement = await model.ADD_MANAGEMENT(
               management_name,
               management_role,
               management_image,
               management_image_name,
               management_phone,
               management_reception_time,
               management_winning,
               management_full_info,
               management_academic_degree,
               management_telegram_link,
               management_facebook_link,
               management_instagram_link,
               management_status,
            );
            if (createdManagement) {
               res.json({
                  status: 200,
                  message: 'Management Created'
               });
            } else {
               res.json({
                  status: 500,
                  message: 'Management UnCreated'
               });
            }
         }

         if (lang == 'ru') {
            const createdManagement = await model.ADD_MANAGEMENT_RU(
               management_name,
               management_role,
               management_image,
               management_image_name,
               management_phone,
               management_reception_time,
               management_winning,
               management_full_info,
               management_academic_degree,
               management_telegram_link,
               management_facebook_link,
               management_instagram_link,
               management_status,
            );
            if (createdManagement) {
               res.json({
                  status: 200,
                  message: 'Management Created'
               });
            } else {
               res.json({
                  status: 500,
                  message: 'Management UnCreated'
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
            management_id,
            management_name,
            management_role,
            management_phone,
            management_reception_time,
            management_winning,
            management_full_info,
            management_academic_degree,
            management_telegram_link,
            management_facebook_link,
            management_instagram_link,
            management_status,
         } = req.body;

         let selectedManagement = {}
         let management_image = '';
         let management_image_name = '';

         if( lang == 'uz') {
            selectedManagement = await model.SELECTED_MANAGEMENT( management_id);
         }

         if( lang == 'ru') {
            selectedManagement = await model.SELECTED_MANAGEMENT_RU( management_id);
         }

         const deleteOld = new FS( path.resolve(__dirname, '..','..','..','public','images',`${selectedManagement?.management_image_name}`),
         );
         

         if (uploadPhoto) {
            deleteOld.delete();
            management_image = `${process.env.BACKEND_URL}/${uploadPhoto.originalname}`;
            management_image_name = uploadPhoto.originalname;
         } else {
            management_image = selectedManagement?.management_image;
            management_image_name = selectedManagement?.management_image_name;
         }

         if(lang == 'uz') {
            const updatedManagement = await model.UPDATE_MANAGEMENT(
               management_id,
               management_name,
               management_role,
               management_image,
               management_image_name,
               management_phone,
               management_reception_time,
               management_winning,
               management_full_info,
               management_academic_degree,
               management_telegram_link,
               management_facebook_link,
               management_instagram_link,
               management_status
            );
   
            if (updatedManagement) {
               res.json({
                  status: 200,
                  message: 'Management updated'
               });
            } else {
               res.json({
                  status: 500,
                  message: 'Management Unupdated'
               });
            }
         }

         if(lang == 'ru') {
            const updatedManagement = await model.UPDATE_MANAGEMENT_RU(
               management_id,
               management_name,
               management_role,
               management_image,
               management_image_name,
               management_phone,
               management_reception_time,
               management_winning,
               management_full_info,
               management_academic_degree,
               management_telegram_link,
               management_facebook_link,
               management_instagram_link,
               management_status
            );
   
            if (updatedManagement) {
               res.json({
                  status: 200,
                  message: 'Management updated'
               });
            } else {
               res.json({
                  status: 500,
                  message: 'Management Unupdated'
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
   DELETE: async (req, res) => {
      try {
         const { lang } = req.params
         const { management_id } = req.body;

         if(lang == 'uz') {
            const deleteManagement = await model.DELETE_MANAGEMENT(management_id);
         
            if (deleteManagement) {
             res.json({
               status: 200,
               message: 'Management deleted'
             });
            } else {
               res.json({
                  status: 500,
                  message: 'Management Undeleted'
                });
            }
         }

         if(lang == 'ru') {
            const deleteManagement = await model.DELETE_MANAGEMENT_RU(management_id);
         
            if (deleteManagement) {
             res.json({
               status: 200,
               message: 'Management deleted'
             });
            } else {
               res.json({
                  status: 500,
                  message: 'Management Undeleted'
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
