require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

class App {
  constructor () {
    this.app = express()

    this.database()
    this.middlewares()
    this.routes()
  }

  database () {
    require('./Database')
  }

  middlewares () {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(logger('dev'))
    this.app.use(cookieParser())
    this.app.use(cors())
  }

  routes () {
    this.app.use('/api', require('./Routes'))
  }
}

module.exports = new App().app
