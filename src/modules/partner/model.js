const PG = require('../../lib/postgress/postgress')

class Partner extends PG {
   All_PARTNER () {
      return this.fetchAll(`
         SELECT 
                  * 
         FROM
                  partner
         WHERE
                  partner_is_delete = false
         ORDER BY 
                  partner_id  DESC
      `)
   }
   SELECTED__PARTNER(partner_id) {
      return this.fetch(`
      SELECT   
               partner_logo,
               partner_logo_name
      FROM
            partner
      WHERE 
         partner_id = $1
      `, partner_id)
   }
   ADD_PARTNER (partner_name, partner_logo, partner_logo_name, partner_status) {
      return this.fetch(`
         INSERT INTO 
                     partner (
                        partner_name,
                        partner_logo,
                        partner_logo_name,
                        partner_status
                     )
         VALUES      (
                        $1,
                        $2,
                        $3,
                        $4
                     )
      RETURNING *`, partner_name, partner_logo, partner_logo_name, partner_status)
   }
   UPDATE_PARTNER (partner_id, partner_name, partner_logo, partner_logo_name, partner_status) {
      return this.fetch(`
         UPDATE
                  partner
         SET
                  partner_name = $2,
                  partner_logo = $3,
                  partner_logo_name = $4,
                  partner_status = $5
         WHERE
                  partner_id = $1
        RETURNING *`, partner_id, partner_name, partner_logo, partner_logo_name, partner_status)
   }
   DELETE_PARTNER (partner_id) {
      return this.fetch(`
      UPDATE
                  partner
         SET
                  partner_is_delete = true,
                  partner_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  partner_id = $1
        RETURNING *`, partner_id)
   }
}

module.exports = new Partner