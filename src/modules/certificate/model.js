const PG = require('../../lib/postgress/postgress')

class Certificate extends PG {
   ALL_CERTIFICATE() {
      return this.fetchAll(`
         SELECT 
                  *
         FROM
                  our_certificate
         WHERE 
                  certificate_is_delete = false
         ORDER BY
                  certificate_id DESC
      `)
   }

   ALL_CERTIFICATE_RU() {
      return this.fetchAll(`
         SELECT 
                  *
         FROM
                  our_certificate_ru
         WHERE 
                  certificate_is_delete = false
         ORDER BY
                  certificate_id DESC
      `)
   }

   SELECTED__CERTIFICATE(certificate_id) {
      return this.fetch(`
      SELECT   
               certificate_photo,
               certificate_photo_name
      FROM
               our_certificate
      WHERE 
         certificate_id = $1
      `, certificate_id)
   }

   SELECTED__CERTIFICATE_RU(certificate_id) {
      return this.fetch(`
      SELECT   
               certificate_photo,
               certificate_photo_name
      FROM
               our_certificate_ru
      WHERE 
         certificate_id = $1
      `, certificate_id)
   }

   ADD_CERTIFICATE(certificate_title, certificate_photo, certificate_photo_name, certificate_status) {
      return this.fetch(`
         INSERT INTO 
                     our_certificate (
                        certificate_title,
                        certificate_photo, 
                        certificate_photo_name,
                        certificate_status        
                     )
         VALUES      (
                        $1,
                        $2,
                        $3,
                        $4
                     )
      RETURNING *`,certificate_title, certificate_photo, certificate_photo_name, certificate_status)
   }

   ADD_CERTIFICATE_RU(certificate_title, certificate_photo, certificate_photo_name, certificate_status) {
      return this.fetch(`
         INSERT INTO 
                     our_certificate_ru (
                        certificate_title,
                        certificate_photo, 
                        certificate_photo_name,
                        certificate_status        
                     )
         VALUES      (
                        $1,
                        $2,
                        $3,
                        $4
                     )
      RETURNING *`,certificate_title, certificate_photo, certificate_photo_name, certificate_status)
   }

   UPDATE_CERTIFICATE(certificate_id, certificate_title, certificate_photo, certificate_photo_name, certificate_status) {
      return this.fetch(`
         UPDATE
                  our_certificate 
         SET
                  certificate_title = $2,
                  certificate_photo = $3, 
                  certificate_photo_name = $4,
                  certificate_status = $5
         WHERE
                  certificate_id = $1
      RETURNING *`, certificate_id, certificate_title, certificate_photo, certificate_photo_name, certificate_status)
   }

   UPDATE_CERTIFICATE_RU(certificate_id, certificate_title, certificate_photo, certificate_photo_name, certificate_status) {
      return this.fetch(`
         UPDATE
                  our_certificate_ru 
         SET
                  certificate_title = $2,
                  certificate_photo = $3, 
                  certificate_photo_name = $4,
                  certificate_status = $5
         WHERE
                  certificate_id = $1
      RETURNING *`, certificate_id, certificate_title, certificate_photo, certificate_photo_name, certificate_status)
   }

   DELETE_CERTIFICATE(certificate_id) {
      return this.fetch(`
         UPDATE
                     our_certificate
         SET
                     certificate_is_delete = true, 
                     certificate_deleted_at = CURRENT_TIMESTAMP 
         WHERE
                     certificate_id = $1
      RETURNING *`, certificate_id)
   }

   DELETE_CERTIFICATE_RU(certificate_id) {
      return this.fetch(`
         UPDATE
                     our_certificate_ru
         SET
                     certificate_is_delete = true, 
                     certificate_deleted_at = CURRENT_TIMESTAMP 
         WHERE
                     certificate_id = $1
      RETURNING *`, certificate_id)
   }
}

module.exports = new Certificate