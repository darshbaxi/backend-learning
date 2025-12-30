import app from './app'
import config from './config/config'
import routes from './routes'

routes(app)
const server = app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`)
})

