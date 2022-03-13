import Store from '../utils/sessionStore'
import session from 'express-session'

export default session({
  secret: process.env.SESSION_SECRET || 'a',
  resave: false,
  saveUninitialized: false,
  store: new Store({ checkPeriod: 86400000 }, session).getStore()
})
