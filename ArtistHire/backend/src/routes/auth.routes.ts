import express from 'express'
import { authController } from '../controllers'
import auth from '../middlewares/auth'

import validate from '../middlewares/validator'
import { authValidator } from '../validations'

const router = express.Router()

router.get('/', auth(), authController.getUser)

router.post('/register',validate(authValidator.register),authController.register)

router.post('/login',validate(authValidator.login),authController.login)

router.post('/logout',validate(authValidator.logout),authController.logout)
export default router