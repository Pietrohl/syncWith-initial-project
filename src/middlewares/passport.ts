import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
import { User } from '@/types/middleware'
dotenv.config()

const googleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: 'http://localhost:8000/auth/callback',
    passReqToCallback: true
  },
  (_req, accessToken, refreshToken, profile, cb) => {
    const { _json } = profile
    const cookie = _req.header('cookie')
    return cb(null, {
      ..._json,
      accessToken,
      refreshToken,
      cookie
    } as User)
  }
)

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user as Express.User)
})

export default passport.use(googleStrategy)
