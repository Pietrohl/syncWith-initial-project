import dotenv from 'dotenv'
import knex from 'knex'
// import path from 'path'
dotenv.config()
/*
 * Sqlite Connection Instance
 */
export default knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename:
      (process.env.NODE_ENV === 'production'
        ? process.env.PROD_DB
        : process.env.DEV_DB) ?? 'sync.db'
  }
})
