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
}

module.exports = new Appeals