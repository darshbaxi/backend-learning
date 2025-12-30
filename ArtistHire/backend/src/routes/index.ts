import { Express } from 'express'
import authRoutes from './auth.routes'

const routes = (app: Express) => {
  app.use('/auth', authRoutes)
}

export default routes
