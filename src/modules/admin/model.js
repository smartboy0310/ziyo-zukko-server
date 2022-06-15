const PG = require('../../lib/postgress/postgress')

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
   UPADTE_PASS(new_pass) {
      return this.fetch (`
         UPDATE
                admin
         SET
                password  = $1
      `, new_pass)
   }
}

module.exports = new Admin