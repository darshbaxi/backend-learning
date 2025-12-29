import express from 'express'
import { authController } from '../controllers'
import auth from '../middlewares/auth'


const router = express.Router()

router.get('/', auth(), authController.getUser)