import e, { Application as expressServer } from 'express'
import helmet from 'helmet'
import { logger, sessionMiddleware, passportMiddleware } from './middlewares'
import { ExpressRouter } from './types/middleware'

export default class App {
  #app: expressServer
  port: string

  constructor(port: string, expressRouters: ExpressRouter[]) {
    this.port = port
    this.#app = e()
    this.initializeMiddlewares()
    this.initializeRoutes(expressRouters)
    this.start()
  }

  private initializeMiddlewares() {
    this.#app.use(helmet())
    this.#app.use(logger())
    this.#app.use(sessionMiddleware)
    this.#app.use(passportMiddleware.initialize())
    this.#app.use(passportMiddleware.session())
  }

  private initializeRoutes(expressRouters: ExpressRouter[]) {
    expressRouters.forEach(({ routeName, router }) => {
      this.#app.use(routeName, router)
    })
  }

  public start() {
    this.#app.listen(this.port, () => {
      console.log(`Server listening on ${this.port}`)
    })
  }

  getServer() {
    return this.#app
  }
}
