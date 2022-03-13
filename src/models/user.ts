import dbClient from '../utils/dbClient'
import { Model } from 'objection'
import schemaInspector from 'knex-schema-inspector'
import { logger } from '../middlewares/logger'

Model.knex(dbClient)
export default class MinimalUser extends Model {
  id!: number
  email!: string

  static get tableName() {
    return 'users'
  }
}

dbClient
  .raw('select 1+1 as result')
  .then(() => logger.info('SQLITE connection authenticated.'))
  .catch(error => {
    logger.error('Failed to connect to the pg database')
    throw error
  })

const inspector = schemaInspector(dbClient)

async function logTables() {
  const tables = await inspector.tables()
  logger.info('tables:')
  logger.info(tables)
}

logTables()
