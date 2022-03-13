import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'

dotenv.config()

const googleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: 'http://localhost:8000/auth/callback',
    passReqToCallback: true
  },
  (_req, _accessToken, _refreshToken, profile, cb) => {
    const { displayName, emails = [] } = profile

    return cb(null, {
      name: displayName,
      email: emails[0]?.value
    })
  }
)

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user as Express.User)
})

export default passport.use(googleStrategy)
