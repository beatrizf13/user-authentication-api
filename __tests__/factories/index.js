const faker = require('faker')
const { factory } = require('factory-girl')
const User = require('../../src/Models/UserModel')

factory.define('User', User, {
  fullName: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

module.exports = factory
