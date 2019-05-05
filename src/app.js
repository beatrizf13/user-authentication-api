const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(cookieParser())
app.use(cors())

// database
require('./database/index')

// creating routes
app.use('/api', require('../src/routes'))

module.exports = app
