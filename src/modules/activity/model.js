const PG = require('../../lib/postgress/postgress')

class Activity extends PG {
   ALL_ACTIVITY() {
      return this.fetchAll(`
         SELECT 
                  *
         FROM
                  our_activity
         WHERE 
                  activity_is_delete = false
         ORDER BY
                  activity_id DESC
      `)
   }

   ALL_ACTIVITY_RU() {
      return this.fetchAll(`
         SELECT 
                  *
         FROM
                  our_activity_ru
         WHERE 
                  activity_is_delete = false
         ORDER BY
                  activity_id DESC
      `)
   }

   SELECTED__ACTIVITY(activity_id) {
      return this.fetch(`
      SELECT   
               activity_photo,
               activity_photo_name
      FROM
               our_activity
      WHERE 
         activity_id = $1
      `, activity_id)
   }

   SELECTED__ACTIVITY_RU(activity_id) {
      return this.fetch(`
      SELECT   
               activity_photo,
               activity_photo_name
      FROM
               our_activity_ru
      WHERE 
         activity_id = $1
      `, activity_id)
   }

   ADD_ACTIVITY(activity_title, activity_photo, activity_photo_name, activity_status) {
      return this.fetch(`
         INSERT INTO 
                     our_activity (
                        activity_title,
                        activity_photo, 
                        activity_photo_name, 
                        activity_status        
                     )
         VALUES      (
                        $1,
                        $2,
                        $3,
                        $4
                     )
      RETURNING *`,activity_title, activity_photo, activity_photo_name, activity_status)
   }

   ADD_ACTIVITY_RU(activity_title, activity_photo, activity_photo_name, activity_status) {
      return this.fetch(`
         INSERT INTO 
                     our_activity_ru (
                        activity_title,
                        activity_photo, 
                        activity_photo_name, 
                        activity_status        
                     )
         VALUES      (
                        $1,
                        $2,
                        $3,
                        $4
                     )
      RETURNING *`,activity_title, activity_photo, activity_photo_name, activity_status)
   }

   UPDATE_ACTIVITY(activity_id, activity_title, activity_photo, activity_photo_name, activity_status) {
      return this.fetch(`
         UPDATE
                  our_activity 
         SET
                  activity_title = $2,
                  activity_photo = $3, 
                  activity_photo_name = $4, 
                  activity_status = $5
         WHERE
                  activity_id = $1
      RETURNING *`, activity_id, activity_title, activity_photo, activity_photo_name, activity_status)
   }

   UPDATE_ACTIVITY_RU(activity_id, activity_title, activity_photo, activity_photo_name, activity_status) {
      return this.fetch(`
         UPDATE
                  our_activit_ru 
         SET
                  activity_title = $2,
                  activity_photo = $3, 
                  activity_photo_name = $4, 
                  activity_status = $5
         WHERE
                  activity_id = $1
      RETURNING *`, activity_id, activity_title, activity_photo, activity_photo_name, activity_status)
   }

   EDIT_STATUS (activity_id, activity_status) {
      return this.fetch(`

      UPDATE
               activity
      SET
               activity_status = $2
      WHERE
               management_id = $1
      RETURNING *`, activity_id, activity_status)
   }

   EDIT_STATUS_RU (activity_id, activity_status) {
      return this.fetch(`

      UPDATE
               activity_ru
      SET
               activity_status = $2
      WHERE
               activity_id = $1
      RETURNING *`, activity_id, activity_status)
   }

   DELETE_ACTIVITY(activity_id) {
      return this.fetch(`
         UPDATE
                     our_activity
         SET
                     activity_is_delete = true, 
                     activity_deleted_at = CURRENT_TIMESTAMP 
         WHERE
                     activity_id = $1
      RETURNING *`, activity_id)
   }

   DELETE_ACTIVITY_RU(activity_id) {
      return this.fetch(`
         UPDATE
                     our_activity_ru
         SET
                     activity_is_delete = true, 
                     activity_deleted_at = CURRENT_TIMESTAMP 
         WHERE
                     activity_id = $1
      RETURNING *`, activity_id)
   }
}

module.exports = new Activity