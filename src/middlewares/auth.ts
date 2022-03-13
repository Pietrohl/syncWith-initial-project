import { Handler } from 'express'
const isAuth: Handler = (req, res, next) => {
  req.user ? next() : res.sendStatus(401)
}

export default isAuth
