import e, { Application as expressServer } from 'express'
import helmet from 'helmet'
import {
  loggerMiddleware,
  sessionMiddleware,
  passportMiddleware,
  logger,
  errorMiddleware
} from './middlewares'
import { ExpressRouter } from './types/middleware'
import { configViewEngine } from './views'

export default class App {
  #app: expressServer
  port: string

  constructor(port: string, expressRouters: ExpressRouter[]) {
    this.port = port
    this.#app = e()
    this.initializeMiddlewares()
    this.initializeRoutes(expressRouters)
    this.setStaticResources()
    this.setErrorHandling()
    this.start()
  }

  private initializeMiddlewares() {
    this.#app.use(
      helmet({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: { policy: 'cross-origin' }
      })
    )
    this.#app.use(loggerMiddleware())
    this.#app.use(sessionMiddleware)
    this.#app.use(passportMiddleware.initialize())
    this.#app.use(passportMiddleware.session())
  }

  private initializeRoutes(expressRouters: ExpressRouter[]) {
    expressRouters.forEach(({ routeName, router }) => {
      this.#app.use(routeName, router)
    })
  }

  private setStaticResources() {
    configViewEngine(this.#app)
    this.#app.use('/public', e.static('./src/public'))
  }

  private setErrorHandling() {
    this.#app.use(errorMiddleware)
  }

  public start() {
    this.#app.listen(this.port, () => {
      logger.info(`Server listening on ${this.port}`)
    })
  }

  getServer() {
    return this.#app
  }
}
