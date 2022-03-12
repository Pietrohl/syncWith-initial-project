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
