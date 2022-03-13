import hbs from 'hbs'
import { Application as expressServer } from 'express'

export const configViewEngine = (app: expressServer) => {
  app.set('views', './src/views')
  app.set('view engine', 'html')
  app.set('view engine', 'hbs')
  app.engine('html', hbs.__express)
  app.engine('hbs', hbs.__express)
}
