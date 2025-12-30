
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import passport from 'passport'


import { jwtStrategy } from './config/passport'


const app = express()


app.use(express.static(__dirname))
// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))




// enable cors
app.use(
  cors({
    origin: '*'
  })
)


// jwt authentication
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)




export default app
