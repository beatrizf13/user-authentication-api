const faker = require('faker')
const User = require('../../src/Models/UserModel')

class Populate {
  users (quantity) {
    for (let i = 0; i < quantity; i++) {
      User.create({
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      })
    }
  }
}
module.exports = new Populate()
