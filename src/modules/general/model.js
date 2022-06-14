const PG = require('../../lib/postgress/postgress')

class Generel extends PG {
   ALL_GENERAL () {
      return this.fetchAll(`
         SELECT 
                  * 
         FROM 
                  general
      `)
   }

   ALL_GENERAL_RU () {
      return this.fetchAll(`
         SELECT 
                  * 
         FROM 
                  general_ru
      `)
   }

   UPDATE_GENERAL(phone, email, address, locition, work_time, telegram_link, facebook_link, instagram_link) {
      return this.fetch(`
         UPDATE 
                  general
         SET
                  phone = $1, 
                  email = $2, 
                  address = $3, 
                  locition = $4, 
                  work_time = $5, 
                  telegram_link = $6, 
                  facebook_link = $7, 
                  instagram_link = $8
      RETURNING *`, phone, email, address, locition, work_time, telegram_link, facebook_link, instagram_link)
   }

   UPDATE_GENERAL_RU(phone, email, address, locition, work_time, telegram_link, facebook_link, instagram_link) {
      return this.fetch(`
         UPDATE 
                  general_ru
         SET
                  phone = $1, 
                  email = $2, 
                  address = $3, 
                  locition = $4, 
                  work_time = $5, 
                  telegram_link = $6, 
                  facebook_link = $7, 
                  instagram_link = $8
      RETURNING *`, phone, email, address, locition, work_time, telegram_link, facebook_link, instagram_link)
   }
}

module.exports = new Generel