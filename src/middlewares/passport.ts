import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
import { User } from '@/types/middleware'
import MinimalUser from '../models/user'
dotenv.config()

const googleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: `${
      process.env.BASE_URI || `http://localhost:${process.env.PORT || '8000'}`
    }/auth/callback`,
    passReqToCallback: true
  },
  async (_req, accessToken, refreshToken, profile, cb) => {
    const { _json: user } = profile
    const cookie = _req.header('cookie')
    let authUser: MinimalUser | undefined
    if (user.email) {
      authUser = await MinimalUser.query().where('email', user?.email).first()
    }
    if (authUser) {
      return cb(null, {
        ...user,
        accessToken,
        refreshToken,
        cookie
      } as User)
    }
    return cb(new Error(`User ${user.email} not authorized!`), authUser)
  }
)

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user as Express.User)
})

export default passport.use(googleStrategy)
