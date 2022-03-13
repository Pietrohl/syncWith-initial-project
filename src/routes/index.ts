import { Router } from 'express'
import passport from 'passport'
import { Service } from 'typedi'
import { isAuth, passportMiddleware } from '../middlewares'
@Service()
export default class IndexRouter {
  public routeName
  public router
  constructor() {
    this.routeName = '/'
    this.router = Router()

    this.router.get(
      '/auth',
      passportMiddleware.authenticate('google', { scope: ['email', 'profile'] })
    )

    this.router.get(
      '/auth/callback',
      passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/error'
      }),
      (_req, res) => {
        res.redirect('/auth/callback')
      }
    )

    this.router.get('/protected', isAuth, (req, res) => {
      res.send(`Logged in: ${JSON.stringify(req.user)}`)
    })

    this.router.get('/error', (_, res) => {
      res.send('Auth Failed')
    })

    this.router.get('', (_, res, __) => {
      res.send('Done').status(200)
    })
  }
}
