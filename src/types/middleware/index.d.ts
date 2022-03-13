import { Application, Router } from 'express'

export type ExpressRouter = {
  routeName: string
  router: Router
}

interface AppServer {
  port: string
  start: () => void
  getServer(): Application
}

interface User extends Express.User {
  sub: string
  name: string
  email: string
  accessToken: string
  refreshToken: string
  cookie: string
}
