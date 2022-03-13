import session from 'express-session'
export default session({
  secret: process.env.SESSION_SECRET || 'a',
  resave: false,
  saveUninitialized: false
})
