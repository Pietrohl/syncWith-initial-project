import 'reflect-metadata'
import { Container, Inject, Service } from 'typedi'
import App from './app'
import IndexRouter from './routes'
import dotenv from 'dotenv'
dotenv.config()
@Service()
class Server {
  app: App
  constructor(@Inject() public indexRouter: IndexRouter) {
    this.app = new App(process.env.PORT ?? '8000', [indexRouter])
  }
}
export const server = Container.get(Server)
