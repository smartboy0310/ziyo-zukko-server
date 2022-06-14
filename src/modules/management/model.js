const PG = require('../../lib/postgress/postgress')

class Management extends PG {
   ALL_MANAGEMENT() {
      return this.fetchAll(`
         SELECT
                  *
         FROM
                  management
         WHERE 
                  management_is_delete = false
         ORDER BY
                  management_id DESC
      `)
   }

   ALL_MANAGEMENT_RU() {
      return this.fetchAll(`
         SELECT
                  *
         FROM
                  management_ru
         WHERE 
                  management_is_delete = false
         ORDER BY
                  management_id DESC
      `)
   }

   SELECTED_MANAGEMENT(management_id) {
      return this.fetch(`
      SELECT   
               management_image,
               management_image_name
      FROM
            management
      WHERE 
         management_id = $1
      `, management_id)
   }

   SELECTED_MANAGEMENT_RU(management_id) {
      return this.fetch(`
      SELECT   
               management_image,
               management_image_name
      FROM
            management_ru
      WHERE 
         management_id = $1
      `, management_id)
   }

   ADD_MANAGEMENT(management_name, management_role, management_image, management_image_name, management_phone, management_reception_time, management_winning, management_full_info, management_academic_degree, management_telegram_link, management_facebook_link, management_instagram_link, management_status) {
      return this.fetch(`
         INSERT INTO 
                     management (
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
                     )
         VALUES      (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7,
                        $8,
                        $9,
                        $10,
                        $11,
                        $12,
                        $13
                     )
      RETURNING *`, management_name, management_role, management_image, management_image_name, management_phone, management_reception_time, management_winning, management_full_info, management_academic_degree, management_telegram_link, management_facebook_link, management_instagram_link, management_status)
   }

   ADD_MANAGEMENT_RU(management_name, management_role, management_image, management_image_name, management_phone, management_reception_time, management_winning, management_full_info, management_academic_degree, management_telegram_link, management_facebook_link, management_instagram_link, management_status) {
      return this.fetch(`
         INSERT INTO 
                     management_ru (
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
                     )
         VALUES      (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        $7,
                        $8,
                        $9,
                        $10,
                        $11,
                        $12,
                        $13
                     )
      RETURNING *`, management_name, management_role, management_image, management_image_name, management_phone, management_reception_time, management_winning, management_full_info, management_academic_degree, management_telegram_link, management_facebook_link, management_instagram_link, management_status)
   }

   UPDATE_MANAGEMENT (management_id, management_name, management_role, management_image, management_image_name, management_phone, management_reception_time, management_winning, management_full_info, management_academic_degree, management_telegram_link, management_facebook_link, management_instagram_link, management_status) {
      return this.fetch(`
         UPDATE
                  management
         SET   
                  management_name = $2, 
                  management_role = $3, 
                  management_image = $4, 
                  management_image_name = $5, 
                  management_phone = $6, 
                  management_reception_time = $7, 
                  management_winning = $8, 
                  management_full_info = $9, 
                  management_academic_degree = $10, 
                  management_telegram_link = $11, 
                  management_facebook_link = $12, 
                  management_instagram_link = $13, 
                  management_status = $14
         WHERE
                  management_id = $1    
      RETURNING *`, management_id, management_name, management_role, management_image, management_image_name, management_phone, management_reception_time, management_winning, management_full_info, management_academic_degree, management_telegram_link, management_facebook_link, management_instagram_link, management_status)
   }

   UPDATE_MANAGEMENT_RU (management_id, management_name, management_role, management_image, management_image_name, management_phone, management_reception_time, management_winning, management_full_info, management_academic_degree, management_telegram_link, management_facebook_link, management_instagram_link, management_status) {
      return this.fetch(`
         UPDATE
                  management_ru
         SET   
                  management_name = $2, 
                  management_role = $3, 
                  management_image = $4, 
                  management_image_name = $5, 
                  management_phone = $6, 
                  management_reception_time = $7, 
                  management_winning = $8, 
                  management_full_info = $9, 
                  management_academic_degree = $10, 
                  management_telegram_link = $11, 
                  management_facebook_link = $12, 
                  management_instagram_link = $13, 
                  management_status = $14
         WHERE
                  management_id = $1    
      RETURNING *`, management_id, management_name, management_role, management_image, management_image_name, management_phone, management_reception_time, management_winning, management_full_info, management_academic_degree, management_telegram_link, management_facebook_link, management_instagram_link, management_status)
   }

   DELETE_MANAGEMENT (management_id) {
      return this.fetch(`
         UPDATE  
                  management
         SET   
                  management_is_delete = true,
                  management_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  management_id = $1    
      RETURNING *`, management_id )
   }

   DELETE_MANAGEMENT_RU (management_id) {
      return this.fetch(`
         UPDATE  
                  management_ru
         SET   
                  management_is_delete = true,
                  management_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  management_id = $1    
      RETURNING *`, management_id )
   }
}

module.exports = new Management