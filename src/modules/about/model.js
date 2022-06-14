const PG = require('../../lib/postgress/postgress')

class About extends PG {
   ALL_ABOUT() {
      return this.fetchAll (`
      SELECT 
               * 
      FROM 
               about
      `)
   }
   ALL_ABOUT_RU() {
      return this.fetchAll (`
      SELECT 
               * 
      FROM 
               about_ru
      `)
   }
   UPDATE_ABOUT(id, title, count) {
      return this.fetch(`
         UPDATE 
               about
         SET
               about_title = $2,
               about_count = $3
         WHERE
               about_id = $1
         RETURNING *`, id, title, count)
   }
   UPDATE_ABOUT_RU(id, title, count) {
      return this.fetch(`
         UPDATE 
               about_ru
         SET
               about_title = $2,
               about_count = $3
         WHERE
               about_id = $1
         RETURNING *`, id, title, count)
   }
}

module.exports = new About