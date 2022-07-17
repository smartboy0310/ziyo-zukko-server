const PG = require('../../lib/postgress/postgress')

class Employees extends PG {
   ALL_EMPLOYEES() {
      return this.fetchAll(`
         SELECT
                  *
         FROM
                  employees
         WHERE 
                  employee_is_delete = false
         ORDER BY
                  employee_id DESC
      `)
   }

   ALL_EMPLOYEES_RU() {
      return this.fetchAll(`
         SELECT
                  *
         FROM
                  employees_ru
         WHERE 
                  employee_is_delete = false
         ORDER BY
                  employee_id DESC
      `)
   }

   SELECTED_EMPLOYEES(employee_id) {
      return this.fetch(`
      SELECT   
               employee_image,
               employee_image_name
      FROM
            employees
      WHERE 
         employee_id = $1
      `, employee_id)
   }

   SELECTED_EMPLOYEES_RU(employee_id) {
      return this.fetch(`
      SELECT   
               employee_image,
               employee_image_name
      FROM
            employees_ru
      WHERE 
         employee_id = $1
      `, employee_id)
   }

   ADD_EMPLOYEES(employee_name, employee_role, employee_image, employee_image_name, employee_winning, employee_full_info, employee_academic_degree, employee_email, employee_telegram_link, employee_facebook_link, employee_instagram_link, employee_status) {
      return this.fetch(`
         INSERT INTO 
                     employees (
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
                        $12               
                     )
      RETURNING *`, employee_name, employee_role, employee_image, employee_image_name, employee_winning, employee_full_info, employee_academic_degree, employee_email, employee_telegram_link, employee_facebook_link, employee_instagram_link, employee_status)
   }

   ADD_EMPLOYEES_RU(employee_name, employee_role, employee_image, employee_image_name, employee_winning, employee_full_info, employee_academic_degree, employee_email, employee_telegram_link, employee_facebook_link, employee_instagram_link, employee_status) {
      return this.fetch(`
         INSERT INTO 
                     employees_ru (
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
                        $12               
                     )
      RETURNING *`, employee_name, employee_role, employee_image, employee_image_name, employee_winning, employee_full_info, employee_academic_degree, employee_email, employee_telegram_link, employee_facebook_link, employee_instagram_link, employee_status)
   }

   UPDATE_EMPLOYEES (employee_id, employee_name, employee_role, employee_image, employee_image_name, employee_winning, employee_full_info, employee_academic_degree, employee_email, employee_telegram_link, employee_facebook_link, employee_instagram_link, employee_status) {
      return this.fetch(`
         UPDATE
               employees
         SET   
                  employee_name = $2, 
                  employee_role = $3, 
                  employee_image = $4, 
                  employee_image_name = $5, 
                  employee_winning = $6, 
                  employee_full_info = $7, 
                  employee_academic_degree = $8, 
                  employee_email = $9, 
                  employee_telegram_link = $10, 
                  employee_facebook_link = $11, 
                  employee_instagram_link = $12, 
                  employee_status = $13
         WHERE
                  employee_id = $1    
      RETURNING *`, employee_id, employee_name, employee_role, employee_image, employee_image_name, employee_winning, employee_full_info, employee_academic_degree, employee_email, employee_telegram_link, employee_facebook_link, employee_instagram_link, employee_status)
   }

   UPDATE_EMPLOYEES_RU (employee_id, employee_name, employee_role, employee_image, employee_image_name, employee_winning, employee_full_info, employee_academic_degree, employee_email, employee_telegram_link, employee_facebook_link, employee_instagram_link, employee_status) {
      return this.fetch(`
         UPDATE
               employees_ru
         SET   
                  employee_name = $2, 
                  employee_role = $3, 
                  employee_image = $4, 
                  employee_image_name = $5, 
                  employee_winning = $6, 
                  employee_full_info = $7, 
                  employee_academic_degree = $8, 
                  employee_email = $9, 
                  employee_telegram_link = $10, 
                  employee_facebook_link = $11, 
                  employee_instagram_link = $12, 
                  employee_status = $13
         WHERE
                  employee_id = $1    
      RETURNING *`, employee_id, employee_name, employee_role, employee_image, employee_image_name, employee_winning, employee_full_info, employee_academic_degree, employee_email, employee_telegram_link, employee_facebook_link, employee_instagram_link, employee_status)
   }

   EDIT_STATUS (employee_id, employee_status) {
      return this.fetch(`

      UPDATE
               employees
      SET
               employee_status = $2
      WHERE
               employee_id = $1
      RETURNING *`, employee_id, employee_status)
   }

   EDIT_STATUS_RU (employee_id, employee_status) {
      return this.fetch(`

      UPDATE
               employees_ru
      SET
               employee_status = $2
      WHERE
               employee_id = $1
      RETURNING *`, employee_id, employee_status)
   }

   DELETE_EMPLOYEES (employee_id) {
      return this.fetch(`
         UPDATE  
                  employees
         SET   
                  employee_is_delete = true,
                  employee_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  employee_id = $1    
      RETURNING *`, employee_id )
   }

   DELETE_EMPLOYEES_RU (employee_id) {
      return this.fetch(`
         UPDATE  
                  employees_ru
         SET   
                  employee_is_delete = true,
                  employee_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  employee_id = $1    
      RETURNING *`, employee_id )
   }
}

module.exports = new Employees