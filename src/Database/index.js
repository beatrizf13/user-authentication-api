const mongoose = require('mongoose')

class Database {
  constructor () {
    mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
        process.env.DB_HOST
      }/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true
      }
    )
    mongoose.set('useCreateIndex', true)
    mongoose.Promise = global.Promise
  }
}

module.exports = new Database()
