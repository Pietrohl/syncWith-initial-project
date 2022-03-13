import { Handler } from 'express'
const isAuth: Handler = (req, res, next) => {
  req.user ? next() : res.redirect('/auth')
}

export default isAuth
