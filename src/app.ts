import e, { Application as expressServer } from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import { logger } from './middlewares'
import { ExpressRouter } from './types/middleware'

dotenv.config()

export default class App {
  public app: expressServer
  public port: string

  constructor(expressRouters: ExpressRouter[]) {
    this.port = process.env.PORT || '8000'
    this.app = e()
    this.initializeMiddlewares()
    this.initializeRoutes(expressRouters)
  }

  private initializeMiddlewares() {
    this.app.use(helmet())
    this.app.use(logger())
  }

  private initializeRoutes(expressRouters: ExpressRouter[]) {
    expressRouters.forEach(({ routeName, router }) => {
      this.app.use(routeName, router)
    })
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on ${this.port}`)
    })
  }
}
