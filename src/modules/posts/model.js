const PG = require('../../lib/postgress/postgress')

class Posts extends PG {
   ALL_POST () {
      return this.fetchAll(`
         SELECT 
               *
         FROM 
               posts
         WHERE 
               post_is_delete = false
         ORDER BY
               post_id DESC
      `)
   }

   ALL_POST_RU () {
      return this.fetchAll(`
         SELECT 
               *
         FROM 
               posts_ru
         WHERE 
               post_is_delete = false
         ORDER BY
               post_id DESC
      `)
   }

   SEARCH_POST (search_data) {
      return this.fetchAll(`
         SELECT 
               *
         FROM 
               posts
         WHERE 
               post_is_delete = false AND (post_name ILIKE $1 OR post_title ILIKE $1 OR post_discription ILIKE $1 OR post_type ILIKE $1 OR post_created_by ILIKE $1)
         ORDER BY
               post_id DESC
      `, search_data)
   }

   SEARCH_POST_RU (search_data) {
      return this.fetchAll(`
         SELECT 
               *
         FROM 
               posts_ru
         WHERE 
               post_is_delete = false AND (post_name ILIKE $1 OR post_title ILIKE $1 OR post_discription ILIKE $1 OR post_type ILIKE $1 OR  post_created_by ILIKE $1)
         ORDER BY
               post_id DESC
      `, search_data)
   }

   SELECTED_POST(id) {
      return this.fetch(`
         SELECT
                  post_img,
                  post_img_name
         FROM
                  posts
         WHERE 
                  post_id = $1
      `, id)
   }

   SELECTED_POST_RU(id) {
      return this.fetch(`
         SELECT
                  post_img,
                  post_img_name
         FROM
                  posts_ru
         WHERE 
                  post_id = $1
      `, id)
   }

   ADD_POST (name, title, discription, img, img_name, type, created_by, status) {
      return this.fetch(`
         INSERT INTO 
                     posts (
                        post_name,
                        post_title,
                        post_discription,
                        post_img,
                        post_img_name,
                        post_type,
                        post_created_by,
                        post_status                        
                        )
         VALUES  (
                     $1,
                     $2,
                     $3,
                     $4,
                     $5,
                     $6,
                     $7,
                     $8
                  )
         RETURNING *`, name, title, discription, img, img_name, type, created_by, status)
   }

   ADD_POST_RU (name, title, discription, img, img_name, type, created_by, status) {
      return this.fetch(`
         INSERT INTO 
                     posts_ru (
                        post_name,
                        post_title,
                        post_discription,
                        post_img,
                        post_img_name,
                        post_type,
                        post_created_by,
                        post_status                        
                        )
         VALUES  (
                     $1,
                     $2,
                     $3,
                     $4,
                     $5,
                     $6,
                     $7,
                     $8
                  )
         RETURNING *`, name, title, discription, img, img_name, type, created_by, status)
   }

   UPDATE_POST(id, name, title, discription, img, img_name, type, created_by, status) {
      return this.fetch(`
         UPDATE
                  posts
         SET
                  post_name = $2,
                  post_title = $3,
                  post_discription = $4,
                  post_img = $5,
                  post_img_name = $6,
                  post_type = $7,
                  post_created_by = $8,
                  post_status = $9
         WHERE
                  post_id = $1 
         RETURNING *`, id, name, title, discription, img, img_name, type, created_by, status)
   }

   UPDATE_POST_RU(id, name, title, discription, img, img_name, type, created_by, status) {
      return this.fetch(`
         UPDATE
                  posts_ru
         SET
                  post_name = $2,
                  post_title = $3,
                  post_discription = $4,
                  post_img = $5,
                  post_img_name = $6,
                  post_type = $7,
                  post_created_by = $8,
                  post_status = $9
         WHERE
                  post_id = $1 
         RETURNING *`, id, name, title, discription, img, img_name, type, created_by, status)
   }

   EDIT_STATUS(id, status) {
      return this.fetch(`
      UPDATE
            posts
      SET
            post_status = $2
      WHERE
            post_id = $1 
      RETURNING *`, id, status)
   }

   EDIT_STATUS_RU(id, status) {
      return this.fetch(`
      UPDATE
            posts_ru
      SET
            post_status = $2
      WHERE
            post_id = $1 
      RETURNING *`, id, status)
   }

   DELETE_POST(id) {
      return this.fetch(`
         UPDATE
                  posts
         SET
                  post_is_delete = true
                  post_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  post_id = $1 
         RETURNING *`, id)
   }

   DELETE_POST_RU(id) {
      return this.fetch(`
         UPDATE
                  posts_ru
         SET
                  post_is_delete = true
                  post_deleted_at = CURRENT_TIMESTAMP
         WHERE
                  post_id = $1 
         RETURNING *`, id)
   }
}

module.exports = new Posts