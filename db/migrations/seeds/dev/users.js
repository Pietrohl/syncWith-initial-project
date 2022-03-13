exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { email: 'pietro_henrique4@hotmail.com' },
        { email: 'pietro.h.labadessa@gmail.com' },
        { email: 'alex@alexblack.ca' },
        { email: 'cldellow@gmail.com' }
      ])
    })
}
