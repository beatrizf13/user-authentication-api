const mongoose = require('mongoose')

class Trucate {
  constructor () {
    this.removeAllCollections()
  }

  async removeAllCollections () {
    for (var i in mongoose.connection.collections) {
      await mongoose.connection.collections[i].deleteOne(function () {})
    }
  }
}

module.exports = new Trucate()
