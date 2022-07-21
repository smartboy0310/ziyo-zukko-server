const PG = require('../../lib/postgress/postgress')

class Appeals extends PG {
   ALL_APPEALS() {
      return this.fetchAll(`
         SELECT 
                  * 
         FROM 
                  appeals 
         WHERE
                  applicant_is_delete = false
         ORDER BY
                  applicant_id DESC
      `)
   }
   ALL_APPEALS_RU() {
      return this.fetchAll(`
         SELECT 
                  * 
         FROM 
                  appeals_ru 
         WHERE
                  applicant_is_delete = false
         ORDER BY
                  applicant_id DESC
      `)
   }

   SEARCH_APPEALS(search_data) {
      return this.fetchAll(`
         SELECT 
                  * 
         FROM 
                  appeals 
         WHERE
                  applicant_is_delete = false AND (applicant_name ILIKE $1 OR applicant_phone ILIKE $1 OR  applicant_content ILIKE $1 )
         ORDER BY
                  applicant_id DESC
      `, search_data)
   }
   SEARCH_APPEALS_RU(search_data) {
      return this.fetchAll(`
         SELECT 
                  * 
         FROM 
                  appeals_ru 
         WHERE
                  applicant_is_delete = false AND (applicant_name ILIKE $1 OR applicant_phone ILIKE $1 OR  applicant_content ILIKE $1 )
         ORDER BY
                  applicant_id DESC
      `, search_data)
   }

   ADD_APPEALS(applicant_name, applicant_phone, applicant_class, applicant_content) {
      return this.fetch(`
         INSERT INTO 
                     appeals (
                        applicant_name, 
                        applicant_phone, 
                        applicant_class, 
                        applicant_content
                     ) 
         VALUES      ( 
                        $1,
                        $2,
                        $3,
                        $4
                     )
      RETURNING *`, applicant_name, applicant_phone, applicant_class, applicant_content)
   }

   ADD_APPEALS_RU(applicant_name, applicant_phone, applicant_class, applicant_content) {
      return this.fetch(`
         INSERT INTO 
                     appeals_ru (
                        applicant_name, 
                        applicant_phone, 
                        applicant_class, 
                        applicant_content
                     ) 
         VALUES      ( 
                        $1,
                        $2,
                        $3,
                        $4
                     )
      RETURNING *`, applicant_name, applicant_phone, applicant_class, applicant_content)
   }

   UPDATE_APPEALS(applicant_id, applicant_status) {
      return this.fetch(`
         UPDATE
                     appeals
         SET
                     applicant_status = $2
         WHERE
                     applicant_id = $1
      RETURNING *`, applicant_id, applicant_status)
   }

   UPDATE_APPEALS_RU(applicant_id, applicant_status) {
      return this.fetch(`
         UPDATE
                     appeals_ru
         SET
                     applicant_status = $2
         WHERE
                     applicant_id = $1
      RETURNING *`, applicant_id, applicant_status)
   }

   DELETE_APPEALS(applicant_id) {
      return this.fetch(`
         UPDATE
                     appeals
         SET
                     applicant_is_delete = true, 
                     applicant_deleted_at = CURRENT_TIMESTAMP 
         WHERE
                     applicant_id = $1
      RETURNING *`, applicant_id)
   }

   DELETE_APPEALS_RU(applicant_id) {
      return this.fetch(`
         UPDATE
                     appeals_ru
         SET
                     applicant_is_delete = true, 
                     applicant_deleted_at = CURRENT_TIMESTAMP 
         WHERE
                     applicant_id = $1
      RETURNING *`, applicant_id)
   }
}

module.exports = new Appeals