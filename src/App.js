require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const Database = require('./Database/Database')
const Routes = require('./Routes/Routes')

const Email = require('./Services/Email')

class App {
  constructor () {
    this.app = express()

    this.database()
    this.middlewares()
    this.routes()

    Email.send('azz.felix7@gmail.com', 'Testing', 'Hello,<br/> >.<')
  }

  database () {
    Database.connection()
  }

  middlewares () {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(logger('dev'))
    this.app.use(cookieParser())
    this.app.use(cors())
  }

  routes () {
    this.app.use('/api', Routes.publicRoutes())
    this.app.use('/api', Routes.privateRoutes())
  }
}

module.exports = new App().app
