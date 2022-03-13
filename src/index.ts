import 'reflect-metadata'
import { Container, Inject, Service } from 'typedi'
import App from './app'
import IndexRouter from './routes'
import dotenv from 'dotenv'
dotenv.config()
@Service()
class Server {
  // eslint-disable-next-line no-useless-constructor
  app: App
  constructor(@Inject() public indexRouter: IndexRouter) {
    this.app = new App(process.env.PORT ?? '8000', [indexRouter])
  }
}
export const server = Container.get(Server)
