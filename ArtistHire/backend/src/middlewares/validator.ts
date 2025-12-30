import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import pick from '../utils/pick'

const validate =
  (schema: object) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body'])
    const obj = pick(req, Object.keys(validSchema))

    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(obj)

    console.log(error)
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(', ')


      return res.status(400).json({
        status: 'error',
        message: errorMessage,
      })
    }

    Object.assign(req, value)
    next()
  }

export default validate
