const User = require('../../src/Models/UserModel')

class Trucate {
  async users () {
    await User.deleteMany()
  }
}

module.exports = new Trucate()
