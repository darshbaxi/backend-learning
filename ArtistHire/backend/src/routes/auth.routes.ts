import express from 'express'
import { authController } from '../controllers'
import auth from '../middlewares/auth'

import validate from '../middlewares/validator'
import { authValidator } from '../validations'

const router = express.Router()

router.get('/', auth(), authController.getUser)

router.post('/register',validate(authValidator.register),authController.register)


export default router