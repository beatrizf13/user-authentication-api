const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const dotenv = require('dotenv')

class App {
  constructor () {
    this.app = express()

    dotenv.config()

    this.database()
    this.middlewares()
    this.routes()
  }

  database () {
    require('./database/index')
  }

  middlewares () {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(logger('dev'))
    this.app.use(cookieParser())
    this.app.use(cors())
  }

  routes () {
    this.app.use('/api', require('../src/routes'))
  }
}

module.exports = new App().app
