const PG =  require('../../lib/postgress/postgress')

class Photo extends PG {
   ALL_PHOTO () {
      return this.fetchAll(`
         SELECT 
                  photo_id,
                  photo_title,
                  photo_url,
                  photo_category,
                  photo_status
         FROM
                  photo_box
         WHERE 
                  photo_is_delete = false
         ORDER BY
                  photo_id DESC
      `)
   }
   SELECTED__PHOTO(photo_id) {
      return this.fetch(`
      SELECT   
               photo_url,
               photo_name
      FROM
            photo_box
      WHERE 
         photo_id = $1
      `, photo_id)
   }
   ADD_PHOTO (photo_title, photo_url, photo_category, photo_name, photo_status) {
      return this.fetch(`
         INSERT INTO 
                        photo_box (
                           photo_title,
                           photo_url,
                           photo_category,
                           photo_name,
                           photo_status
                        )
         VALUES
                           (
                              $1,
                              $2,
                              $3,
                              $4,
                              $5
                           )
         RETURNING *`, photo_title, photo_url, photo_category, photo_name, photo_status)
   }
   UPDATE_PHOTO (photo_id, photo_title, photo_url, photo_category, photo_name, photo_status) {
      return this.fetch(`

      UPDATE
               photo_box
      SET
               photo_title =$2,
               photo_url =$3,
               photo_category =$4,
               photo_name = $5,
               photo_status =$6
      WHERE
               photo_id = $1
      RETURNING * `, photo_id, photo_title, photo_url, photo_category, photo_name, photo_status)
   }
   DELETE_PHOTO (photo_id) {
      return this.fetch(`

      UPDATE
               photo_box
      SET
               photo_is_delete = true,
               photo_deleted_at = CURRENT_TIMESTAMP
      WHERE
               photo_id = $1
      RETURNING *`, photo_id)
   }
}

module.exports = new Photo