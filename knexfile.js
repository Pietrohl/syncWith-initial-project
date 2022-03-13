/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
console.dir(process.env)
module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: 'src/sync.db'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'db/migrations'
    },
    seeds: {
      directory: 'db/migrations/seeds/dev'
    }
  },

  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: 'dist/sync.db'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'db/migrations'
    },
    seeds: {
      directory: 'db/migrations/seeds/dev'
    }
  }
}
