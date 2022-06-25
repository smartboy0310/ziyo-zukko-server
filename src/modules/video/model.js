const PG = require('../../lib/postgress/postgress')

class Video extends PG {
   ALL_VIDEO () {
      return this.fetchAll(`
         SELECT 
                  *
         FROM
                  video_box
         WHERE
                  video_is_delete = false
         ORDER BY
                  video_id DESC
      `)
   }

   ALL_VIDEO_RU () {
      return this.fetchAll(`
         SELECT 
                  *
         FROM
                  video_box_ru
         WHERE
                  video_is_delete = false
         ORDER BY
                  video_id DESC
      `)
   }

   ADD_VIDEO ( video_title, video_url, video_status) {
      return this.fetch(`
      INSERT INTO
                  video_box (
                     video_title,
                     video_url,
                     video_status
                  )
      VALUES      (
                     $1,
                     $2,
                     $3
                  )
      RETURNING *`, video_title, video_url, video_status)
   }

   ADD_VIDEO_RU ( video_title, video_url, video_status) {
      return this.fetch(`
      INSERT INTO
                  video_box_ru (
                     video_title,
                     video_url,
                     video_status
                  )
      VALUES      (
                     $1,
                     $2,
                     $3
                  )
      RETURNING *`, video_title, video_url, video_status)
   }

   UPDATE_VIDEO (video_id, video_title, video_url, video_status) {
      return this.fetch(`
      UPDATE 
               video_box
      SET
               video_title = $2,
               video_url = $3,
               video_status = $4
      WHERE 
               video_id = $1
      RETURNING *`, video_id, video_title, video_url, video_status)
   }

   UPDATE_VIDEO_RU (video_id, video_title, video_url, video_status) {
      return this.fetch(`
      UPDATE 
               video_box_ru
      SET
               video_title = $2,
               video_url = $3,
               video_status = $4
      WHERE 
               video_id = $1
      RETURNING *`, video_id, video_title, video_url, video_status)
   }

   EDIT_STATUS (video_id, video_status) {
      return this.fetch(`

      UPDATE
               video_box
      SET
               video_status = $2
      WHERE
               video_id = $1
      RETURNING *`, video_id, video_status)
   }

   EDIT_STATUS_RU (video_id, video_status) {
      return this.fetch(`

      UPDATE
               video_box_ru
      SET
               video_status = $2
      WHERE
               video_id = $1
      RETURNING *`, video_id, video_status)
   }

   DELETE_VIDEO (video_id) {
      return this.fetch(`
      UPDATE 
            video_box
      SET
            video_is_delete = true,
            video_deleted_at = CURRENT_TIMESTAMP
            
      WHERE 
            video_id = $1
      RETURNING *`, video_id)
   }

   DELETE_VIDEO_RU (video_id) {
      return this.fetch(`
      UPDATE 
            video_box_ru
      SET
            video_is_delete = true,
            video_deleted_at = CURRENT_TIMESTAMP
            
      WHERE 
            video_id = $1
      RETURNING *`, video_id)
   }
}

module.exports = new Video