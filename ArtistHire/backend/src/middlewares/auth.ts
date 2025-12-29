import passport from 'passport'
import httpStatus from 'http-status'
import { NextFunction, Request, Response } from 'express'
import { User } from '@prisma/client'
import { roleRights } from '../config/roles'


const callback =
  (
    req: Request,
    res: Response,
    requiredRights: string[],
    resolve: () => void,
    reject: (reason?: unknown) => void
  ) =>
  async (err: unknown, user: User | false, info: unknown) => {
    
    if (err || info || !user) {
      return reject({
        status: httpStatus.UNAUTHORIZED,
        message: 'Please authenticate'
      })
    }

    res.locals.user = user

    
    if (requiredRights.length > 0) {
      const userRights = roleRights.get(user.role as string) ?? []

      const hasRequiredRights = requiredRights.every((right) =>
        userRights.includes(right)
      )

      if (!hasRequiredRights) {
        return reject({
          status: httpStatus.FORBIDDEN,
          message: 'Forbidden'
        })
      }
    }


    resolve()
  }


function auth(...requiredRights: string[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    return new Promise<void>((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        callback(req, res, requiredRights, resolve, reject)
      )(req, res, next)
    })
      .then(() => next())
      .catch((err: any) => {
        res.status(err.status || 401).json({
          message: err.message || 'Unauthorized'
        })
      })
  }
}

export default auth
