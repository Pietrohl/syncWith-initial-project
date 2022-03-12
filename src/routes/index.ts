import { Router } from 'express'
import { Service } from 'typedi'

@Service()
export default class IndexRouter {
  public routeName
  public router
  constructor() {
    this.routeName = '/'
    this.router = Router()

    this.router.get('', (_, res, __) => {
      console.log('test')
      res.send('Done').status(200)
    })
  }
}
