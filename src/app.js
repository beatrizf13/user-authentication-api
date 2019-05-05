const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(cookieParser())
app.use(cors())

// connection database
mongoose.connect(
  'mongodb://beatrizf13:beatrizf13@ds151486.mlab.com:51486/event-manager',
  {
    useNewUrlParser: true
  }
)
mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise

// creating routes
app.use('/api', require('../src/routes'))

module.exports = app
