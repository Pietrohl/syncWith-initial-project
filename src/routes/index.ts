import { Router } from 'express'
import passport from 'passport'
import { Service } from 'typedi'
import { Credentials } from 'google-auth-library'
import { isAuth, passportMiddleware } from '../middlewares'
import { User } from '@/types/middleware'
import { getNewGoogleClient } from '../utils/peopleAPI'

@Service()
export default class IndexRouter {
  public routeName
  public router
  constructor() {
    this.routeName = '/'
    this.router = Router()

    this.router.get(
      '/auth',
      passportMiddleware.authenticate('google', {
        scope: [
          'email',
          'profile',
          'https://www.googleapis.com/auth/contacts.readonly',
          'https://www.googleapis.com/auth/contacts',
          'https://www.googleapis.com/auth/contacts.other.readonly'
        ]
      })
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
      if (!req.user) {
        res.end()
        return
      }
      const { name } = req.user as User
      res.render('protected.hbs', { name })
    })

    this.router.get('/people', isAuth, async (req, res) => {
      const user: User = req.user as User

      if (!user.accessToken && !user.refreshToken) return
      const token: Credentials = {
        access_token: user.accessToken,
        refresh_token: user.refreshToken
      }

      const service = getNewGoogleClient(token)

      type ContactType = { name: string | null | undefined }

      const contactList = await new Promise<ContactType[]>(
        (resolve, reject) => {
          service.people.connections.list(
            {
              resourceName: 'people/me',
              personFields: 'names,emailAddresses'
            },
            (err, res) => {
              if (err || !res) {
                return reject(new Error('The API returned an error: ' + err))
              }

              const connections = res.data.connections
              if (connections) {
                const userConnections = connections.map(person => {
                  if (person.names && person.names.length > 0) {
                    return { name: person.names[0].displayName }
                  }
                  return { name: '' }
                })
                return resolve(userConnections)
              } else {
                return reject(new Error('No connections found.'))
              }
            }
          )
        }
      )
      const json = JSON.stringify(contactList)
      const filename = 'Contact List.json'
      const mimetype = 'application/json'
      res.setHeader('Content-disposition', 'attachment; filename=' + filename)
      res.setHeader('Content-type', mimetype)
      res.socket?.setNoDelay()
      res.end(json)
    })

    this.router.get('/error', (_, res) => {
      res.send('Authentication Failed!')
    })

    this.router.get('', (_, res, __) => {
      res.render('index.html')
    })
  }
}
