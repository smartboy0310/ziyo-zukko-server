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
}

module.exports = new About