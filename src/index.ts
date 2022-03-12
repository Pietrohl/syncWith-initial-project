import e from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan, { StreamOptions } from 'morgan'
import winston from 'winston'

dotenv.config()

const PORT = process.env.PORT || 3001

const app = e()

/*
 * Helmet middleware
 */
app.use(helmet())

/*
 * Winston Middleware
 */
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}
winston.addColors(colors)

const logger = winston.createLogger({
  level: (() => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
  })(),
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
  },
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
      info => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({ filename: 'logs/all.log' })
  ]
})

/*
 * Morgan Middleware
 */

const stream: StreamOptions = {
  write: message => logger.http(message)
}

app.use(
  morgan('tiny', {
    stream: stream,
    skip: () => {
      const env = process.env.NODE_ENV || 'development'
      return env !== 'development'
    }
  })
)

app.get('/', (_req, res) => {
  res.send('Worked')
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})