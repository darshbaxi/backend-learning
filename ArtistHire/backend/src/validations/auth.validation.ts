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

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
}

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
}

export default {register,login,logout}