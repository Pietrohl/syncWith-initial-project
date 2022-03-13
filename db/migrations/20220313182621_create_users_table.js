exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id')
    table.string('email', 255).unique().notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
