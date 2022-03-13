import { Request, NextFunction, Response, ErrorRequestHandler } from 'express'
import { logger } from './logger'

const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  logger.error(err)
  res.redirect('/error')
}
export default errorMiddleware
