import { Handler } from 'express'
const isAuth: Handler = (req, res, next) => {
  console.log('In isAuth')
  req.user ? next() : res.sendStatus(401)
}

export default isAuth
