const PG = require('../../lib/Postgres/postgres')

class Admin extends PG {
   ADMIN(login, pass) {
      return this.fetch(`

         SELECT 
               *
         FROM
               admin
         WHERE login = $1 and password = $2
      `, login, pass)
   }
}

module.exports = new Admin