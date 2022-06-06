const PG = require('../../lib/postgress/postgress')

class Posts extends PG {
   ALL_POSTS () {
      return this.fetchAll(`
         SELECT 
               *
         FROM 
               posts
         WHERE 
               post_is_delete = false
         ORDER_BY
               post_id DESC
      `)
   }
   ADD_POSTS (name, title, discription, img, type, status, created_by) {
      return this.fetch(`
         INSERT INTO 
                     posts (
                        post_name,
                        post_title,
                        post_discription,
                        post_img,
                        post_type,
                        post_status,
                        post_created_by
                        )
         VALUES  (
                     $1,
                     $2,
                     $3,
                     $4,
                     $5,
                     $6,
                     $7
                  )
         RETURNING *`, name, title, discription, img, type, status, created_by)
   }
}