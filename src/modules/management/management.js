require('dotenv').config();
const model = require('./model');
const path = require('path');
const FS = require('../../lib/fs/fs');

module.exports = {
   GET: async (_, res) => {
      try {
         res.json(await model.ALL_MANAGEMENT());
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
            res.json('Management Created');
         } else {
            res.json('Management UnCreated');
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
         const selectedManagement = await model.SELECTED_MANAGEMENT(
            management_id,
         );
         const deleteOld = new FS( path.resolve(__dirname, '..','..','..','public','images',`${selectedManagement.management_image_name}`),
         );
         let management_image = '';
         let management_image_name = '';

         if (uploadPhoto) {
            deleteOld.delete();
            management_image = `${process.env.BACKEND_URL}/${uploadPhoto.originalname}`;
            management_image_name = uploadPhoto.originalname;
         } else {
            management_image = selectedManagement.management_image;
            management_image_name = selectedManagement.management_image_name;
         }

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
            res.json('Management updated');
         } else {
            res.json('Management Unupdated');
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
         const { management_id } = req.body;
         const deleteManagement = await model.DELETE_MANAGEMENT(management_id);
         if (deleteManagement) {
            res.json('Management deleted');
         } else {
            res.json('Management Undeleted');
         }
      } catch (err) {
         res.json({
            status: 500,
            message: err.message,
         });
      }
   },
};
