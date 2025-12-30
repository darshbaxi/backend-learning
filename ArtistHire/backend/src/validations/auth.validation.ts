import Joi from 'joi'
import password  from './custom.validation'

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    username: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().allow('').required()
  })
}


export default {register}